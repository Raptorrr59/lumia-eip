EN

# **RedirectionFormation**

# **React Component Documentation**

## **Description**

RedirectionFormation is a React component displaying an interactive card representing a training path (formation).

- Shows an image, badges (free, difficulty, course path), a locked overlay, and a summary of courses included in the formation.
- On click (if not locked), opens a modal (CourseModal) presenting more details or allowing interaction with the formation.
- Uses framer-motion for hover animations and manages language with a translation system.

---

## **Props**

| **Name** | **Type** | **Required** | **Default** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Yes | — | Unique identifier of the formation. |
| name | string | Yes | — | Name/title of the formation. |
| image | string | Yes | — | URL of the formation image. |
| difficulty | string | No | 'Not specified' | Difficulty level (e.g., “Beginner”, “Easy”, “Intermediate”, “Advanced”, “Expert”). Affects badge color. |
| isFree | bool | No | false | Indicates if the formation is free (shows a “Free” badge if true). |
| locked | bool | No | false | Indicates if the formation is locked. Blocks interaction and shows a locked overlay. |
| content | array | Yes | — | List of courses included in the formation, each item having at least a name. |

---

## **Features**

- **Interaction:**
    
    Clicking opens a detailed modal (CourseModal) if the formation is not locked.
    
- **Animation:**
    
    The card elevates slightly and shows a shadow on hover.
    
- **Dynamic display:**
    - Orange “Free” badge if isFree is true.
    - Badge color varies according to difficulty.
    - Fixed “Formation” badge at the top right.
    - Semi-transparent overlay with a lock icon and “Locked” text if locked is true.
    - Shows up to 3 course names included in the formation, with indication of additional courses.
    - Displays total number of courses and a static “+500 users” count.
- **Translations:**
    
    Badge texts and labels adapt based on the language using TranslationsDictionary and useLang.
    

---

## **Usage example**

```
const formationExample = {
  id: 101,
  name: "Advanced AI Path",
  image: "https://example.com/formation.jpg",
  difficulty: "Advanced",
  isFree: true,
  locked: false,
  content: [
    { name: "Introduction to AI" },
    { name: "Supervised Learning" },
    { name: "Neural Networks" },
    { name: "Final Project" }
  ],
};

<RedirectionFormation
  id={formationExample.id}
  name={formationExample.name}
  image={formationExample.image}
  difficulty={formationExample.difficulty}
  isFree={formationExample.isFree}
  locked={formationExample.locked}
  content={formationExample.content}
/>
```

---

## **External dependencies**

- framer-motion for animations.
- lucide-react for icons.
- CourseModal (modal opened on click).
- useLang and TranslationsDictionary for multilingual support.

---------------------------------------

FR

# Documentation — Composant `RedirectionFormation`

## Description

`RedirectionFormation` est un composant React affichant une carte interactive représentant une formation (un parcours).

- Affiche une image, des badges (gratuit, difficulté, parcours), un overlay de verrouillage, ainsi qu’un résumé des cours inclus dans la formation.
- Lors du clic (si non verrouillé), ouvre une modale (`CourseModal`) présentant plus de détails ou permettant d’interagir avec la formation.
- Utilise `framer-motion` pour une animation au survol et gère la langue via un système de traduction.

---

## Props

| Nom | Type | Obligatoire | Valeur par défaut | Description |
| --- | --- | --- | --- | --- |
| `id` | `number` | Oui | - | Identifiant unique de la formation. |
| `name` | `string` | Oui | - | Nom / titre de la formation. |
| `image` | `string` | Oui | - | URL de l’image de la formation. |
| `difficulty` | `string` | Non | `'Non spécifiée'` | Niveau de difficulté (ex: "Débutant", "Facile", "Intermédiaire", "Avancé", "Expert"). Influence la couleur du badge. |
| `isFree` | `bool` | Non | `false` | Indique si la formation est gratuite (affiche un badge "Gratuit" si vrai). |
| `locked` | `bool` | Non | `false` | Indique si la formation est verrouillée. Bloque l’interaction et affiche un overlay verrouillé. |
| `content` | `array` | Oui | - | Liste des cours inclus dans la formation, chaque élément doit contenir au moins un `name`. |

---

## Fonctionnalités

- **Interaction :**
    
    Clic ouvre une modale détaillée via `CourseModal` si la formation n’est pas verrouillée.
    
- **Animation :**
    
    L’élément s’élève légèrement et affiche une ombre portée lors du survol.
    
- **Affichage dynamique :**
    - Badge "Gratuit" orange si `isFree` est vrai.
    - Badge couleur selon la difficulté.
    - Badge "Parcours" fixe en haut à droite.
    - Overlay semi-transparent avec icône cadenas et texte "Verrouillé" si `locked`.
    - Liste des premiers cours inclus (max 3), avec indication du nombre supplémentaire.
    - Nombre de cours total et nombre fixe d’utilisateurs (+500 affiché statiquement).
- **Traductions :**
    
    Texte des badges et labels adaptatifs selon la langue via `TranslationsDictionary` et `useLang`.
    

---

## Exemple d’utilisation

```jsx
const formationExample = {
  id: 101,
  name: "Parcours IA avancée",
  image: "https://exemple.com/formation.jpg",
  difficulty: "Avancé",
  isFree: true,
  locked: false,
  content: [
    { name: "Introduction à l'IA" },
    { name: "Apprentissage supervisé" },
    { name: "Réseaux de neurones" },
    { name: "Projet final" }
  ],
};

<RedirectionFormation
  id={formationExample.id}
  name={formationExample.name}
  image={formationExample.image}
  difficulty={formationExample.difficulty}
  isFree={formationExample.isFree}
  locked={formationExample.locked}
  content={formationExample.content}
/>

```

---

## Dépendances externes

- `framer-motion` pour l’animation.
- `lucide-react` pour les icônes.
- `CourseModal` (modale affichée à l’ouverture).
- `useLang` et `TranslationsDictionary` pour gestion multilingue.