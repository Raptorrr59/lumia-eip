EN

# **ReviewAverage**

# **Documentation —Component**

## **Description**

ReviewAverage is a React component that displays an average rating as a stylish badge featuring a **glassmorphism** effect.

- Shows a star icon inside a gradient circle.
- Displays a visual rating composed of colored (full and gray) stars representing the average score.
- Shows the numeric rating (e.g., 4.6/5) along with the total number of reviews.
- Adds a subtle hover animation for a dynamic and interactive feel.

---

## **Features**

- **Glassmorphism Effect:**
    
    The main container uses a gradient background, backdrop blur, semi-transparent border, and drop shadow.
    
- **Hover Animation:**
    
    On hover, the component slightly scales up (scale: 1.02) and a glowing gradient border appears around it.
    
- **Star Display:**
    - 4 colored stars in violet (#5328EA) with shadow.
    - 1 gray star (#gray-400) representing a partial rating.
- **Rating Text:**
    
    Shows the average score in large font with a custom font (font-Gotham), e.g. 4.6/5.
    
- **Reviews Count:**
    
    Displayed below the rating in light gray text.
    

---

## **Technical Structure**

- Uses motion.div from **framer-motion** to handle hover animations.
- Main container styled with Tailwind CSS to achieve the glassmorphism effect.
- Gradient border layer appears only on hover via opacity animation.
- Star icon from **lucide-react** inside a gradient circle.
- Horizontal list of stars.
- Text elements for numeric rating and reviews count.

---

## **Usage Example**

```
import ReviewAverage from './ReviewAverage';

function App() {
  return (
    <div className="p-10 bg-gray-900 min-h-screen flex items-center justify-center">
      <ReviewAverage />
    </div>
  );
}
```

---

## **External Dependencies**

- **React** (hooks if needed)
- **framer-motion** (for motion.div and animations)
- **lucide-react** (for the Star icon)
- **Tailwind CSS** (for styling, colors, blur, and gradients)

-----------------------------------

FR

# Documentation — Composant `ReviewAverage`

## Description

`ReviewAverage` est un composant React affichant une évaluation moyenne sous forme d’un badge stylisé avec un effet glassmorphism.

- Affiche une icône d’étoile en cercle dégradé.
- Montre une notation visuelle (étoiles colorées + grises) représentant la note moyenne.
- Affiche la note numérique et le nombre total d’avis.
- Ajoute une légère animation au survol pour un effet interactif.

---

## Fonctionnalités

- **Effet glassmorphism** sur le conteneur principal avec un dégradé de fond, un flou, et une bordure semi-transparente.
- **Animation au survol** : léger agrandissement (`scale: 1.02`) et apparition d’un effet de bordure dégradée autour du composant.
- **Affichage des étoiles** :
    - 4 étoiles colorées (#5328EA) avec un effet d’ombre portée.
    - 1 étoile grisée (#gray-400) pour indiquer la note partielle.
- **Note numérique** : `4,6/5` en gros caractères, stylisée avec une police personnalisée (`font-Gotham`).
- **Nombre d’avis** affiché en texte gris clair.

---

## Structure du composant

- `motion.div` (framer-motion) pour gérer l’animation au survol.
- Conteneur principal avec fond en dégradé, effet blur, bordure et ombre.
- Couche d’effet de bordure dégradée qui apparaît uniquement au survol (opacity animée).
- Icône d’étoile dans un cercle dégradé.
- Ensemble des étoiles affichées en ligne.
- Texte de la note moyenne et du nombre d’avis.

---

## Exemple d’utilisation

```jsx
import ReviewAverage from './ReviewAverage';

function App() {
  return (
    <div className="p-10 bg-gray-900">
      <ReviewAverage />
    </div>
  );
}

```

---

## Dépendances externes

- **React**
- **framer-motion** pour l’animation (`motion.div`)
- **lucide-react** pour l’icône `Star`
- Tailwind CSS classes pour le style