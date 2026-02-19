EN

# **GameCode Component**

React component that dynamically renders a game among several available games based on the game name passed as a prop.

---

## **Description**

- This component receives a game object as a prop.
- According to the game.name property, it displays the corresponding React component:
    - "Snake" → <Snake /> component
    - "Connect Four" → <ConnectFour /> component
    - "Image Recognition" → <ImageRecognition /> component
- Passes the game object as a prop to the rendered game component.

---

## **Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| game | object | Object representing the game to display. Should contain a name property indicating the game’s name. |

---

## **Usage**

```
import GameCode from './GameCode';

const myGame = { name: "Snake", /* other game-specific properties */ };

<GameCode game={myGame} />
```

---

## **Behavior**

- Conditional rendering based on the value of game.name.
- If game.name does not match any supported game, no component will be rendered.

---

## **Source Code**

```
import ConnectFour from "./games/ConnectFour/ConnectFour";
import Snake from "./games/Snake/Snake";
import ImageRecognition from "./games/ImageRecognition/ImageRecognition";

const GameCode = ({ game }) => {
    return (
        <div>
            {game.name === "Snake" && <Snake game={game} />}
            {game.name === "Connect Four" && <ConnectFour game={game} />}
            {game.name === "Image Recognition" && <ImageRecognition game={game} />}
        </div>
    );
}

export default GameCode;
```

---

## **Suggestions for Improvement**

- Add a fallback component or message if game.name does not match any known game.
- Use a mapping object { [gameName]: Component } to make the code more extensible.

------------------------------------------------

FR

# GameCode Component

Composant React permettant de rendre dynamiquement un jeu parmi plusieurs jeux disponibles selon le nom du jeu passé en prop.

---

## Description

- Ce composant reçoit un objet `game` en prop.
- Selon la propriété `game.name`, il affiche le composant React correspondant au jeu :
    - `"Snake"` → composant `<Snake />`
    - `"Connect Four"` → composant `<ConnectFour />`
    - `"Image Recognition"` → composant `<ImageRecognition />`
- Passe l'objet `game` en prop au composant jeu affiché.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| game | objet | Objet représentant le jeu à afficher. Devrait contenir une propriété `name` indiquant le nom du jeu. |

---

## Utilisation

```jsx
import GameCode from './GameCode';

const myGame = { name: "Snake", /* autres propriétés spécifiques au jeu */ };

<GameCode game={myGame} />

```

---

## Comportement

- Rendu conditionnel basé sur la valeur `game.name`.
- Si `game.name` ne correspond à aucun jeu supporté, aucun composant ne sera affiché.

---

## Code source

```jsx
import ConnectFour from "./games/ConnectFour/ConnectFour";
import Snake from "./games/Snake/Snake";
import ImageRecognition from "./games/ImageRecognition/ImageRecognition";

const GameCode = ({ game }) => {
    return (
        <div>
            {game.name === "Snake" && <Snake game={game} />}
            {game.name === "Connect Four" && <ConnectFour game={game} />}
            {game.name === "Image Recognition" && <ImageRecognition game={game} />}
        </div>
    );
}

export default GameCode;

```

---

## Suggestions d'amélioration

- Ajouter un composant fallback ou un message si `game.name` ne correspond à aucun jeu connu.
- Utiliser un objet de mapping `{ [gameName]: Component }` pour rendre le code plus extensible.