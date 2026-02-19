EN

# **CarousselPresentation**

# **Documentation — Component**

## **Description**

CarousselPresentation is a React component that displays an animated, responsive carousel of games (or items) with manual navigation and auto-play functionality. It uses **Framer Motion** for smooth animations and provides navigation controls adapted for both desktop and mobile screens.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| data | Array | List of objects representing the games to display. Each object must contain at least: id, name, type, language, image, locked | Yes | [ { id: 1, name: "Chess", ... }, ... ] |

---

## **Main Features**

- **Responsive**: the number of visible items adapts to screen width (1 to 4 items visible).
- **Navigation**: buttons to go to the previous or next item.
- **Pagination**: visual indicators (small buttons) to jump directly to a page.
- **Auto-play**: automatically scrolls the items every 4 seconds, pauses on hover.
- **Animations**: entry/exit animations of items with rotation, translation, and scaling using Framer Motion.
- **Visual Effects**: borders, glows, and animated particles on item hover.
- **Mobile controls**: navigation buttons displayed at the bottom only on small screens.

---

## **Behavior**

- itemsPerPage is automatically computed based on window width (window.innerWidth):
    - <640px: 1 item
    - <768px: 2 items
    - <1024px: 3 items
    - >=1024px: 4 items
- startIndex controls the index of the first item displayed on the current page.
- The carousel loops infinitely (circular navigation).
- Auto-play pauses when the user hovers the carousel.
- Pagination is shown as small round buttons indicating the active page.

---

## **Render Structure Example**

```
<div className="relative w-full">
  {/* Pagination top-right */}
  {/* Main carousel with prev/next buttons */}
  {/* Animated items */}
  {/* Auto-play indicator */}
  {/* Mobile controls at bottom */}
</div>
```

---

## **Key Code Snippets**

### **Responsive items count**

```
const updateItemsPerPage = useCallback(() => {
  if (window.innerWidth < 640) setItemsPerPage(1);
  else if (window.innerWidth < 768) setItemsPerPage(2);
  else if (window.innerWidth < 1024) setItemsPerPage(3);
  else setItemsPerPage(4);
});
```

### **Auto-play with interval**

```
useEffect(() => {
  if (!isAutoPlaying || data.length <= itemsPerPage) return;
  const interval = setInterval(() => {
    setDirection(1);
    setStartIndex((prev) => (prev + itemsPerPage) % data.length);
  }, 4000);
  return () => clearInterval(interval);
}, [isAutoPlaying, itemsPerPage, data.length]);
```

### **Manual navigation**

```
const handleNext = () => {
  setDirection(1);
  setStartIndex((prev) => (prev + itemsPerPage >= data.length ? 0 : prev + itemsPerPage));
};

const handlePrev = () => {
  setDirection(-1);
  setStartIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, data.length - itemsPerPage) : prev - itemsPerPage));
};
```

---

## **Dependencies**

- React
- framer-motion (animations and transitions)
- lucide-react (Chevron left/right icons)
- RedirectionGame component to display each item

---

## **Usage Example**

```
const gamesData = [
  { id: 1, name: "Chess", type: "Strategy", language: "EN", image: "chess.png", locked: false },
  { id: 2, name: "Poker", type: "Card", language: "EN", image: "poker.png", locked: true },
  // ...
];

<CarousselPresentation data={gamesData} />
```

---

## **Accessibility**

- Pagination buttons include aria-labels to indicate the page number.
- Prev/Next buttons are disabled if there are not enough items to navigate.

---

## **Notes**

- Make sure each object in data has a unique id for React keys.
- Auto-play disables automatically if the number of items is less than or equal to the items displayed simultaneously.
- The component uses TailwindCSS for styling.

---------------------------------------------------------

FR

# Documentation — Composant `CarousselPresentation`

## Description

`CarousselPresentation` est un composant React qui affiche un carrousel animé et responsive de jeux (ou éléments), avec navigation manuelle et auto-play. Il utilise **Framer Motion** pour les animations fluides et offre des contrôles de navigation adaptés aux écrans desktop et mobile.

---

## Props

| Nom | Type | Description | Obligatoire | Exemple |
| --- | --- | --- | --- | --- |
| `data` | `Array` | Liste d’objets représentant les jeux à afficher. Chaque objet doit contenir au minimum : `id`, `name`, `type`, `language`, `image`, `locked` | Oui | `[ { id: 1, name: "Chess", ... }, ... ]` |

---

## Fonctionnalités principales

- **Responsive** : le nombre d’items affichés s’adapte à la taille de l’écran (1 à 4 éléments visibles).
- **Navigation** : boutons pour aller à l’élément précédent ou suivant.
- **Pagination** : indicateurs visuels (petits boutons) pour naviguer directement vers une page.
- **Auto-play** : fait défiler automatiquement les éléments toutes les 4 secondes, avec pause au survol.
- **Animations** : animations d’entrée/sortie des éléments avec effets de rotation, translation et scale via Framer Motion.
- **Effets visuels** : bordures, lueurs et particules animées au survol des items.
- **Contrôles mobiles** : boutons de navigation en bas visibles uniquement sur petits écrans.

---

## Comportement

- `itemsPerPage` est automatiquement calculé en fonction de la largeur de la fenêtre (`window.innerWidth`) :
    - `<640px` : 1 item
    - `<768px` : 2 items
    - `<1024px` : 3 items
    - `>=1024px` : 4 items
- La propriété `startIndex` détermine l’index du premier élément affiché dans la page courante.
- Le carrousel boucle à la fin et au début (navigation circulaire).
- Lorsqu’un utilisateur survole le carrousel, la lecture automatique est mise en pause.
- La pagination est représentée par des petits boutons ronds qui indiquent la page active.

---

## Structure du rendu

```jsx
<div className="relative w-full">
  {/* Pagination en haut à droite */}
  {/* Carrousel principal avec boutons précédents/suivants */}
  {/* Animation des éléments */}
  {/* Indicateur d’auto-play */}
  {/* Contrôles mobiles en bas */}
</div>

```

---

## Extraits clés

### Gestion de la taille et du responsive

```
const updateItemsPerPage = useCallback(() => {
  if (window.innerWidth < 640) setItemsPerPage(1);
  else if (window.innerWidth < 768) setItemsPerPage(2);
  else if (window.innerWidth < 1024) setItemsPerPage(3);
  else setItemsPerPage(4);
});

```

### Auto-play avec intervalle

```
useEffect(() => {
  if (!isAutoPlaying || data.length <= itemsPerPage) return;
  const interval = setInterval(() => {
    setDirection(1);
    setStartIndex((prev) => (prev + itemsPerPage) % data.length);
  }, 4000);
  return () => clearInterval(interval);
}, [isAutoPlaying, itemsPerPage, data.length]);

```

### Navigation manuelle

```
const handleNext = () => {
  setDirection(1);
  setStartIndex((prev) => (prev + itemsPerPage >= data.length ? 0 : prev + itemsPerPage));
};

const handlePrev = () => {
  setDirection(-1);
  setStartIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, data.length - itemsPerPage) : prev - itemsPerPage));
};

```

---

## Dépendances externes

- **React**
- **framer-motion** (animations et transitions)
- **lucide-react** (icônes Chevron gauche/droite)
- Composant `RedirectionGame` pour afficher chaque item

---

## Exemple d’utilisation

```jsx
const gamesData = [
  { id: 1, name: "Chess", type: "Strategy", language: "EN", image: "chess.png", locked: false },
  { id: 2, name: "Poker", type: "Card", language: "EN", image: "poker.png", locked: true },
  // ...
];

<CarousselPresentation data={gamesData} />

```

---

## Accessibilité

- Les boutons pagination ont des labels aria (`aria-label`) pour indiquer la page.
- Les boutons précédent/suivant sont désactivés si le nombre d’items est insuffisant.

---

## Notes

- Assure-toi que chaque objet dans `data` possède un `id` unique pour le key React.
- L’auto-play se désactive automatiquement si le nombre d’items est inférieur ou égal à ceux affichés simultanément.
- Le composant utilise TailwindCSS pour le style.