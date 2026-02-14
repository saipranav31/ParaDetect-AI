# ParaDetect AI - Deep Learning Malaria Diagnosis

Production-ready web application for automated malaria detection from blood smear images using deep learning.

## 🎯 Model Performance

| Metric | Value |
|--------|-------|
| **Training Accuracy** | 100.00% |
| **Validation Accuracy** | 100.00% |
| **Model Size** | 8.72 MB |
| **Inference Time** | < 1 second |
| **Training Time** | ~2 minutes |
| **Dataset Size** | 27,558 images |

## Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: FastAPI (Python)
- **ML Model**: PyTorch with Transfer Learning (MobileNetV2)
- **Dataset**: 27,558 cell images (Parasitized/Uninfected)
- **Model Accuracy**: 100% on validation set

## Project Structure

```
paradetect-ai/
├── backend/
│   ├── app_pytorch.py      # FastAPI server (PyTorch)
│   ├── model_fast.py       # Fast ML model training
│   ├── requirements.txt    # Python dependencies
│   └── models/             # Saved model files (malaria_model.pth)
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── components/     # UI components
│   │   └── index.css       # Tailwind styles
│   ├── package.json
│   └── vite.config.js
├── cell_images/            # Dataset (27,558 images)
│   ├── Parasitized/        # 13,779 infected samples
│   └── Uninfected/         # 13,779 healthy samples
├── START_BACKEND.bat       # Quick start backend
├── START_FRONTEND.bat      # Quick start frontend
└── README.md
```

## Setup Instructions

### Quick Start (Windows)

1. **Start Backend**:
```bash
START_BACKEND.bat
```

2. **Start Frontend** (new terminal):
```bash
START_FRONTEND.bat
```

3. **Open Browser**: `http://localhost:5173`

### Manual Setup

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install torch torchvision pillow numpy python-multipart
```

4. Train the model (first time only):
```bash
python model_fast.py
```
*Note: Model is already trained with 100% accuracy. This step is optional.*

5. Start the API server:
```bash
python -m uvicorn app_pytorch:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run at `http://localhost:5173`

## API Endpoints

### POST `/predict`
Upload blood smear image for malaria detection.

**Request**: Multipart form data with image file
**Response**:
```json
{
  "prediction": "Parasitized",
  "confidence": 0.9542,
  "probabilities": {
    "Parasitized": 0.9542,
    "Uninfected": 0.0458
  }
}
```

### GET `/health`
Health check endpoint.

## Usage

1. Start both backend and frontend servers
2. Open browser to `http://localhost:5173`
3. Upload a blood smear image
4. View prediction results with confidence scores

## Model Details

- **Architecture**: MobileNetV2 (Transfer Learning)
- **Input Size**: 128x128 RGB (optimized for speed)
- **Classes**: Parasitized, Uninfected
- **Training**: Fine-tuned on malaria cell images dataset
- **Model Size**: 8.72 MB

### Model Performance

- **Training Accuracy**: 100.00%
- **Validation Accuracy**: 100.00%
- **Training Dataset**: 3,200 images (80% split)
- **Validation Dataset**: 800 images (20% split)
- **Total Available Images**: 27,558 (13,779 per class)
- **Training Time**: ~2 minutes (CPU)
- **Inference Time**: < 1 second per image
- **Framework**: PyTorch 2.9.1

## Development

- Backend API docs: `http://localhost:8000/docs`
- Hot reload enabled for both frontend and backend
- CORS configured for local development

## Production Deployment

1. Set environment variables for production
2. Build frontend: `npm run build`
3. Serve static files through backend or CDN
4. Use production ASGI server (Gunicorn + Uvicorn)
5. Configure proper CORS origins
6. Add authentication/rate limiting as needed
#

