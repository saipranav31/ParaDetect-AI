from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import os

app = FastAPI(title="ParaDetect AI API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variable
model = None
CLASS_NAMES = ["Parasitized", "Uninfected"]
IMG_SIZE = 224
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def load_model():
    """Load the trained model"""
    global model, CLASS_NAMES
    model_path = "models/malaria_model.pth"
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model not found at {model_path}. Please train the model first by running: python model_pytorch.py"
        )
    
    # Load model architecture
    model = models.mobilenet_v2(pretrained=False)
    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(0.2),
        torch.nn.Linear(model.last_channel, 2)
    )
    
    # Load trained weights
    checkpoint = torch.load(model_path, map_location=DEVICE)
    model.load_state_dict(checkpoint['model_state_dict'])
    CLASS_NAMES = checkpoint['class_names']
    
    model = model.to(DEVICE)
    model.eval()
    
    print(f"Model loaded successfully from {model_path}")
    print(f"Classes: {CLASS_NAMES}")
    print(f"Device: {DEVICE}")

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    try:
        load_model()
    except Exception as e:
        print(f"Warning: Could not load model on startup: {e}")
        print("Model will need to be trained before predictions can be made.")

def preprocess_image(image_bytes: bytes):
    """Preprocess image for model prediction"""
    try:
        # Open image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if needed
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Apply transforms
        img_tensor = transform(image)
        
        # Add batch dimension
        img_tensor = img_tensor.unsqueeze(0)
        
        return img_tensor
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ParaDetect AI API (PyTorch)",
        "version": "1.0.0",
        "endpoints": {
            "predict": "/predict",
            "health": "/health",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    model_loaded = model is not None
    return {
        "status": "healthy" if model_loaded else "model_not_loaded",
        "model_loaded": model_loaded,
        "device": str(DEVICE)
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict malaria from blood smear image
    
    Args:
        file: Image file (PNG, JPG, JPEG)
    
    Returns:
        JSON with prediction, confidence, and probabilities
    """
    # Validate model is loaded
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please train the model first."
        )
    
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image (PNG, JPG, JPEG)"
        )
    
    try:
        # Read and preprocess image
        image_bytes = await file.read()
        img_tensor = preprocess_image(image_bytes)
        img_tensor = img_tensor.to(DEVICE)
        
        # Make prediction
        with torch.no_grad():
            outputs = model(img_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probabilities, 1)
            
            predicted_class = CLASS_NAMES[predicted_idx.item()]
            confidence_value = confidence.item()
            
            # Get probabilities for both classes
            probs = probabilities[0].cpu().numpy()
        
        # Prepare response
        response = {
            "prediction": predicted_class,
            "confidence": round(float(confidence_value), 4),
            "probabilities": {
                CLASS_NAMES[0]: round(float(probs[0]), 4),
                CLASS_NAMES[1]: round(float(probs[1]), 4)
            },
            "filename": file.filename
        }
        
        return JSONResponse(content=response)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
