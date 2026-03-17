# Lumia Cluster Manager

The **Cluster Manager** is the execution engine of the Lumia platform. It orchestrates the secure, isolated execution of user-submitted AI scripts using Docker. It serves as the bridge between the main Java backend and the sandboxed environments where AI models are trained and evaluated against game engines.

## 🌟 Architecture & Capabilities

Built primarily in **Python** using **FastAPI**, the Cluster Manager provides a highly concurrent, robust environment orchestration system.

- **Docker-in-Docker Orchestration**: Dynamically spins up, monitors, and tears down Docker containers for individual user sessions. Every AI script runs in an isolated container to ensure security and prevent resource hogging.
- **File & Event Monitoring**: Uses background threads to monitor directories for new AI uploads, configuration changes, and generated logs.
- **Automated Training Pipeline**: Manages the complete lifecycle of a training job, from receiving the dataset to notifying the backend when the PyTorch model (`.pt`) is fully trained and ready for download.
- **Real-time Log Forwarding**: Scans game logs in real-time and forwards them to the backend, enabling the frontend to display live feedback to the user.

## ⚙️ Key Components

- **`API.py`**: The core FastAPI server. It exposes endpoints (`/api/rundocker`, `/api/delete/docker`, etc.) that the Java backend calls to manage the execution lifecycle.
- **`DeliveringQueue/`**: The staging area. It contains `file_monitor.py` (watches for new scripts), base Dockerfiles for different games, and `manage_user.py` which provisions isolated workspace directories (`1/`, `2/`, etc.) for active containers.
- **`Game-Vault/`**: Contains the authoritative server-side game logic (Connect4, Snake, ImageRecognition) that user AIs will connect to and play against.
- **`train/` & `logs/`**: Dedicated managers (`pt_manager.py`, `log_manager.py`) that handle the outbound flow of data back to the Java backend.
- **`Lumia.sh`**: The master initialization script that sets up permissions, builds base Docker images, and launches the API.

## 🚀 Setup & Execution

*Note: The Cluster Manager is designed to run on a Linux environment with Docker installed. It requires elevated privileges to manage containers.*

### Prerequisites
- Python 3.8+
- Docker & Docker Compose
- `sudo` privileges

### Installation

1. Install required Python dependencies:
   ```bash
   pip install -r DeliveringQueue/include/base-requirements.txt
   ```
2. (Optional) Configure the environment variables. The system will auto-generate `.env` files in `DeliveringQueue/` dynamically, but you can set base paths if necessary.

### Launching the Manager

The easiest way to start the Cluster Manager is via the provided shell script:

```bash
./Lumia.sh
```

This script will:
1. Build the necessary Docker images based on the files in `Build-AI/`.
2. Apply necessary permissions.
3. Start the FastAPI server on port `5001`.

Alternatively, you can manually run the API:
```bash
sudo python3 API.py
```

## 🔒 Security & Sandboxing

User scripts are executed inside Docker containers strictly separated from the host. Network access is restricted to communicating with the local game server socket, and resource limits can be enforced via the `docker-compose-app.yml` templates inside the `DeliveringQueue`.
