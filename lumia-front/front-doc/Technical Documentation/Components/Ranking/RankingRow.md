EN

# **RankingRow**

# **React Component Documentation**

## **Description**

RankingRow is a React component that displays a list of players as ranking rows. It uses the RankingPlayer component to render each player entry.

This component can display the list either in a vertically scrollable mode or as a static list limited to the top 6 players.

---

## **Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| rankingData | Array | Yes | Array of player objects, each containing at least userId and globalScore. |
| scrollable | boolean | No | Determines whether the list is vertically scrollable (true) or static (false). |

---

## **Behavior**

- **Scrollable mode (scrollable=true)**:
    - Displays all players in a vertical column inside a container with vertical scrolling (overflow-y-auto).
    - Fixed height of 200px.
    - Passes left={true} prop to each RankingPlayer for left-aligned styling.
- **Static mode (scrollable=false or omitted)**:
    - Displays only the top 6 players.
    - Displays the list in a column without scroll.
    - Passes left={false} prop to each RankingPlayer to apply horizontal padding styling.

---

## **Usage Example**

```
const players = [
  { userId: 'Ney', globalScore: 1500 },
  { userId: 'Messi', globalScore: 1450 },
  // more players...
];

<RankingRow rankingData={players} scrollable={true} />
```

---

## **Notes**

- The React key used in the list is the array index. For better performance and to avoid key collisions, it is recommended to use a unique identifier if available.
- The ranking prop passed to RankingPlayer is calculated as index + 1 to show the player’s rank position.

----------------------------------------

FR

# Documentation — Composant `RankingRow`

## Description

`RankingRow` est un composant React qui affiche une liste de joueurs sous forme de lignes de classement. Il utilise le composant `RankingPlayer` pour afficher chaque joueur.

Ce composant peut afficher la liste soit en mode défilable verticalement, soit en mode statique limité aux 6 premiers joueurs.

---

## Props

| Nom | Type | Obligatoire | Description |
| --- | --- | --- | --- |
| `rankingData` | `Array` | Oui | Tableau d’objets représentant les joueurs. Chaque objet doit contenir au moins `userId` et `globalScore`. |
| `scrollable` | `boolean` | Non | Indique si la liste doit être affichée avec un défilement vertical (`true`) ou non (`false`). |

---

## Comportement

- **Mode scrollable (`scrollable=true`) :**
    - Affiche tous les joueurs dans une colonne avec un conteneur défilable verticalement (`overflow-y-auto`).
    - Hauteur fixe de 200px.
    - Passe `left={true}` à chaque `RankingPlayer` (style aligné à gauche).
- **Mode statique (`scrollable=false` ou absent) :**
    - Affiche seulement les 6 premiers joueurs.
    - Affiche la liste en colonne sans défilement.
    - Passe `left={false}` à chaque `RankingPlayer` (style avec padding horizontal).

---

## Utilisation

```jsx
const players = [
  { userId: 'Ney', globalScore: 1500 },
  { userId: 'Messi', globalScore: 1450 },
  // autres joueurs
];

<RankingRow rankingData={players} scrollable={true} />

```

---

## Remarques

- Le `key` utilisé dans les listes est l’index du tableau. Pour de meilleures performances, il est préférable d’utiliser un identifiant unique si possible.
- `ranking` est calculé comme `index + 1` pour afficher la position dans le classement.