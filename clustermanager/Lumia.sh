#!/bin/bash

set -e

echo "Building Docker containers..."
docker-compose build

echo "Starting Docker containers..."
docker-compose up &
DOCKER_PID=$!

echo "Running API.py with sudo (no password)..."
sudo /opt/homebrew/bin/python3 /Users/jonathan/Code/pre-prod/clustermanager/API.py & #sudo visudo pour editer et ajouter cette ligne a la fin (jonathan ALL=(ALL) NOPASSWD: /opt/homebrew/bin/python3 /Users/jonathan/Code/pre-prod/clustermanager/API.py) apres tu fait un ESC pour quitter le l'edition de fichier avec vim et tu :wq pour quitter et save
API_PID=$!

wait $DOCKER_PID
wait $API_PID
