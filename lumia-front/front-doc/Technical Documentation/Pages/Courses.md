EN

# **Courses Page Documentation**

## **Description**

This page displays a list of learning paths and individual courses, with advanced search and filtering functionalities. It also supports retrieving and displaying user progress on learning paths.

---

## **Main Features**

- Displays training paths (formationsData) as interactive cards.
- Filterable and searchable list of all courses (coursesData).
- Multi-criteria filters: programming languages, difficulty levels, durations.
- Text search bar.
- Visual indication and asynchronous retrieval of user progress (via API /api/check-module).
- Smooth appearance and interaction animations using **Framer Motion**.
- Multilingual support via useLang() and translation dictionary.
- Responsive design with light/dark mode support.

---

## **Internal State (useState)**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| searchTerm | string | Text input for the search bar. |
| selectedLanguages | array | Selected programming languages for filtering. |
| selectedDifficulties | array | Selected difficulty levels. |
| selectedDurees | array | Selected course durations. |
| userProgress | object | { moduleId: boolean } indicating whether a learning path is completed. |

---

## **Data Used**

- formationsData: static list of learning paths (id, name, difficulty, image, locked/free status, related content).
- coursesData: list of all courses (not detailed here).
- TranslationsDictionary: for translating all displayed text.

---

## **Components Used**

- SearchBar: input component for keyword search.
- FilterDropdown: dropdown component for multi-criteria filtering.
- RedirectionFormation: displays a learning path card with a redirect link.
- RedirectionCourse: displays an individual course card with a redirect link.
- motion (Framer Motion): used for animations on sections, cards, and messages.

---

## **Behavior and Logic**

### **Search and Filters**

- Search filters courses by name or language (case-insensitive).
- Filters allow selecting multiple programming languages, difficulty levels, and durations.
- If no option is selected for a filter, that filter is ignored (i.e., it includes everything).
- filteredCourses is recalculated using useMemo whenever a filter changes.

### **User Progress**

- On component mount (useEffect), user progress is fetched by calling /api/check-module for each training path.
- The token and user ID are retrieved from localStorage.
- The result is stored in userProgress, indicating completion status per module.
- Any error is logged to the console.

---

## **JSX Structure**

### **Banner Header**

- Violet gradient background with subtle background pattern.
- Animated title and subtitle centered on the page.
- Decorative SVG wave at the bottom.

### **Search and Filters**

- White/dark container with rounded corners and drop shadow, animated on appearance.
- Search bar on the left, filters on the right (desktop layout).
- On mobile: stacked layout with filters below the search bar.

### **Learning Paths**

- Section with a title and colored divider bar.
- Responsive grid displaying learning paths via RedirectionFormation.
- Each card has hover and entry animations (zoom and slide).

### **Filtered Course List**

- Section with a title and colored divider bar.
- Responsive grid of RedirectionCourse cards for each filtered course.
- If no courses match, a friendly message is shown with an icon and a reset filters button.

---

## **Error Handling & UX**

- If the filtered list is empty, a clear and informative message is displayed.
- Easy-to-access reset filters button.
- User data loading is wrapped in try/catch.

---

## **Example Translations Used**

| **Key** | **Example English** |
| --- | --- |
| our_courses | “Our Courses” |
| courses_subtitle | “Explore our collection of interactive courses designed to help you master AI.” |
| learning_paths | “Learning Paths” |
| all_courses | “All Courses” |
| search_course | “Search a course…” |
| no_courses_found | “No courses match your search.” |
| reset_filters | “Reset filters” |

----------------------------------------

FR

# Documentation de la page **Courses**

## Description

Cette page affiche une liste de parcours de formation et de cours individuels, avec des fonctionnalités de recherche et de filtrage avancées. Elle supporte également la récupération et l’affichage de la progression utilisateur sur les parcours.

---

## Fonctionnalités principales

- Affichage de parcours de formation (`formationsData`) sous forme de cartes interactives.
- Liste filtrable et recherchable de tous les cours (`coursesData`).
- Filtres multi-critères : langues de programmation, niveaux de difficulté, durées.
- Barre de recherche textuelle.
- Indication visuelle et récupération asynchrone de la progression utilisateur (via API `/api/check-module`).
- Animation fluide d’apparition et d’interaction avec **Framer Motion**.
- Support multilingue via `useLang()` et dictionnaire de traductions.
- Design responsive et support du mode clair/sombre.

---

## États internes (useState)

- `searchTerm` : chaîne pour la recherche textuelle.
- `selectedLanguages` : tableau des langues sélectionnées pour filtrage.
- `selectedDifficulties` : tableau des niveaux de difficulté sélectionnés.
- `selectedDurees` : tableau des durées sélectionnées.
- `userProgress` : objet `{ moduleId: bool }` indiquant si un parcours est complété.

---

## Données utilisées

- `formationsData` : liste statique des parcours de formation, avec id, nom, difficulté, image, statut verrouillé/libre, contenu (cours liés).
- `coursesData` : liste de tous les cours importée (non détaillée ici).
- `TranslationsDictionary` : pour traduire les textes affichés.

---

## Composants utilisés

- `SearchBar` : composant d’entrée pour recherche textuelle.
- `FilterDropdown` : composant affichant les filtres multi-critères.
- `RedirectionFormation` : carte affichant un parcours de formation avec lien/redirection.
- `RedirectionCourse` : carte affichant un cours individuel avec lien/redirection.
- `motion` (Framer Motion) : animations des sections, cartes, et messages.

---

## Comportement et logique

### Recherche et filtres

- La recherche filtre par nom ou langage (case insensitive).
- Les filtres permettent de sélectionner plusieurs langues, difficultés et durées.
- Si aucune option n’est sélectionnée dans un filtre, ce filtre est ignoré (affiche tout).
- `filteredCourses` est recalculé avec `useMemo` dès qu’un critère change.

### Progression utilisateur

- Au montage (`useEffect`), la progression est chargée en appelant une API `/api/check-module` pour chaque parcours.
- Le token et ID utilisateur sont récupérés depuis le `localStorage`.
- Le résultat stocke l’état de complétion par parcours dans `userProgress`.
- En cas d’erreur, celle-ci est logguée dans la console.

---

## Structure JSX

### En-tête avec bannière

- Fond dégradé violet, motif en arrière-plan avec opacité.
- Titre principal et sous-titre centrés avec animation.
- Vague décorative SVG en bas.

### Recherche et filtres

- Conteneur blanc / sombre, arrondi, ombré, avec animation d’apparition.
- Recherche à gauche, filtres à droite en mode desktop.
- Sur mobile, disposition en colonne.

### Parcours de formation

- Section avec titre et barre colorée.
- Grille responsive affichant les parcours via `RedirectionFormation`.
- Animation sur chaque carte avec effet d’agrandissement et translation.

### Liste des cours filtrés

- Section avec titre et barre colorée.
- Grille responsive de cartes `RedirectionCourse` pour chaque cours filtré.
- Si aucun cours ne correspond, affichage d’un message avec icône et bouton pour réinitialiser les filtres.

---

## Gestion des erreurs et UX

- Si la liste filtrée est vide, message clair affiché.
- Bouton de réinitialisation facile à atteindre.
- Chargement des données utilisateur encapsulé dans un `try/catch`.

---

## Traductions utilisées (exemples)

| Clé | Exemple français |
| --- | --- |
| `our_courses` | "Nos cours" |
| `courses_subtitle` | "Découvrez notre collection de cours interactifs conçus pour vous aider à maîtriser l'IA." |
| `learning_paths` | "Parcours de formation" |
| `all_courses` | "Tous les cours" |
| `search_course` | "Rechercher un cours..." |
| `no_courses_found` | "Aucun cours ne correspond à votre recherche." |
| `reset_filters` | "Réinitialiser les filtres" |