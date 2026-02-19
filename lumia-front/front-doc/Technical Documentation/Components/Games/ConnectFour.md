EN

# **🎮ConnectFour Component**

## **🔍 Description**

ConnectFour is a React component that visually replays a **Connect Four** game from server-provided logs. It offers two playback modes:

- **Automatic playback** (“START GAME”)
- **Step-by-step mode** (“STEP MODE”)

---

## **📥 Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| game | any | No | Object representing a game. Currently unused in the code. |

---

## **🧠 Internal State**

| **Variable** | **Type** | **Description** |
| --- | --- | --- |
| gameGrid | string[][] | 7x6 game grid; each cell contains "", "red", or "yellow" |
| score | number | User score (not yet dynamic) |
| gameOver | boolean | Indicates if the game is finished |
| gameWon | boolean | Indicates if the user has won |
| isPlaying | boolean/number | Indicates if the game is currently playing |
| gameLogs | object | Object containing game logs |
| isLoading | boolean | Indicates if logs are currently loading |
| turn | number | Current turn during the game |
| currentStep | number | Current step in step-by-step mode |
| isStepMode | boolean | Indicates if “step mode” is active |

---

## **🔁 Functionality**

### **▶️ runGameWithLogs()**

Starts automatic replay of the game by playing each move every 1000 ms.

### **⏹️ stopGame()**

Stops the current game and clears the timer.

### **🐢 handleNextStep()**

Plays the next move in **step-by-step mode** on each click.

### **🔄 startStepMode()**

Toggles the step-by-step mode on or off.

### **📡 fetchLogs()**

Makes a streaming HTTP request to receive real-time game logs via EventStream.

### **🔌 WebSocket**

Connected to /ws with STOMP protocol; subscribes to /topic/ to trigger log retrieval on events.

---

## **🧱 Grid Structure**

- **7 rows**, **6 columns**
- Each cell can contain:
    - "" (empty)
    - "red" (player X / AI)
    - "yellow" (player O / user)

---

## **🧪 Embedded Test Data**

```
const TestLogsBack = { ... }
```

Contains a finished game scenario with a user win (“O”).

---

## **💡 UI and Behavior**

### **Buttons**

- **START / STOP GAME**
    - Starts or stops the automatic replay
    - Disabled if logs are missing or if isStepMode is active
- **STEP MODE**
    - Enables step-by-step mode
- **NEXT STEP**
    - Plays the next move in step mode
    - Disabled if the game is finished

### **Overlays**

- "GAME OVER" — shown when the game ends
- "YOU WON" — shown on user victory

---

## **🛠 Dependencies**

- React, including hooks: useEffect, useState, useRef, useCallback
- SockJS, @stomp/stompjs for WebSocket connection
- @mui/material/Tooltip
- ConnectFour.css for styling
- API endpoint /api/game/stream for fetching logs

---

## **📦 Export**

```
export default ConnectFour;
```

---

## **✅ Integration Example**

```
import ConnectFour from './components/ConnectFour';

const GamePage = () => (
  <div>
    <h1>Replay a Connect Four game</h1>
    <ConnectFour game={/* optional game data */} />
  </div>
);
```

---

## **🚀 Improvement Ideas**

- ✅ Add a **loading spinner**
- ✅ Show **player names** (X vs O)
- ✅ Add a **replay speed control**
- ✅ Visually highlight **winning tokens**
- ⏳ Animate the token drop (currently instantaneous)
- 🔄 Enable replaying the game without re-fetching logs

------------------------------------------------------------

FR

# 🎮 `ConnectFour` Component

## 🔍 Description

`ConnectFour` est un composant React qui rejoue visuellement une partie du jeu **Puissance 4** (Connect Four) à partir de logs fournis côté serveur. Il propose deux modes de lecture :

- **Lecture automatique** ("START GAME")
- **Mode pas à pas** ("STEP MODE")

---

## 📥 Props

| Nom | Type | Requis | Description |
| --- | --- | --- | --- |
| `game` | `any` | Non | Objet représentant un jeu. Actuellement inutilisé dans le code. |

---

## 🧠 State interne

| Variable | Type | Description |
| --- | --- | --- |
| `gameGrid` | `string[][]` | Grille du jeu (7x6), chaque cellule contenant `""`, `"red"`, ou `"yellow"` |
| `score` | `number` | Score utilisateur (non encore dynamique) |
| `gameOver` | `boolean` | Indique si la partie est terminée |
| `gameWon` | `boolean` | Indique si l'utilisateur a gagné |
| `isPlaying` | `boolean`/`number` | Si la partie est en cours |
| `gameLogs` | `object` | Objet contenant les logs de la partie |
| `isLoading` | `boolean` | Indique si les logs sont en cours de chargement |
| `turn` | `number` | Tour actuel pendant la partie |
| `currentStep` | `number` | Étape actuelle en mode pas à pas |
| `isStepMode` | `boolean` | Si le mode "pas à pas" est activé |

---

## 🔁 Fonctionnement

### ▶️ `runGameWithLogs()`

Lance la relecture automatique d'une partie à partir des logs en jouant chaque coup toutes les 1000 ms.

### ⏹️ `stopGame()`

Arrête le jeu en cours et vide le timer.

### 🐢 `handleNextStep()`

Joue un coup supplémentaire dans le **mode pas à pas** à chaque clic.

### 🔄 `startStepMode()`

Active ou désactive le mode pas à pas.

### 📡 `fetchLogs()`

Effectue une requête HTTP en streaming pour recevoir les logs de jeu en temps réel via `EventStream`.

### 🔌 WebSocket

Connecté à `/ws` avec STOMP, s'abonne à `/topic/` pour déclencher la récupération des logs en cas d'événement.

---

## 🧱 Structure de la grille

- **7 lignes (rows)**, **6 colonnes (cols)**
- Chaque cellule peut contenir :
    - `""` (vide)
    - `"red"` (joueur X / IA)
    - `"yellow"` (joueur O / utilisateur)

---

## 🧪 Données de test embarquées

```
const TestLogsBack = { ... }

```

Contient un scénario de partie terminée avec une victoire de l'utilisateur ("O").

---

## 💡 UI et Comportement

### Boutons

- **START / STOP GAME**
    - Exécute ou interrompt la relecture automatique.
    - Inactif si les logs sont absents ou si `isStepMode` est actif.
- **STEP MODE**
    - Active le mode "pas à pas".
- **NEXT STEP**
    - Joue le prochain coup en mode "pas à pas".
    - Désactivé si le jeu est terminé.

### Overlays

- `"GAME OVER"` : affiché lorsque la partie se termine
- `"YOU WON"` : affiché en cas de victoire utilisateur

---

## 🛠 Dépendances

- `React`, `useEffect`, `useState`, `useRef`, `useCallback`
- `SockJS`, `@stomp/stompjs` : pour la connexion WebSocket
- `@mui/material/Tooltip`
- `ConnectFour.css` : pour la mise en forme visuelle
- (API `/api/game/stream` pour la récupération des logs)

---

## 📦 Export

```
export default ConnectFour;

```

---

## ✅ Exemple d’intégration

```jsx
import ConnectFour from './components/ConnectFour';

const GamePage = () => {
  return (
    <div>
      <h1>Revoir une partie de Connect Four</h1>
      <ConnectFour game={/* données optionnelles */} />
    </div>
  );
};

```

---

## 🚀 Idées d'amélioration

- ✅ Ajouter un **indicateur de chargement** (`spinner`)
- ✅ Afficher **les noms des joueurs** (X vs O)
- ✅ Ajouter un **replay speed control**
- ✅ Détecter visuellement les **pions gagnants**
- ⏳ Jouer l’animation de chute du pion (actuellement instantané)
- 🔄 Rejouer la partie sans recharger les logs