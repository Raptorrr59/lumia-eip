import os
import sys
import threading
import queue
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
from enum import Enum
from pathlib import Path

lock = threading.Lock()
task_queue = queue.Queue()

class GamePaths(Enum):
    SNAKE = "/Game-Vault/SnakeGame.py"
    CONNECT4 = "/Game-Vault/Connect4Game.py"
    IMAGE = "/Game-Vault/ImageRecognitionGame.py"

    @staticmethod
    def find_game_path(name: str) -> str:
        """Return the game path or 'game not found' if not found"""
        name = name.upper().replace(" ", "_")  # Normalisation pour correspondre aux clés Enum
        return GamePaths.__members__.get(name, "game not found").value if name in GamePaths.__members__ else "game not found"

# This handler monitors a folder and reacts when a new .py file is created
class FileMonitorHandler(FileSystemEventHandler):
    def on_created(self, event):
        # Ensure the event is a file creation and the file ends with ".py"
        if not event.is_directory and event.src_path.endswith(".py"):
            file_path = event.src_path
            print(f"New file detected: {file_path}")

            parent_dir = os.path.dirname(file_path)

            txt_files = [f for f in os.listdir(parent_dir) if f.endswith(".txt")]

            if not txt_files:
                return

            if len(txt_files) > 1:
                return
            
            txt_file = txt_files[0]
            userid = os.path.splitext(txt_file)[0]
            txt_path = os.path.join(parent_dir, txt_file)
            isTraining = ""
            
            try:
                # Open and read the content of the .txt file
                with open(txt_path, 'r') as f:
                    content = f.read().strip()
            
                # ✅ Normalize and check for exact match with expected format
                if content == '{True}':
                    isTraining = "true"
                elif content == '{False}':
                    isTraining = "false"
                else:
                    print(f"Invalid content in file {txt_path}: {content}")
                    return  # Exit if the content is not as expected
            except Exception as e:
                print(f"Error reading file {txt_path} : {e}")
                return
            
            # Build relative path to the game (assumes file_path has at least 3 directories)
            relative_path = "/" + os.path.join(*file_path.split(os.sep)[-3:])

            # Extract user ID from folder name (assumes user ID is 3 directories up)
            user_id = int(file_path.split(os.sep)[-3])
            workdir_value = os.path.dirname(relative_path)
            port_value = 5000 + user_id
            env_files = [".env", "DeliveringQueue/.env"]
            game_name = os.path.basename(os.path.dirname(file_path))
            game_path = GamePaths.find_game_path(game_name)
            local_game = os.path.basename(game_path) if game_path != "game not found" else "unknown.py"

            task_queue.put((userid, isTraining, workdir_value, port_value, env_files, game_path, game_name, local_game))


def update_env_file(key, value, env_files):
    """ Met à jour une clé dans plusieurs fichiers .env """
    with lock:
        for env_file_path in env_files:
            updated_lines = []
            key_found = False

            if os.path.exists(env_file_path):
                with open(env_file_path, "r") as f:
                    lines = f.readlines()
                
                for line in lines:
                    if line.startswith(f"{key}="):
                        updated_lines.append(f"{key}={value}\n")
                        key_found = True
                    else:
                        updated_lines.append(line)
            
            if not key_found:
                updated_lines.append(f"{key}={value}\n")
            
            with open(env_file_path, "w") as f:
                f.writelines(updated_lines)

def run_container_with_volume(userid: str, is_training: str, workdir_value: str, port_value: int, game_path: str, game_name: str, local_game: str):
    """Run a game container using prebuilt base image and volume-mounted user script."""
    with lock:
        image_map = {
            "snake": "ai-base-snake",
            "connect4": "ai-base-connect4",
            "image": "ai-base-imagerecognition",
        }

        image = image_map.get(game_name)
        if not image:
            print(f"Unknown game name: {game_name}")
            return

        container_name = f"game-{userid}-{game_name}"
        base_dir = os.path.dirname(os.path.abspath(__file__))
        host_workdir = os.path.join(base_dir, workdir_value.lstrip("/"))
        user_script = os.path.join(host_workdir, f"{userid}_{game_name}.py")

        if not os.path.exists(user_script):
            print(f"User script not found: {user_script}")
            return

        # Common volumes
        parent_dir = os.path.dirname(base_dir)
        volumes = [
            f"{host_workdir}:/app/workdir:ro",
            f"{os.path.join(parent_dir, 'logs')}:/logs",
            f"{os.path.join(parent_dir, 'train')}:/train",
        ]

        # Dataset for image game
        dataset_mount = None
        if game_name == "image":
            dataset_src = os.path.join(base_dir, "Game-Vault", "dataset-imagerecognition")
            if os.path.exists(dataset_src):
                dataset_mount = f"{dataset_src}:/app/dataset-imagerecognition:ro"

        # Build docker run command
        cmd = [
            "sudo", "docker", "run", "-d",
            "--name", container_name,
            "-p", f"{port_value}:5001",
            "-e", f"WORKDIR_PATH={workdir_value}",
            "-e", f"PORT=5001",
            "-e", f"GAME_PATH={game_path}",
            "-e", f"IS_TRAINING={is_training}",
            "-e", f"GAME_NAME={game_name}",
            "-e", f"LOCAL_GAME={local_game}",
            "-e", f"USER_ID={userid}",
        ]

        for v in volumes:
            cmd.extend(["-v", v])
        if dataset_mount:
            cmd.extend(["-v", dataset_mount])

        # Mount user script to expected path inside container
        cmd.extend(["-v", f"{user_script}:/app/{userid}_{game_name}.py:ro"]) 

        cmd.append(image)

        try:
            # Stop and remove existing container if running
            subprocess.run(["sudo", "docker", "stop", container_name], check=False)
            subprocess.run(["sudo", "docker", "rm", "-f", container_name], check=False)
            print(f"Starting container {container_name} from {image}...")
            subprocess.run(cmd, check=True)
            print(f"Container {container_name} is running.")
        except subprocess.CalledProcessError as e:
            print(f"Error starting container: {e}")

def task_worker():
    """ Exécute les tâches en attente dans la file """
    while True:
        userid, isTraining, workdir_value, port_value, env_files, game_path, game_name, local_game = task_queue.get()  # Récupère une tâche
        print(f"Processing task: WORKDIR_PATH={workdir_value}, PORT={port_value}")
        update_env_file("USER_ID", userid, env_files)
        update_env_file("IS_TRAINING", isTraining, env_files)
        update_env_file("WORKDIR_PATH", workdir_value, env_files)
        update_env_file("PORT", port_value, env_files)
        update_env_file("GAME_PATH", game_path , env_files)
        update_env_file("GAME_NAME", game_name, env_files)
        update_env_file("LOCAL_GAME", local_game, env_files)
        run_container_with_volume(userid, isTraining, workdir_value, port_value, game_path, game_name, local_game)
        task_queue.task_done()

def monitor_all_subdirectories(parent_directory):
    event_handler = FileMonitorHandler()
    observer = Observer()
    observer.schedule(event_handler, parent_directory, recursive=True)
    observer.start()

    print(f"Monitoring directory: {parent_directory} and all its subdirectories")

    # Lancer un thread pour exécuter les tâches en file d'attente
    worker_thread = threading.Thread(target=task_worker, daemon=True)
    worker_thread.start()

    try:
        while True:
            pass  # Keep the script running
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    current_directory = os.path.dirname(os.path.abspath(sys.argv[0]))
    monitor_all_subdirectories(current_directory)
