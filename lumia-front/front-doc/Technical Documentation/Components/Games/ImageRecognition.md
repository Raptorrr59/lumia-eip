EN

# **📄ImageRecognition Component**

## **🔍 Description**

ImageRecognition is a React component implementing an interactive game where the user must guess whether an image shows a cat or a dog. The game fetches images and expected answers from a backend stream via WebSocket and public APIs.

---

## **🎯 Key Features**

- **Data Loading**
    
    Retrieves real-time response logs (expected: "cat" or "dog") from backend via WebSocket and HTTP requests.
    
- **Image Display**
    
    Loads and displays cat and dog images from public APIs (thecatapi.com and thedogapi.com), with a local fallback image if loading fails.
    
- **Gameplay**
    
    The user must answer whether the image is a cat or a dog.
    
    The score updates based on correct answers.
    
    The game runs through a series of rounds defined by the received logs.
    
- **Visual Feedback**
    
    Shows animations indicating correct or incorrect answers.
    
- **Time Management**
    
    Each round lasts a set duration (default 3 seconds) before automatically advancing.
    

---

## **🧠 Component State**

| **State Variable** | **Type** | **Description** |
| --- | --- | --- |
| isPlaying | boolean | Indicates if a game is currently running |
| gameOver | boolean | Indicates if the game has ended |
| turn | integer | Current turn index within the sequence of responses |
| score | integer | Player’s current score |
| responses | array | Array of expected answers retrieved from logs |
| currentImage | string | URL of the currently displayed image |
| isLoading | boolean | Indicates if data (logs/images) is loading |
| feedbackStatus | string | Visual feedback status: "correct" or "incorrect" |
| indicatorVisible | boolean | Controls visibility of the feedback indicator |

---

## **⚙️ Main Events and Functions**

- runGame()
    
    Initializes state for a new game and starts the gameplay loop.
    
- stopGame()
    
    Ends the game and resets relevant states.
    
- **Next Turn Progression**
    
    Automatically increments turn every delay milliseconds.
    
- **Logs Reception**
    
    Receives game logs via WebSocket and fetch, appends to gameLogs, extracts expected responses.
    
- handleUserAnswer(answer)
    
    Compares user’s answer with expected response, updates score and feedback accordingly.
    
- fetchCatImage() and fetchDogImage()
    
    Fetch images from respective public APIs.
    

---

## **🎛 Props**

| **Prop Name** | **Type** | **Optional** | **Description** |
| --- | --- | --- | --- |
| delay | integer | Yes | Duration of each turn in milliseconds. Default: 3000 ms |

---

## **💡 Usage Example**

```
<ImageRecognition delay={3000} />
```

---

## **📝 Notes**

- The game can only start once the game logs are fully loaded.
- Final score is displayed at the end of the game.
- Images reload each turn according to the expected answer.

---------------------------------------------------------

FR

# Documentation du composant `ImageRecognition`

## Description

`ImageRecognition` est un composant React qui implémente un jeu interactif où l’utilisateur doit deviner si une image montre un chat ou un chien. Le jeu récupère des images et des réponses attendues à partir d’un flux backend via WebSocket et API publiques.

---

## Fonctionnalités principales

- **Chargement des données**
    
    Récupère en temps réel des logs de réponses (attendu : "cat" ou "dog") depuis un backend via WebSocket et requêtes HTTP.
    
- **Affichage d’images**
    
    Charge et affiche des images de chats et de chiens depuis des API publiques (`thecatapi.com` et `thedogapi.com`), avec une image locale de secours en cas d’échec.
    
- **Gameplay**
    
    L’utilisateur doit répondre si l’image correspond à un chat ou un chien.
    
    Le score est mis à jour en fonction des réponses correctes.
    
    Le jeu se déroule sur une série de tours définis par les logs reçus.
    
- **Feedback visuel**
    
    Affiche une animation indiquant si la réponse est correcte ou incorrecte.
    
- **Gestion du temps**
    
    Chaque tour dure une durée définie (par défaut 3 secondes), puis passe automatiquement au suivant.
    

---

## États (States)

- `isPlaying` (bool) : indique si une partie est en cours.
- `gameOver` (bool) : indique la fin de la partie.
- `turn` (int) : index du tour actuel dans la séquence de réponses.
- `score` (int) : score actuel du joueur.
- `responses` (array) : tableau des réponses attendues récupérées des logs.
- `currentImage` (string) : URL de l’image affichée.
- `isLoading` (bool) : indique si les données sont en cours de chargement.
- `feedbackStatus` (string) : statut du feedback visuel ("correct" ou "incorrect").
- `indicatorVisible` (bool) : contrôle la visibilité de l’indicateur de feedback.

---

## Principaux événements et fonctions

- **Démarrer le jeu**
    
    `runGame()` : initialise les états pour une nouvelle partie et lance la boucle de jeu.
    
- **Arrêter le jeu**
    
    `stopGame()` : termine la partie et réinitialise certains états.
    
- **Passer au tour suivant**
    
    Un intervalle automatique qui fait avancer `turn` toutes les `delay` secondes.
    
- **Réception des logs**
    
    Via WebSocket et fetch, les logs sont ajoutés à `gameLogs` puis extraits dans `responses`.
    
- **Gestion des réponses utilisateur**
    
    `handleUserAnswer(answer)` : compare la réponse donnée par l’utilisateur avec la réponse attendue et met à jour le score et le feedback.
    
- **Chargement des images**
    
    `fetchCatImage()` et `fetchDogImage()` récupèrent les images depuis les API.
    

---

## Props

- `delay` (int, optionnel) : durée (en ms) de chaque tour. Défaut : 3000 ms.

---

## Utilisation

```jsx
<ImageRecognition delay={3000} />

```

---

## Notes

- Le jeu ne peut démarrer que lorsque les logs de jeu sont chargés.
- Le score final s’affiche à la fin du jeu.
- Les images sont rechargées à chaque tour selon la réponse attendue.