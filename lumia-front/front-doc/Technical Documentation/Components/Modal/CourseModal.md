EN

# **📄CourseModal Component**

## **🔍 Description**

CourseModal is a React component that displays a modal window presenting the details of an online course (formation), with the ability to navigate to specific lessons or start the course.

---

## **📥 Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| formation | object (required) | Object containing information about the course to display. See structure below. |
| onClose | function (required) | Function called to close the modal. |

### **Structure of formation**

```
{
  id: number,          // Unique ID of the course
  name: string,        // Name of the course
  difficulty: string,  // Difficulty level (e.g., "Beginner", "Advanced")
  image: string,       // URL of the course image
  isFree: boolean,     // Indicates if the course is free
  locked: boolean,     // Indicates if the course is locked
  content: [           // Array of lesson objects within the course
    {
      name: string,        // Lesson name
      language: string,    // Lesson language
      difficulty: string,  // Lesson difficulty
      duree: string        // Approximate duration of the lesson
    },
    ...
  ]
}
```

---

## **🎯 Key Features**

- Displays a modal showing the course name, difficulty, status (free/premium/locked), and image.
- Handles image loading errors by falling back to displaying the first letter of the course name.
- Shows a dropdown list of the course’s lessons.
- Allows navigation to a specific lesson when clicking on it.
- Start the course via a **“Start Course”** button.
- Locks page scrolling while the modal is open.
- Uses framer-motion for smooth open/close animations.
- Supports multi-language translations via a dictionary, using useLang for the selected language.

---

## **🔄 Behavior**

- Clicking outside the modal or on the “X” button closes the modal (onClose).
- Clicking on a lesson closes the modal and navigates to that lesson.
- Clicking on “Start Course” closes the modal and navigates to the full course.

---

## **🔁 Usage Example**

```
<CourseModal
  formation={{
    id: 1,
    name: "Advanced React",
    difficulty: "Intermediate",
    image: "https://example.com/react.png",
    isFree: true,
    locked: false,
    content: [
      { name: "Introduction", language: "EN", difficulty: "Easy", duree: "10 min" },
      { name: "Hooks", language: "EN", difficulty: "Medium", duree: "20 min" },
    ]
  }}
  onClose={() => setShowModal(false)}
/>
```

-------------------------------------------------------------

FR

# Documentation du composant `CourseModal`

## Description

`CourseModal` est un composant React qui affiche une fenêtre modale présentant les détails d'une formation (cours en ligne), avec la possibilité de naviguer vers des étapes spécifiques ou de démarrer la formation.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| `formation` | `object` (obligatoire) | Objet contenant les informations sur la formation à afficher. Voir structure ci-dessous. |
| `onClose` | `function` (obligatoire) | Fonction appelée pour fermer la modale. |

### Structure de `formation`

```
{
  id: number,          // Identifiant unique de la formation
  name: string,        // Nom de la formation
  difficulty: string,  // Niveau de difficulté (ex : "Débutant", "Avancé")
  image: string,       // URL de l'image associée à la formation
  isFree: bool,        // Indique si la formation est gratuite
  locked: bool,        // Indique si la formation est verrouillée
  content: [           // Tableau d’objets représentant les étapes/cours de la formation
    {
      name: string,        // Nom de l'étape
      language: string,    // Langue de l'étape
      difficulty: string,  // Difficulté de l'étape
      duree: string       // Durée approximative de l'étape
    },
    ...
  ]
}

```

---

## Fonctionnalités principales

- **Affichage d’une modale** avec le nom, la difficulté, le statut (gratuit/premium/verrouillé) et une image de la formation.
- Gestion d’erreur de chargement de l’image avec fallback sur la première lettre du nom.
- Affichage d’une liste déroulante des différentes étapes/cours de la formation.
- Navigation vers une étape spécifique d’un cours quand on clique sur une étape.
- Démarrage de la formation via un bouton « Commencer la formation ».
- Gestion du défilement de la page verrouillée tant que la modale est ouverte.
- Utilisation de `framer-motion` pour l’animation d’ouverture/fermeture.
- Traductions intégrées via un dictionnaire (multi-langues) selon la langue sélectionnée via `useLang`.

---

## Comportement

- Le clic en dehors de la modale ferme celle-ci (`onClose`).
- Le clic sur le bouton "X" ferme la modale.
- Le clic sur un cours de la liste ferme la modale et navigue vers l’étape correspondante.
- Le clic sur "Commencer la formation" ferme la modale et navigue vers la formation complète.

---

## Exemple d’utilisation

```jsx
<CourseModal
  formation={{
    id: 1,
    name: "React Avancé",
    difficulty: "Intermédiaire",
    image: "https://example.com/react.png",
    isFree: true,
    locked: false,
    content: [
      { name: "Introduction", language: "FR", difficulty: "Facile", duree: "10 min" },
      { name: "Hooks", language: "FR", difficulty: "Moyen", duree: "20 min" },
    ]
  }}
  onClose={() => setShowModal(false)}
/>

```