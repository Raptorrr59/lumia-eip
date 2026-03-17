# Lumia Training Packages

Welcome to the **Lumia Training Packages** repository. This directory contains the starter kits for the various games and environments supported by the Lumia AI platform. 

When users download a game package from the Lumia web interface, they receive a zipped version of these folders. These packages provide everything a developer needs to start writing, testing, and training their AI models locally before uploading them to the Lumia platform.

## 🎮 Available Games

Currently, Lumia supports three distinct AI challenges:

### 1. Connect 4 (`tp-connect4`)
A classic strategy game. The objective is to align four pieces (horizontally, vertically, or diagonally) on a 7x6 grid.
- **Your Role**: Player "O" (playing second).
- **Communication**: Send column numbers (0-6) via socket to drop a piece.
- **Challenge**: Anticipate the opponent's moves and implement search algorithms (like Minimax) or Reinforcement Learning.

### 2. Snake (`tp-snake`)
The iconic arcade game. The objective is to navigate a 10x10 grid, eat food to grow, and avoid hitting the walls or your own tail.
- **Your Role**: The Snake.
- **Communication**: Send directional commands (`MOVE_UP`, `MOVE_DOWN`, `MOVE_LEFT`, `MOVE_RIGHT`).
- **Challenge**: Spatial awareness and pathfinding (e.g., A* search, Deep Q-Learning).

### 3. Image Recognition (`tp-image`)
A computer vision classification task. The objective is to accurately classify a sequence of 20 images as either a "cat" or a "dog".
- **Your Role**: The Classifier.
- **Communication**: Receive an image path, process it, and send back `0` (cat) or `1` (dog).
- **Challenge**: Implementing Convolutional Neural Networks (CNNs) using PyTorch or TensorFlow to achieve high accuracy.

---

## 🛠️ How to Use a Training Package

Every training package follows a similar structure and workflow to make it easy to get started.

### The Package Contents
When you open a training package, you will typically find:
- **`[GameName]Game.py`**: The game server. This script runs the game logic, manages the grid/images, and listens for connections from your AI. **This must be launched first.**
- **`[game]-starter-script.py`**: A template script provided for you. It contains the boilerplate socket code required to connect to the game server. It includes a placeholder `ia_decision` function.
- **Helper Scripts / Opponents**: For games like Connect 4, an `AI-connect4.py` script is provided to act as a basic opponent.
- **Datasets**: For Image Recognition, folders containing training and testing images are included.

### Your Development Workflow

1. **Start the Game Server**: Run the `*Game.py` script in a terminal. It will wait for incoming connections.
2. **Start the Opponent (If applicable)**: For multiplayer games like Connect 4, start the provided `AI-*.py` script in a second terminal so the game server has player 1.
3. **Write Your AI**: Open the `*-starter-script.py`. Locate the `ia_decision` function. Currently, it might ask for keyboard input. Replace this logic with your own algorithms! You will receive the `state_data` (JSON) of the game every turn to base your decisions on.
4. **Run Your AI**: Execute your modified starter script in a third terminal. Watch your AI play the game!
5. **Upload**: Once you are satisfied with your AI's performance, upload your script via the Lumia frontend to compete on the leaderboards or utilize the cloud cluster for heavier training.

Happy coding, and good luck building the ultimate AI!
