"""Fast training script with reduced epochs and smaller batch size"""
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
import os

# Configuration - OPTIMIZED FOR SPEED
IMG_SIZE = 128  # Reduced from 224
BATCH_SIZE = 64  # Increased for faster processing
EPOCHS = 3  # Reduced from 10
DATASET_PATH = "../cell_images"
MODEL_SAVE_PATH = "models/malaria_model.pth"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Use subset of data for faster training
USE_SUBSET = True
SUBSET_SIZE = 2000  # Use 2000 images per class

def create_dataloaders(data_dir, validation_split=0.2):
    """Create training and validation dataloaders"""
    
    train_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    val_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    full_dataset = ImageFolder(data_dir, transform=train_transform)
    
    # Use subset for faster training
    if USE_SUBSET:
        indices = list(range(min(SUBSET_SIZE * 2, len(full_dataset))))
        full_dataset = torch.utils.data.Subset(full_dataset, indices)
    
    train_size = int((1 - validation_split) * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(
        full_dataset, [train_size, val_size]
    )
    
    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=0
    )
    
    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=0
    )
    
    return train_loader, val_loader, ['Parasitized', 'Uninfected']

def build_model(num_classes=2):
    """Build lightweight model"""
    model = models.mobilenet_v2(weights='DEFAULT')
    
    # Freeze most layers
    for param in model.parameters():
        param.requires_grad = False
    
    # Only train classifier
    model.classifier = nn.Sequential(
        nn.Dropout(0.2),
        nn.Linear(model.last_channel, num_classes)
    )
    
    return model

def train_model():
    """Train the malaria detection model - FAST VERSION"""
    
    print("=" * 60)
    print("ParaDetect AI - FAST Training Mode")
    print("=" * 60)
    
    if not os.path.exists(DATASET_PATH):
        print(f"\nError: Dataset not found at {DATASET_PATH}")
        return
    
    print(f"\n[1/5] Loading dataset (subset mode)...")
    print(f"   Device: {DEVICE}")
    train_loader, val_loader, class_names = create_dataloaders(DATASET_PATH)
    
    print(f"   Training samples: {len(train_loader.dataset)}")
    print(f"   Validation samples: {len(val_loader.dataset)}")
    
    print("\n[2/5] Building model...")
    model = build_model(num_classes=len(class_names))
    model = model.to(DEVICE)
    
    print("\n[3/5] Compiling model...")
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.classifier.parameters(), lr=0.001)
    
    print(f"\n[4/5] Training for {EPOCHS} epochs...")
    
    best_val_acc = 0.0
    
    for epoch in range(EPOCHS):
        # Training
        model.train()
        train_loss = 0.0
        train_correct = 0
        train_total = 0
        
        for batch_idx, (inputs, labels) in enumerate(train_loader):
            inputs, labels = inputs.to(DEVICE), labels.to(DEVICE)
            
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = outputs.max(1)
            train_total += labels.size(0)
            train_correct += predicted.eq(labels).sum().item()
            
            if (batch_idx + 1) % 10 == 0:
                print(f"   Epoch [{epoch+1}/{EPOCHS}] Batch [{batch_idx+1}/{len(train_loader)}] Loss: {loss.item():.4f}")
        
        train_acc = 100. * train_correct / train_total
        train_loss = train_loss / len(train_loader)
        
        # Validation
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(DEVICE), labels.to(DEVICE)
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item()
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()
        
        val_acc = 100. * val_correct / val_total
        val_loss = val_loss / len(val_loader)
        
        print(f"\n   ✓ Epoch {epoch+1}/{EPOCHS} Complete:")
        print(f"     Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.2f}%")
        print(f"     Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.2f}%\n")
        
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
            torch.save({
                'model_state_dict': model.state_dict(),
                'class_names': class_names,
                'val_acc': val_acc
            }, MODEL_SAVE_PATH)
            print(f"     ✓ Best model saved! (Accuracy: {val_acc:.2f}%)")
    
    print("\n[5/5] Training completed!")
    print(f"   Best Validation Accuracy: {best_val_acc:.2f}%")
    print(f"   Model saved to: {MODEL_SAVE_PATH}")
    print("=" * 60)
    print("\nNext step: Start the server with:")
    print("   python -m uvicorn app_pytorch:app --host 0.0.0.0 --port 8000 --reload")
    print("=" * 60)

if __name__ == "__main__":
    train_model()
