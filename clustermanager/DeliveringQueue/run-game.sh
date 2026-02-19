#!/bin/sh

# Main script to run games with optimized Docker images
# Usage: ./run-game.sh <game_name> [other_env_vars...]

set -e

GAME_NAME=${1:-"connect4"}

# Validate game name
if [[ ! "$GAME_NAME" =~ ^(connect4|imagerecognition|snake)$ ]]; then
    echo "❌ Error: Invalid game name '$GAME_NAME'"
    echo "Valid options: connect4, imagerecognition, snake"
    exit 1
fi

echo "🎮 Starting game: $GAME_NAME"

# Build images if they don't exist
echo "🔧 Ensuring Docker images are built..."
./build-images.sh

# Set environment variables for docker-compose
export GAME_NAME="$GAME_NAME"

# Run the game using docker-compose
echo "🚀 Launching game container..."
docker-compose -f docker-compose-app.yml up --remove-orphans

echo "✅ Game session completed"

