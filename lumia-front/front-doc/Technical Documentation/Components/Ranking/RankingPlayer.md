EN

# **RankingPlayer**

# **React Component Documentation**

## **Description**

RankingPlayer is a React component that displays a ranking row for a player, showing their rank, username (pseudo), and score. It slightly adjusts its styling based on the left prop.

---

## **Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| ranking | number | Yes | The player’s rank in the leaderboard (e.g., 1, 2, 3…) |
| pseudo | string | Yes | The player’s username |
| score | string or number | No | The player’s score (displayed on the right) |
| left | boolean | No | If true, applies special styling for left alignment |

---

## **Behavior & Styling**

- The main container has a padding-top of 10px.
- Depending on the value of left:
    - If true: fixed width of 350px, height 30px, white background (or dark mode equivalent), rounded corners, normal horizontal spacing.
    - If false or omitted: same width/height/background but with extra horizontal padding (120px left and right).
- The rank is shown inside a purple circle (#5328EA) with white centered text.
- The username is shown with a font size of 13px, light purple color, with hidden overflow and ellipsis if too long.
- The score is displayed on the right side in the same purple color.
- Uses Gotham font with font weight 650.

---

## **Usage Example**

```
<RankingPlayer ranking={1} pseudo="Ney" score={1500} left={true} />
```

---

## **PropTypes**

- ranking: required number.
- pseudo: required string.
- score: not currently defined in PropTypes but used; recommended to add.
- left: not currently defined in PropTypes; can be added as an optional boolean.

---

## **Suggestions**

Add score and left in PropTypes for better robustness:

```
RankingPlayer.propTypes = {
  ranking: PropTypes.number.isRequired,
  pseudo: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.bool
};
```

Optionally, add defaultProps for score and left if needed.

-------------------------------------------

FR

# Documentation — Composant `RankingPlayer`

## Description

`RankingPlayer` est un composant React qui affiche une ligne de classement pour un joueur, avec son rang, pseudo et score. Il ajuste légèrement son style selon la propriété `left`.

---

## Props

| Nom | Type | Obligatoire | Description |
| --- | --- | --- | --- |
| `ranking` | number | Oui | Le rang du joueur dans le classement (ex: 1, 2, 3...) |
| `pseudo` | string | Oui | Le pseudo (nom d’utilisateur) du joueur |
| `score` | string ou number | Non | Le score obtenu par le joueur (affiché à droite) |
| `left` | boolean | Non | Si vrai, applique un style particulier pour alignement à gauche |

---

## Comportement & Style

- Le conteneur principal a un padding-top de 10px.
- Selon la valeur de `left` :
    - Si `true` : largeur fixe de 350px, hauteur 30px, fond blanc (ou sombre en mode dark), arrondi, avec un espacement normal.
    - Si `false` ou absent : même largeur/hauteur/fond mais avec un padding horizontal supplémentaire (120px à gauche/droite).
- Affiche le rang dans un cercle violet (#5328EA) avec texte blanc, centré.
- Affiche le pseudo avec une taille de police de 13px, couleur violette claire, avec overflow caché et ellipsis si trop long.
- Affiche le score à droite, dans la même couleur violette.
- Typographie Gotham, poids 650.

---

## Exemple d’utilisation

```jsx
<RankingPlayer ranking={1} pseudo="Ney" score={1500} left={true} />

```

---

## PropTypes

- `ranking` : nombre requis.
- `pseudo` : chaîne de caractères requise.
- `score` : non défini dans les `propTypes` mais utilisé. Il serait recommandé de l’ajouter.
- `left` : non défini dans les `propTypes`. Peut être ajouté comme booléen optionnel.

---

## Suggestions

- Ajouter `score` et `left` dans les PropTypes pour plus de robustesse :

```
RankingPlayer.propTypes = {
  ranking: PropTypes.number.isRequired,
  pseudo: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.bool
};

```

- Ajouter une valeur par défaut pour `left` et `score` via `defaultProps` si nécessaire.