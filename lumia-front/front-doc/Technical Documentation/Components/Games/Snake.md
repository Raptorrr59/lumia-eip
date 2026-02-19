EN

# **📄Snake Component**

## **🔍 Description**

Snake is a React component that displays a simulation of the classic Snake game, replayed either automatically or step-by-step from game states fetched from a backend stream. It shows the game grid, the snake, the food, the score, and manages playback modes and user interaction.

---

## **🎯 Key Features**

- WebSocket connection with backend (via STOMP over SockJS) to receive notifications of new game logs.
- Asynchronous fetching of game states (logs) via HTTP streaming (fetch) for continuous reading.
- Automatic playback mode: replays the sequence of game states at fixed 2-second intervals.
- Step-by-step mode: allows advancing one game state at a time with a button.
- Graphical display of the grid, snake (head, body, tail), and food.
- Real-time score display.
- Handling of game over events.
- UI with buttons to start, stop, toggle step mode, and step forward.

---

## **📥 Props**

- game (currently unused, possibly for future extensions)

---

## **🧠 Internal State**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| score | int | Current player score |
| gameOver | bool | Whether the game is finished |
| isPlaying | bool | Whether automatic playback is active |
| gameLogs | object | Object holding the list of game states received |
| isLoading | bool | Whether game logs are loading |
| currentStep | int | Index of the current game state in step mode |
| isStepMode | bool | Whether step-by-step mode is enabled |

---

## **🧩 Internal References (useRef)**

- timer: manages the automatic playback interval.
- loadingTimer: declared but currently unused.
- snakeCoords: array of snake segment coordinates.
- snakeCoordinatesMap: set of current snake coordinates for quick lookups.
- head: snake head position.
- foodCoordinates: position of the food.

---

## **⚙️ Main Functions**

### **fetchLogs()**

Asynchronously fetches game logs via fetch from /api/game/stream?userId=...&gameType=snake.

Reads the streaming response, parses JSON messages, and stores them in gameLogs.gameStates.

### **runGameWithLogs()**

Starts automatic playback of game states at a 2-second interval.

Updates snake and food positions, score, and detects game end.

### **handleNextStep()**

In step mode, advances one game state in the sequence.

Updates snake, food, and score, and detects game end.

### **stopGame()**

Stops automatic playback and marks the game as finished.

### **startStepMode()**

Toggles step mode on/off, resets step counter, and stops playback.

### **getCell(row, col)**

Returns JSX for a grid cell based on whether it contains snake head, body, tail, food, with appropriate CSS classes.

### **syncSnakeCoordinatesMap()**

Updates snakeCoordinatesMap to include all current snake segment coordinates.

---

## **🖥 User Interface**

- 10x10 grid displaying snake and food.
- Score displayed at top.
- Buttons:
    - **START/STOP GAME**: start or stop automatic playback (disabled in step mode or while loading).
    - **STEP MODE**: toggle step-by-step mode (disables auto playback).
    - **NEXT STEP**: advance one step in step mode (disabled if not in step mode or game over).
- Loading indicator while logs are being fetched.
- "GAME OVER" overlay message shown at the end.

---

## **🛠 Dependencies**

- React hooks: useState, useEffect, useRef, useCallback
- sockjs-client and @stomp/stompjs for WebSocket connection
- Material UI: CircularProgress, Tooltip
- CSS file Snake.css for game styles

---

## **🎨 Expected CSS classes**

- .snake-cell, .head, .food, .snake, .tail, .corner, .vertical, .horizontal, etc.
- .game-over-overlay for game over message display
- .score-controls for score and control buttons
- .loading-screen for loading state

---

## **🚀 Possible Improvements**

- More robust network error handling.
- Optimize stream reading with pause/resume support.
- Add keyboard input for real-time snake control (to make it an interactive game).
- Proper use or removal of unused loadingTimer.
- UI/UX enhancements with animations and transitions.

---------------------------------------------

FR

# Documentation du composant `Snake`

## Description

`Snake` est un composant React qui affiche une simulation d’un jeu de serpent (Snake) en lecture automatique ou pas-à-pas à partir d’états de jeu récupérés via un flux backend. Il affiche la grille du jeu, le serpent, la nourriture, le score, et gère les modes de lecture et d’interaction.

---

## Fonctionnalités principales

- **Connexion en WebSocket** avec un backend (via STOMP sur SockJS) pour recevoir les notifications de nouveaux logs de jeu.
- **Récupération asynchrone des états de jeu** (logs) via un flux HTTP (fetch) en mode lecture continue.
- **Lecture automatique** : rejoue la séquence des états de jeu avec un intervalle fixe (2 secondes par état).
- **Mode pas-à-pas** : permet de progresser dans les états un par un via un bouton.
- **Affichage graphique** de la grille, du serpent (tête, corps, queue), et de la nourriture.
- **Affichage du score** en temps réel.
- **Gestion des événements de fin de partie** (game over).
- **Interface utilisateur avec boutons** : démarrer, arrêter, mode étape, étape suivante.

---

## Props

- `game` (non utilisé dans le code actuel, probablement prévu pour des évolutions futures)

---

## États (States)

| État | Type | Description |
| --- | --- | --- |
| `score` | `int` | Score actuel du joueur |
| `gameOver` | `bool` | Indique si la partie est terminée |
| `isPlaying` | `bool` | Indique si la lecture automatique est en cours |
| `gameLogs` | `object` | Objet contenant la liste des états de jeu reçus |
| `isLoading` | `bool` | Indique si les logs sont en cours de chargement |
| `currentStep` | `int` | Index de l'état de jeu actuel en mode étape |
| `isStepMode` | `bool` | Indique si le mode pas-à-pas est activé |

---

## Références internes (useRef)

- `timer` : gestion de l’intervalle de lecture automatique.
- `loadingTimer` : (déclaré mais non utilisé).
- `snakeCoords` : tableau des coordonnées des segments du serpent.
- `snakeCoordinatesMap` : set des coordonnées actuelles du serpent (pour vérifications rapides).
- `head` : position de la tête du serpent.
- `foodCoordinates` : position de la nourriture.

---

## Principales fonctions

### `fetchLogs()`

Récupère de manière asynchrone les logs de jeu via fetch sur `/api/game/stream?userId=...&gameType=snake`.

Lis le flux en continu, extrait les messages JSON, et les stocke dans `gameLogs.gameStates`.

### `runGameWithLogs()`

Lance la lecture automatique des états de jeu avec un intervalle de 2 secondes.

Met à jour la position du serpent, la nourriture, le score, et gère la fin de partie.

### `handleNextStep()`

En mode étape, avance d’un état dans la séquence, met à jour le serpent, la nourriture et le score.

Détecte aussi la fin de partie.

### `stopGame()`

Arrête la lecture automatique, marque la partie comme terminée.

### `startStepMode()`

Active/désactive le mode étape, remet le compteur de pas à zéro, arrête la lecture automatique.

### `getCell(row, col)`

Calcule et retourne le JSX d’une cellule de la grille selon si elle contient un segment du serpent, la tête, la queue, ou la nourriture, avec la bonne classe CSS.

### `syncSnakeCoordinatesMap()`

Met à jour le set `snakeCoordinatesMap` pour contenir toutes les coordonnées du serpent.

---

## Interface utilisateur

- Grille 10x10 affichant le serpent et la nourriture.
- Score affiché en haut.
- Boutons :
    - **START/STOP GAME** : démarre ou arrête la lecture automatique (désactivé en mode étape ou chargement).
    - **STEP MODE** : active ou désactive le mode pas-à-pas (désactive lecture automatique).
    - **NEXT STEP** : avance d’un état en mode étape (désactivé si pas en mode étape ou si game over).
- Indicateur de chargement pendant la récupération des logs.
- Message "GAME OVER" affiché en surimpression à la fin.

---

## Dépendances

- React hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- SockJS et STOMP pour WebSocket (`sockjs-client`, `@stomp/stompjs`)
- Material UI (`CircularProgress`, `Tooltip`)
- Fichier CSS `Snake.css` pour le style du jeu.

---

## CSS attendu

Le CSS doit contenir les classes pour :

- `.snake-cell`, `.head`, `.food`, `.snake`, `.tail`, `.corner`, `.vertical`, `.horizontal`, etc.,
- `.game-over-overlay` pour l’affichage du message de fin,
- `.score-controls` pour les boutons et score,
- `.loading-screen` pour le chargement.

---

## Points d’amélioration possibles

- Gestion des erreurs réseau plus robuste.
- Optimisation de la lecture du flux avec gestion de pause/reprise.
- Ajouter la gestion des touches clavier pour contrôler le serpent (si tu veux en faire un vrai jeu interactif).
- Meilleure gestion du `loadingTimer` ou suppression si inutilisé.
- Amélioration UI/UX (animations, transitions).