# Clustermanager Documentation

This directory orchestrates the management, training, and deployment of AI scripts and Docker containers for the Lumia platform. It includes API endpoints, file monitoring, Docker management, logging, and training automation.

---

## Table of Contents
- [Overview](#overview)
- [Key Components](#key-components)
  - [API.py](#apipy)
  - [AI.py](#aipy)
  - [Lumia.sh](#lumiash)
  - [DeliveringQueue/](#deliveringqueue)
  - [AI-Vault/](#ai-vault)
  - [train/](#train)
  - [logs/](#logs)
  - [build/ and Build-AI/](#build-and-build-ai)
- [Setup & Usage](#setup--usage)
- [Environment Variables](#environment-variables)
- [Docker & Deployment](#docker--deployment)
- [Notes](#notes)

---

## Overview

The `clustermanager` folder is the backend and orchestration layer for running, training, and managing user-submitted AI scripts in isolated Docker containers. It provides:
- A FastAPI-based API for managing Docker containers and file uploads.
- Automated file monitoring and environment configuration.
- Training and log management.
- Integration with the main Java backend and the front-end.

---

## Key Components

### API.py
- **Purpose:** Main FastAPI server for orchestrating Docker containers, handling file uploads, and communicating with the Java backend.
- **Endpoints:**
  - `/api/rundocker`: Launches a Docker container for a user’s AI script.
  - `/api/delete/docker`: Stops and removes a Docker container.
  - `/api/game_data`: Receives and forwards game log data.
  - `/api/training_finished`: Notifies backend when training is complete.
  - `/api/getfile`: Allows backend to download trained model files.
  - `/api/restartdocker`: Restarts a Docker container for a user.
- **Other:** Launches file/log/train managers as background threads.

### AI.py
- **Purpose:** Example AI script that reads from a named pipe (FIFO) and prints received data. Used for testing or as a template.

### Lumia.sh
- **Purpose:** Shell script to build and start Docker containers and run the API server with appropriate permissions.
- **Usage:**  
  ```bash
  ./Lumia.sh
  ```

### DeliveringQueue/
- **Purpose:** Core folder for managing user AI scripts, Docker orchestration, and file monitoring.
- **Key files:**
  - `file_monitor.py`: Watches for new AI scripts, updates environment files, and restarts Docker Compose as needed.
  - `manage_user.py`: Handles creation and deletion of user directories and associated files.
  - `controller.py`: (If present) Additional orchestration logic.
  - `docker-compose-app.yml`, `Dockerfile`: Docker Compose and build configuration.
  - `init_train.sh`, `launch.sh`: Helper scripts for training and launching containers.
  - `Game-Vault/`: Contains game logic scripts (e.g., Snake, Connect4, ImageRecognition).
  - `include/`: Requirements and configuration files.
- **Subfolders:**  
  - `1/`, `2/`, `3/`: Per-user or per-session directories for running containers.

### AI-Vault/
- **Purpose:** Stores persistent copies of user AI scripts and configuration files, organized by user/session.

### train/
- **Purpose:** Manages training jobs and notifies the backend when training is complete.
- **Key file:**  
  - `pt_manager.py`: Watches for new/updated model files and notifies the backend.

### logs/
- **Purpose:** Handles log files and forwards them to the backend.
- **Key file:**  
  - `log_manager.py`: Scans for new log files, sends them to the backend, and deletes them after successful upload.

### build/ and Build-AI/
- **Purpose:** Build artifacts and additional Docker build scripts/configs.

---

## Setup & Usage

1. **Install Python dependencies:**  
   ```bash
   pip install -r DeliveringQueue/include/base-requirements.txt
   ```

2. **Set up environment variables:**  
   - Create a `.env` file in `DeliveringQueue/` (see below).

3. **Build and start Docker containers:**  
   ```bash
   ./Lumia.sh
   ```
   Or manually:
   ```bash
   docker-compose build
   docker-compose up
   ```

4. **Run the API server:**  
   ```bash
   sudo python3 API.py
   ```

---

## Environment Variables

Example `.env` for DeliveringQueue:
```
WORKDIR_PATH=/1/snake
PORT=5001
GAME_PATH=/Game-Vault/snake.py
```
These are updated automatically by the file monitor as new scripts are detected.

---

## Docker & Deployment

- **Docker Compose** is used to manage isolated environments for each user’s AI script.
- The system supports running multiple containers simultaneously for different users/games.
- Ensure Docker and Docker Compose are installed and configured.

---

## Notes

- **Volume Paths:** You may need to adjust volume paths in Dockerfiles and docker-compose files to match your system.
- **Permissions:** The API server may require `sudo` for certain operations (see `Lumia.sh`).
- **Front-end Integration:** The front-end uploads AI scripts to the `/upload` route, which are then processed and run in containers.
- **Extensibility:** Add new games by placing their scripts in `Game-Vault/` and updating relevant enums/configs.

---.