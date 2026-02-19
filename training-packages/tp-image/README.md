# What is a training package ?

This is a training package that you have downloaded on the Lumia website. This package will help you to develop and train your own AI using the game you have picked. In this package you will find multiple files:
- File 1 (ImageRecognitionGame.py): the game you picked, to be launched first.
- File 2 (ImageRecognition-starter-script.py): a starter script.
- Folder 1 (dataset-imagerecognition): a set of images (cats and dogs) for training and testing your AI.
- Folder 2 (gameselect): a gameselect folder with a small set of images for debugging your AI.

### What is the starter script ?

This is a script that includes all the code necessary to connect to the game server via sockets, a main function to handle the communication loop, and a placeholder ia_decision function that currently takes manual keyboard input for testing purposes. You can use it to launch and verify the connection to the game, then replace the logic inside ia_decision with your own AI implementation.

# Game's rule

Your goal is to correctly classify a series of images as either "cat" or "dog". The game server will send you 20 images, one at a time, and you must respond with your prediction for each image.

- **Label format:**
  - Send `0` for "cat"
  - Send `1` for "dog"

- **How it works:**
  1. The server sends a JSON object with the key `imagePath` (the path to the image file).
  2. Your AI must process the image and send back a prediction (`0` or `1`).
  3. The server checks your answer and updates your score.
  4. The process repeats until all images are classified or the game ends.

- **Example state data received:**
```
{"imagePath": "gameselect/cats/1234.jpg"}
```

- **Example response sent:**
```
0
```

- **Game log:**
  - All game states and results are saved in `game_logs.json` after the game ends.

### Win condition(s)

1) You must correctly classify at least **15 out of 20** images to win.

### Lose condition(s)

1) You classify fewer than 15 images correctly.
2) You fail to respond in time or send invalid predictions 3 times in a row.
3) The game times out after 1 hour (3600 seconds).

# How to use

## Prediction (Client Mode):

    python AI-imagerecognition.py

## Training (Train Mode):

    python AI-imagerecognition.py --train --dataset path_to_your_dataset

Replace `path_to_your_dataset` with the path to your own dataset if you wish to train your AI.

---

**Tips:**
- The images are shuffled for each game.
- The provided starter script allows you to manually enter predictions for testing.
- For more details, refer to the comments in the provided scripts and the game logs after playing.
