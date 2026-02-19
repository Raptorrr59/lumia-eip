#!/bin/bash

# Build script for game Docker images
# Only builds images if they don't already exist

set -e

# Function to check if image exists
image_exists() {
    local image_name=$1
    docker image inspect "$image_name" >/dev/null 2>&1
}

# Function to build image if it doesn't exist
build_if_not_exists() {
    local game_name=$1
    local dockerfile=$2
    local image_name="${game_name}"
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local dockerfile_path="${script_dir}/${dockerfile}"

    echo "Checking if image $image_name exists..."
    
    if image_exists "$image_name"; then
        echo "✅ Image $image_name already exists, skipping build"
    else
        echo "🔨 Building image $image_name from $dockerfile_path..."
        docker build -f "$dockerfile_path" -t "$image_name" "$script_dir"
        echo "✅ Successfully built $image_name"
    fi
}

# Main execution
echo "🚀 Starting image build process..."

# Build each game image (tag as ai-base-<game>)
build_if_not_exists "ai-base-connect4" "Dockerfile.connect4"
build_if_not_exists "ai-base-imagerecognition" "Dockerfile.imagerecognition"
build_if_not_exists "ai-base-snake" "Dockerfile.snake"

echo "🎉 All images are ready!"
echo ""
echo "Available images:"
docker images | grep "lumia-" || echo "No lumia images found"
