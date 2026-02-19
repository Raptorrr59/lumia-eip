# What is a training package ?

This is a training package that you have downloaded on the Lumia website. This package will help you to develop and train your own AI using the game you have picked. In this package you will find multiple files:
- File 1 (SnakeGame.py): the game you picked, to be launched first.
- File 2 (snake-starter-script.py): a starter script.

### What is a the starter script ?

This is a script that includes all the code necessary to connect to the game server via sockets, a main function to handle the communication loop, and a placeholder ia_decision function that currently takes manual keyboard input for testing purposes. You can use it to launch and verify the connection to the game, then replace the logic inside ia_decision with your own AI implementation.

# Game's rule

Your goal is to fulfill the win condition, which is to fill the entire map with your snake. For this you need to eat as many “food” items as you can, one will always be present on the map and once you have eaten it, another one will automatically appear at a random empty set of coordinates. Avoid any of the losing conditions which are to hit the walls of the map or to eat your own tail.

The dimension of the game's grid is 10x10.

Move the snake around by sending of one those four string values to the game's server:
"MOVE_UP"
"MOVE_DOWN"
"MOVE_LEFT"
"MOVE_RIGHT"

Once you first connect to the game and after each commands you send to it you will receive the current state of the game, which will look like this:

`state_data`:
```
{'grid': '..........\n..........\n..........\n..........\n..........\n....BH....\n...F......\n..........\n..........\n..........', 'snake': [[5, 5], [4, 5]], 'food': [3, 6], 'direction': 'MOVE_RIGHT', 'score': 0, 'isGameOver': False}
```

When the game is over, a log file will be generated.

### Win condition(s)

1) You filled the entire map with your snake.

### Lose condition(s)

1) You hit the walls (going outside the map).
2) You eat your own tail.
3) You fail to finish the game in time.
