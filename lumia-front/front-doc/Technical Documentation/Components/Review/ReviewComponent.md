EN

# **ReviewComponent**

# **Documentation — Component**

### **Description**

ReviewComponent is a React component that displays a full user review section, including:

- An overall average rating summary via the ReviewAverage component.
- A list of individual reviews (username, rating, comment, date, photo) rendered through multiple instances of the ReviewReview component.
- Uses **framer-motion** for smooth, coordinated entrance animations.

---

## **Key Features**

- **Scroll-triggered entrance animation** (whileInView) with smooth transitions on opacity and vertical position.
- **Responsive layout**:
    - Column layout (flex-col) on small screens.
    - Row layout (flex-row) on large screens (lg: breakpoint).
- **Staggered child animation** (staggerChildren) for a cascading reveal effect.
- Each individual review animates independently with a slight delay (delay: index * 0.1).

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Default** |
| --- | --- | --- | --- | --- |
| data | Array | List of reviews, each containing username, rating, review text, date, and image URL | Yes | N/A |

### **Data item structure**

Each element in the data array should be an object with these properties:

- pseudo (string): username or display name.
- rating (number): user rating.
- review (string): review text.
- date (string): date of the review.
- image (string): URL or path to user photo.

---

## **Usage Example**

```
const reviewsData = [
  {
    pseudo: "Alice",
    rating: 5,
    review: "Great product, highly recommend!",
    date: "2024-06-01",
    image: "/images/alice.jpg"
  },
  {
    pseudo: "Bob",
    rating: 4,
    review: "Good value for the price.",
    date: "2024-05-28",
    image: "/images/bob.jpg"
  },
  // ... other reviews
];

<ReviewComponent data={reviewsData} />
```

---

## **Dependencies**

- **React**
- **framer-motion** (for animations)
- Child components:
    - ReviewAverage (displays overall average rating)
    - ReviewReview (displays individual review)

---

## **DOM Structure**

- Main container uses flex layout (column or row depending on screen size) with spacing (gap).
- ReviewAverage displayed on the left (or top on small screens).
- Container for user reviews arranged horizontally or vertically, each review animated independently.

-----------------------------

FR

# Documentation — Composant `ReviewComponent`

## Description

`ReviewComponent` est un composant React qui affiche une section complète d'avis utilisateurs, comprenant :

- Un résumé global de la note moyenne via le composant `ReviewAverage`.
- Une liste d’avis individuels (pseudo, note, commentaire, date, photo) via plusieurs instances du composant `ReviewReview`.
- Utilisation de **framer-motion** pour une animation d’apparition fluide et coordonnée.

---

## Fonctionnalités principales

- **Animation d’apparition au scroll** (`whileInView`) avec une transition fluide sur l’opacité et la position verticale.
- **Disposition responsive** :
    - En colonne (`flex-col`) sur petits écrans.
    - En ligne (`flex-row`) sur écrans larges (`lg:`).
- **Effet de décalage progressif** (`staggerChildren`) sur les enfants pour une apparition en cascade.
- Chaque avis individuel est animé indépendamment avec un léger délai (`delay: index * 0.1`).

---

## Props

| Nom | Type | Description | Obligatoire | Valeur par défaut |
| --- | --- | --- | --- | --- |
| data | `Array` | Liste d’avis contenant les informations : pseudo, rating, review, date, image | Oui | N/A |

### Structure d’un élément `data`

Chaque élément dans le tableau `data` doit être un objet avec les propriétés suivantes :

- `pseudo` (string) : nom ou pseudo de l’utilisateur.
- `rating` (number) : note donnée par l’utilisateur.
- `review` (string) : texte de l’avis.
- `date` (string) : date de l’avis.
- `image` (string) : URL ou chemin de l’image/photo de l’utilisateur.

---

## Exemple d’utilisation

```jsx
const reviewsData = [
  {
    pseudo: "Alice",
    rating: 5,
    review: "Super produit, je recommande !",
    date: "2024-06-01",
    image: "/images/alice.jpg"
  },
  {
    pseudo: "Bob",
    rating: 4,
    review: "Bon rapport qualité-prix.",
    date: "2024-05-28",
    image: "/images/bob.jpg"
  },
  // ... autres avis
];

<ReviewComponent data={reviewsData} />

```

---

## Dépendances

- **React**
- **framer-motion** pour les animations
- Composants enfants :
    - `ReviewAverage` (affiche la note moyenne globale)
    - `ReviewReview` (affiche un avis individuel)

---

## Structure DOM

- Conteneur principal en flex (colonne / ligne selon écran) avec espacement (`gap`).
- `ReviewAverage` à gauche (ou en haut sur petit écran).
- Conteneur des avis utilisateurs en ligne ou colonne, chaque avis animé séparément.