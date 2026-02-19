from fastapi import FastAPI, HTTPException, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import subprocess
import uvicorn
import threading
import json
import time
import glob
import shutil
import os
import sys
import requests
import base64
from io import BytesIO

app = FastAPI()

BACKEND_URL = "http://localhost:8000/api/game/upload"

class RunDockerRequest(BaseModel):
    game: str
    dockerId: int
    userId: str
    isTraining: bool

class DeleteDockerReauest(BaseModel):
    game:str
    dockerId: int

class GameData(BaseModel):
    userId: str
    game: str
    file: str  # Contenu du fichier en base64

class RestartDocker(BaseModel):
    dockerId: int
    game: str
    userId: str

class DeleteUserRequest(BaseModel):
    dockerids: List[str]

class GiveTraining(BaseModel):
    game: str
    dockerId: int

@app.post("/api/rundocker")
def run_docker(request: RunDockerRequest):
    try:
        current_directory = os.path.dirname(os.path.abspath(sys.argv[0]))
        request.game = request.game.lower()
        game = json.dumps([request.game])
        path = f"DeliveringQueue/{request.dockerId}/{request.game}"
        is_training = {request.isTraining}
        destination_dir = path

        print("Current path:", path)
        print("Game array is:", game)
        print("training ? :", is_training)

        subprocess.run([
            "python3", "DeliveringQueue/manage_user.py", "new",
            str(request.dockerId), game, request.userId, str(is_training)
        ], check=True)

        os.makedirs(destination_dir, exist_ok=True)
        py_files = glob.glob("uploads/*.py")

        if not py_files:
            raise HTTPException(status_code=400, detail="No .py files found in uploads/")

        source_file = py_files[0]
        new_filename = f"{request.userId}_{request.game}.py"
        destination_file = os.path.join(destination_dir, new_filename)
        aipath = f"{current_directory}/DeliveringQueue/{request.dockerId}/{request.game}/{new_filename}"
        destpath = f"{current_directory}/AI-Vault/{request.dockerId}/{request.game}/"

        shutil.move(source_file, destination_file)
        subprocess.run(["cp", aipath, destpath], check=True)

        print(f"Moved {source_file} to {destination_file}")

    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Failed to start Docker: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@app.delete("/api/delete/docker")
def delete_docker(request: DeleteDockerReauest):
    try:
        request.game = request.game.lower()
        game = json.dumps([request.game])
        path = f"DeliveringQueue/{request.dockerId}/{request.game}"

        print("Current path (for delete):", path)
        print("Game array is:", game)
        subprocess.run(["python3", "DeliveringQueue/manage_user.py", "delete", str(request.dockerId), game, "no", "no"], check=True)
    
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete Docker: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete Docker: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

@app.post("/api/game_data")
async def receive_game_data(
    file: UploadFile,
    userId: str = Form(...),
    game: str = Form(...)
):
    try:
        # Lire le fichier JSON en mémoire
        file_data = BytesIO(await file.read())

        # Préparer la requête multipart
        files = {"file": (file.filename, file_data, "application/json")}
        data = {"userId": userId, "game": game}

        print(f"📤 Sending file: {file.filename}, User ID: {userId}, Game: {game}")
        # Envoi des données à l’API Java
        response = requests.post(BACKEND_URL, files=files, data=data)

        if response.status_code == 200:
            return {"message": "Game data sent successfully"}
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Backend error: {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to send game data")

@app.put("/api/training_finished")
async def notified_training_finished(
    dockerId: int = Form(...),
    userId: str = Form(...),
    gameName: str = Form(...)
):
    try:
        print(f"IA just finished a training the user id is : ", userId, " the game is : ", gameName)

        data = { "dockerId": dockerId, "userId": userId, "gameName": gameName, "status": True}
        response = requests.put("http://localhost:8000/api/training/change-status", data=data)
    
    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to notified the backend about an existing AI of is training")

@app.get("/api/getfile")#Dans le cas ou c'est le back(java) qui envoie la requette de dl du model.pt
def download_model(userId: str, game: str, dockerId: int):
    game = game.lower()
    model_path = f"train/{dockerId}/{game}/{userId}/model.pt"
    if not os.path.isfile(model_path):
        raise HTTPException(status_code=404, detail="Model file not found")

    return FileResponse(path=model_path, filename=f"{userId}_{game}.pt", media_type='application/octet-stream')

@app.post("/api/restartdocker")
def restart_docker(request: RestartDocker):
    try:
        request.game = request.game.lower()
        print("Restart of the game")
        print(f"📤 User ID: {request.userId}, Game: {request.game}")

        base_path = f"./AI-Vault/{request.dockerId}/{request.game}"
        aipath = f"{base_path}/{request.userId}_{request.game}.py"
        aiconfigpath = f"{base_path}/{request.userId}.txt"
        destpath = f"./DeliveringQueue/{request.dockerId}/{request.game}/"
        aipathdelete = f"{destpath}{request.userId}_{request.game}.py"
        aiconfigpathdelete = f"{destpath}/{request.userId}.txt"
        print("AIpath :", aipath)
        print("destpath :", destpath)

        subprocess.run(["rm", aipathdelete], check=False)
        subprocess.run(["rm", aiconfigpathdelete], check=False)
        subprocess.run(["cp", aipath, destpath], check=True)
        subprocess.run(["cp", aiconfigpath, destpath], check=True)

    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to send game data")

def run_file_monitor():
    subprocess.run(["python3", "DeliveringQueue/file_monitor.py"], check=True)

def run_log_manager():
    subprocess.run(["python3", "logs/log_manager.py"], check=True)

def run_training_manager():
    subprocess.run(["python3", "train/pt_manager.py"], check=True)

if __name__ == "__main__":
    monitor_thread = threading.Thread(target=run_file_monitor, daemon=True)
    manager_thread = threading.Thread(target=run_log_manager, daemon=True)
    manager_train_thread = threading.Thread(target=run_training_manager, daemon=True)
    monitor_thread.start()
    manager_thread.start()
    manager_train_thread.start()

    print("File monitoring is running now!")

    uvicorn.run(app, host="0.0.0.0", port=8010)
