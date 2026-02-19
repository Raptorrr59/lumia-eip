import os
import argparse
import socket
import json
from PIL import Image  # Requires: pip install Pillow
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import datasets, transforms
from torch.utils.data import DataLoader, random_split
from torchvision.datasets import ImageFolder

class SafeImageFolder(ImageFolder):
    def __getitem__(self, index):
        path, target = self.samples[index]
        try:
            sample = self.loader(path)
        except Exception as e:
            print(f"Error {path} : {e}")
            sample = Image.new('RGB', (128, 128))
        if self.transform is not None:
            sample = self.transform(sample)
        return sample, target

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3)
        self.fc1 = nn.Linear(32 * 30 * 30, 128)
        self.fc2 = nn.Linear(128, 2)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # (128x128 -> 63x63)
        x = self.pool(F.relu(self.conv2(x)))  # (63x63 -> 30x30)
        x = x.view(-1, 32 * 30 * 30)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

# ----- TRAINING -----
def train_model(data_dir):
    dataset = SafeImageFolder(root=data_dir, transform=transform)
    train_len = int(0.8 * len(dataset))
    val_len = len(dataset) - train_len
    train_data, val_data = random_split(dataset, [train_len, val_len])
    train_loader = DataLoader(train_data, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_data, batch_size=32)

    model = SimpleCNN()
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(1):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for inputs, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        accuracy = 100 * correct / total
        print(f"Epoch {epoch + 1}/1 - Loss: {running_loss:.4f} - Accuracy: {accuracy:.2f}%")

    torch.save(model.state_dict(), args.model_path)
    print(f"Model trained and saved at '{args.model_path}'")

# ----- PREDICTION -----
def predict(model, image_path):
    model.eval()
    try:
        image = Image.open(image_path).convert('RGB')
    except Exception as e:
        print(f"Error when opening the image: {e}")
        return None
    image = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
    return str(predicted.item())  # '0' for cat, '1' for dog

# ----- AI CLIENT -----
def extract_one_json(buffer: str):
    decoder = json.JSONDecoder()
    i = 0
    while i < len(buffer) and buffer[i].isspace():
        i += 1
    if i >= len(buffer):
        return None, ""
    try:
        obj, end = decoder.raw_decode(buffer[i:])
        return obj, buffer[i + end:]
    except json.JSONDecodeError:
        return None, buffer

def run_client(model):
    HOST = '127.0.0.1'
    PORT = 5001
    buffer = ""

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.settimeout(2.0)
        print("AI client connected to game\n")

        rfile = s.makefile("r", encoding="utf-8", newline="\n")

        while True:
            # Read one complete line of JSON
            try:
                line = rfile.readline()
                if not line:
                    print("Server disconnected.")
                    break
                data = line.strip()
                game_data = json.loads(data)
            except json.JSONDecodeError:
                print(r"Bad data")
                continue

            image_path = game_data.get("imagePath", "")
            if not image_path:
                continue

            print(f"Image received: {image_path}")
            prediction = predict(model, image_path)

            if prediction is None:
                prediction = "0"
                print("Prediction failed. Sent default: 0")

            print(f"Prediction sent: {prediction}")
            try:
                s.sendall((prediction + "\n").encode("utf-8"))
            except Exception as e:
                print(f"Failed to send prediction: {e}")
                break

# ----- MAIN -----
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--train", type=bool, default=False, help="Set to True to train the model")
    parser.add_argument("--dataset", type=str, default="dataset-imagerecognition", help="Dataset path")
    parser.add_argument("--model_path", type=str, default="model.pt", help="Model save/load path")

    args = parser.parse_args()

    if args.train:
        print("[Training started]")
        train_model(args.dataset)
    else:
        model = SimpleCNN()
        model.load_state_dict(torch.load(args.model_path, map_location=torch.device('cpu')))
        run_client(model)
