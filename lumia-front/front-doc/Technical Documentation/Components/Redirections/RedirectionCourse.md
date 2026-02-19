EN

# **RedirectionCourse**

# **React Component Documentation**

## **Description**

RedirectionCourse is a React component that displays a visual preview of a course, including an image, badges for difficulty and free status, duration, language, and a locked state.

The component uses framer-motion for hover animations and react-router-dom for navigation to the course page when clicked, unless the course is locked.

---

## **Props**

| **Name** | **Type** | **Required** | **Default** | **Description** |
| --- | --- | --- | --- | --- |
| id | number | Yes | — | Unique identifier of the course, used for navigation to the course page. |
| name | string | Yes | — | Name or title of the course displayed. |
| difficulty | string | Yes | — | Difficulty level of the course (e.g., “Beginner”, “Intermediate”, “Advanced”, “Expert”). Influences badge color. |
| language | string | Yes | — | Language of the course displayed in the preview. |
| image | string | Yes | — | URL of the course image shown as background. |
| duration | string | No | '–' | Approximate duration of the course displayed in a top-right badge. |
| isFree | boolean | No | false | Indicates if the course is free; shows an orange “Free” badge if true. |
| locked | boolean | No | false | Indicates if the course is locked. If true, disables navigation and shows a “Locked” overlay. |

---

## **Features**

- **Navigation:**
    
    Clicking the component navigates to /courses/{id}, unless locked is true.
    
- **Hover Animation:**
    
    On hover, the component slightly elevates and casts a shadow (unless locked).
    
- **Badges Display:**
    - Orange “Free” badge if isFree is true.
    - Badge colored according to difficulty level.
    - Duration badge displayed top-right.
- **Locked Overlay:**
    
    If locked is true, a semi-transparent dark overlay covers the image, displaying a lock icon and the translated text “Locked”.
    
- **Translations:**
    
    The texts “Free” and “Locked” are translated via TranslationsDictionary based on the selected language (useLang).
    

---

## **Usage Example**

```
<RedirectionCourse
  id={42}
  name="Introduction to AI"
  difficulty="Intermediate"
  language="English"
  image="https://example.com/course-image.jpg"
  duration="3h 30m"
  isFree={true}
  locked={false}
/>
```

---

## **External Dependencies**

- framer-motion for animation.
- react-router-dom for navigation.
- lucide-react for icons.
- useLang and TranslationsDictionary for language management and translations.

------------------------------------

FR

# Documentation — Composant `RedirectionCourse`

## Description

`RedirectionCourse` est un composant React affichant un aperçu visuel d’un cours, incluant une image, des badges de difficulté et de gratuité, la durée, la langue, et un état de verrouillage.

Le composant utilise `framer-motion` pour des animations au survol, et `react-router-dom` pour rediriger vers la page du cours lorsqu’on clique dessus, sauf si le cours est verrouillé.

---

## Props

| Nom | Type | Obligatoire | Valeur par défaut | Description |
| --- | --- | --- | --- | --- |
| `id` | `number` | Oui | - | Identifiant unique du cours, utilisé pour la navigation vers la page spécifique du cours. |
| `name` | `string` | Oui | - | Nom / titre du cours affiché. |
| `difficulty` | `string` | Oui | - | Niveau de difficulté du cours (ex: "Débutant", "Intermédiaire", "Avancé", "Expert"). Influence la couleur du badge. |
| `language` | `string` | Oui | - | Langue du cours affichée dans l’aperçu. |
| `image` | `string` | Oui | - | URL de l’image du cours affichée en arrière-plan. |
| `duration` | `string` | Non | `'–'` | Durée approximative du cours affichée dans un badge en haut à droite. |
| `isFree` | `bool` | Non | `false` | Indique si le cours est gratuit, affiche un badge "Gratuit" si vrai. |
| `locked` | `bool` | Non | `false` | Indique si le cours est verrouillé. Si vrai, bloque la navigation et affiche un overlay "Verrouillé". |

---

## Fonctionnalités

- **Navigation :**
    
    Cliquer sur le composant redirige vers `/courses/{id}`, sauf si `locked` est `true`.
    
- **Animation au survol :**
    
    Le composant s’élève légèrement et affiche une ombre portée lors du survol (sauf si verrouillé).
    
- **Affichage des badges :**
    - Badge "Gratuit" en orange si `isFree` est vrai.
    - Badge couleur en fonction du niveau de difficulté (`difficulty`).
    - Badge durée en haut à droite.
- **Overlay verrouillé :**
    
    Si `locked` est vrai, un fond sombre semi-transparent recouvre l’image avec une icône de cadenas et le texte "Verrouillé".
    
- **Traductions :**
    
    Les textes "Gratuit" et "Verrouillé" sont traduits via `TranslationsDictionary` selon la langue sélectionnée (`useLang`).
    

---

## Exemple d’utilisation

```jsx
<RedirectionCourse
  id={42}
  name="Introduction à l’IA"
  difficulty="Intermédiaire"
  language="Français"
  image="https://exemple.com/image-course.jpg"
  duration="3h 30m"
  isFree={true}
  locked={false}
/>

```

---

## Dépendances externes

- `framer-motion` pour l’animation.
- `react-router-dom` pour la navigation.
- `lucide-react` pour les icônes.
- `useLang` et `TranslationsDictionary` pour la gestion des langues et des traductions.