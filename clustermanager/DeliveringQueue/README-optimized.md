# Optimized Docker Setup for Lumia Games

This directory now contains an optimized Docker setup that builds separate images for each game type, reducing storage usage and preventing unnecessary rebuilds.

## Structure

### Dockerfiles
- `Dockerfile.connect4` - Uses Alpine Linux for minimal size
- `Dockerfile.imagerecognition` - Uses Python 3.9-slim for ML dependencies
- `Dockerfile.snake` - Uses Python 3.9 for game dependencies
- `Dockerfile.old` - Backup of the original multi-purpose Dockerfile

### Scripts
- `build-images.sh` - Builds images only if they don't exist
- `run-game.sh` - Main script to run games with automatic image building

### Configuration
- `docker-compose-app.yml` - Updated to use pre-built images
- Environment variables are now handled in docker-compose, not in Dockerfiles

## Usage

### Build all images
```bash
./build-images.sh
```

### Run a specific game
```bash
./run-game.sh connect4
./run-game.sh imagerecognition
./run-game.sh snake
```

### Manual docker-compose usage
```bash
export GAME_NAME=connect4  # or imagerecognition, snake
docker-compose -f docker-compose-app.yml up
```

## Benefits

1. **Storage Optimization**: Each game uses the most appropriate base image
   - Connect4: Alpine Linux (minimal)
   - Image Recognition: Python slim (ML optimized)
   - Snake: Python full (game optimized)

2. **No Unnecessary Rebuilds**: Images are only built if they don't exist

3. **Cleaner Architecture**: Environment variables handled in docker-compose

4. **Faster Startup**: Pre-built images start containers faster

## Image Names
- `lumia-connect4`
- `lumia-imagerecognition`
- `lumia-snake`

