# What is a training package ?

This is a training package that you have downloaded on the Lumia website. This package will help you to develop and train your own AI using the game you have picked. In this package you will find multiple files:
- File 1 (Connect4Game.py): the game you picked, to be launched first.
- File 2 (connect4-starter-script.py): a starter script.
- File 3 (AI-connect4.py): a very basic script made to simulate an AI’s behavior. It will need to be launched before your own AI, it will be your opponent.

### What is a the starter script ?

This is a script that includes all the code necessary to connect to the game server via sockets, a main function to handle the communication loop, and a placeholder ia_decision function that currently takes manual keyboard input for testing purposes. You can use it to launch and verify the connection to the game, then replace the logic inside ia_decision with your own AI implementation.

# Game's rule

Your goal is to fulfill the win condition, which is to align **four of your pieces in a row** — either **horizontally**, **vertically**, or **diagonally** — before your opponent does. The game is played on a **7-column by 6-row** grid. Players take turns dropping pieces into one of the columns; the piece will occupy the lowest available space in that column.

You control your pieces by sending a **column number (0–6)** to the game server, indicating where you'd like to drop your next piece.

Once you first connect to the game and after each commands you send to it you will receive the current state of the game, which will look like this:

`state_data`:
```
{"grid": ".......\n.......\n.......\n.......\n.......\n.......", "currentTurn": "X", "playerSymbol": "O", "isGameOver": false}
```

The AI's opponent, that we made and provided you will always be playing as "X" and will need to be launch first, before your own AI. Which means you always play second, as player "O".

When the game is over, a log file will be generated.


### Win condition(s)

1) Align 4 of your pieces horizontally, vertically, or diagonally.

### Lose condition(s)

1) The opponent gets 4 pieces aligned before you do.
2) The game ends in a draw (no spaces left and no winner).
3) You fail to respond in time or send invalid moves 3 times in a row.