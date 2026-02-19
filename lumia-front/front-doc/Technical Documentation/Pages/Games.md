EN

# **Games Component Documentation**

## **Description**

The Games component is a React page displaying a list of video games with advanced search, filtering, and animations. It uses framer-motion for animations, a multilingual system via a useLang provider, and offers filterable categories, game types, and programming languages.

---

## **Main Features**

- **Displays video games** with image, name, type, programming language, category, locked/unlocked status, and tutorial link.
- **Search** by game name.
- **Multi-select filters** by language, game type, and category.
- **Visual animations** on game cards when appearing and on hover.
- **Separate sections** for new games, most played games, and beginner-friendly games.
- **Multilingual support** with translations from TranslationsDictionary.
- **Uses child components:** SearchBar, FilterDropdown, and RedirectionGame.
- **React Router integration** (Link) for client-side navigation.

---

## **Imports**

- React hooks: useState, useMemo for local state and optimized filtering.
- motion from framer-motion for animations.
- Custom components: SearchBar, FilterDropdown, RedirectionGame.
- useLang hook for current language retrieval.
- TranslationsDictionary for localized strings.
- Link from react-router-dom for navigation.

---

## **Data Used**

```
export const GamesData = [
  { id, name, type, language, category?, image, locked, tuto? },
  // ...
]
```

- id: unique identifier
- name: game name
- type: game type (e.g., “Arcade”, “Battle”)
- language: programming language used
- category: game category (e.g., “For Beginners”)
- image: URL of game image
- locked: boolean, if the game is locked
- tuto: optional YouTube tutorial ID

---

## **Local State (useState)**

- searchTerm: string input by the user to search games by name.
- selectedLanguages: array of selected languages for filtering.
- selectedTypes: array of selected game types.
- selectedCategories: array of selected categories.

---

## **Event Handlers**

- handleSearchChange: updates searchTerm.
- handleLanguageChange: toggles languages in selectedLanguages.
- handleTypeChange: toggles types in selectedTypes.
- handleCategoryChange: toggles categories in selectedCategories.

---

## **Fixed Lists for Filters**

- languageList = ["Python", "C++"]
- typeList = ["Arcade", "Battle", "Utility"]
- categoryList = ["Most Played", "Top Rated", "For Beginners"]

---

## **Filtering Logic (useMemo)**

filteredGames is computed by filtering GamesData such that:

- The game name includes the searchTerm (case-insensitive).
- The language is in selectedLanguages (or all if none selected).
- The type is in selectedTypes (or all if none selected).
- The category is in selectedCategories (or all if none selected).

---

## **JSX Structure**

### **1. Hero Section**

- Multilingual headline text.
- Navigation buttons linking to /all-games and /courses.
- Featured image with rotation and hover effects.
- Smooth appearance animations.

### **2. Search Bar and Filters**

- SearchBar component with controlled input.
- FilterDropdown components for language, type, and category filters.
- Modern styling with light/dark mode support.

### **3. Game Sections**

Three main sections displaying filtered games:

- **New Games:** shows the first 4 filtered games.
- **Most Played:** games with category "Most Played" (note a possible filter typo "Les plus jouer").
- **For Beginners:** games with category "For Beginners".

Each game is displayed as an animated card with:

- Hover effects (scale, translation, rotation).
- Animated glowing border.
- Floating particle effects in the “Most Played” section.
- Uses the RedirectionGame component for clickable cards with details and navigation.

### **4. Final CTA Section**

- Invitation to explore all games.
- Button linking to /all-games.
- Visual effects with gradients and blurred circles in the background.
- Multilingual text.

---

## **Child Components**

- **SearchBar**: controlled search input.
- **FilterDropdown**: multi-select dropdown for filtering by language, type, and category.
- **RedirectionGame**: clickable game card showing image, title, and lock status.

---

## **Styling & Design**

- Tailwind CSS with light/dark mode support.
- Dominant colors: violet (#5328EA, #7855E6), orange (#FF774D), green (#00C896).
- Responsive layout with adaptive grids.
- Smooth animations powered by framer-motion.

-------------------------------

FR

# Documentation du composant `Games`

## Description

Le composant `Games` est une page React qui affiche une liste de jeux vidéo, avec des fonctionnalités avancées de recherche, filtrage, et animation. Il utilise `framer-motion` pour les animations, un système de traduction via un provider `useLang`, et propose des catégories, types, et langages de jeux filtrables.

---

## Fonctionnalités principales

- **Affichage de jeux vidéo** avec image, nom, type, langage, catégorie, état verrouillé/déverrouillé, et tutoriel.
- **Recherche** par nom de jeu.
- **Filtres** multi-sélection par langage, type de jeu, et catégorie.
- **Animations visuelles** à l'affichage et au survol des cartes de jeux.
- **Sections distinctes** pour nouveaux jeux, jeux les plus joués, et jeux pour débutants.
- **Système multilingue** avec traduction des textes via `TranslationsDictionary`.
- **Appels à des composants enfants** : `SearchBar`, `FilterDropdown`, et `RedirectionGame`.
- **Utilisation de React Router** (`Link`) pour la navigation vers d'autres pages.

---

## Importations

- `useState`, `useMemo` de React : gestion de l'état local et calcul optimisé des jeux filtrés.
- `motion` de `framer-motion` : animations des éléments.
- Composants personnalisés : `SearchBar`, `FilterDropdown`, `RedirectionGame`.
- `useLang` : hook personnalisé pour récupérer la langue courante.
- `TranslationsDictionary` : dictionnaire de traductions.
- `Link` de `react-router-dom` : navigation client.

---

## Données utilisées

```
export const GamesData = [
  { id, name, type, language, category?, image, locked, tuto? },
  ...
]

```

- `id` : identifiant unique.
- `name` : nom du jeu.
- `type` : type du jeu (ex : "Arcade", "Affrontement").
- `language` : langage de programmation utilisé.
- `category` : catégorie du jeu (ex : "Pour les débutants").
- `image` : URL de l’image représentant le jeu.
- `locked` : booléen indiquant si le jeu est verrouillé.
- `tuto` : ID tutoriel YouTube (optionnel).

---

## États locaux (`useState`)

- `searchTerm` : chaîne de recherche entrée par l’utilisateur.
- `selectedLanguages` : liste des langages sélectionnés pour filtrer.
- `selectedTypes` : liste des types de jeu sélectionnés.
- `selectedCategories` : liste des catégories sélectionnées.

---

## Fonctions de gestion des événements

- `handleSearchChange` : met à jour `searchTerm`.
- `handleLanguageChange` : ajoute ou retire un langage dans `selectedLanguages`.
- `handleTypeChange` : ajoute ou retire un type dans `selectedTypes`.
- `handleCategoryChange` : ajoute ou retire une catégorie dans `selectedCategories`.

---

## Listes fixes pour les filtres

- `languageList = ["Python", "C++"]`
- `typeList = ["Arcade", "Affrontement", "Utilitaire"]`
- `categoryList = ["Les plus joués", "Les mieux notés", "Pour les débutants"]`

---

## Filtrage des jeux (`useMemo`)

Le tableau `filteredGames` est calculé à partir de `GamesData` selon :

- Le nom contient la chaîne `searchTerm` (insensible à la casse).
- Le langage appartient à `selectedLanguages` (ou aucun filtre).
- Le type appartient à `selectedTypes` (ou aucun filtre).
- La catégorie appartient à `selectedCategories` (ou aucun filtre).

---

## Structure JSX

### 1. Hero Section

- Texte d’accroche multilingue.
- Boutons de navigation vers `/all-games` et `/courses`.
- Image mise en avant avec un effet de rotation et de survol.
- Animations d’apparition.

### 2. Barre de recherche et filtres

- Composant `SearchBar` avec champ de recherche.
- Composant `FilterDropdown` avec filtres par langue, type, catégorie.
- Style visuel moderne avec fond clair/sombre.

### 3. Sections de jeux

Trois sections principales, chacune affichant les jeux filtrés correspondants :

- **Nouveaux jeux** : affiche les 4 premiers jeux filtrés.
- **Les plus joués** : affiche les jeux avec la catégorie `"Les plus joués"` (note : bug possible sur la chaîne `"Les plus jouer"` dans le filtre).
- **Pour débutants** : affiche les jeux avec la catégorie `"Pour les débutants"`.

Chaque jeu est affiché dans une carte animée avec :

- Effet de survol (scale, translation, rotation).
- Effet de lueur animée.
- Bordure animée.
- Particules flottantes dans la section "Les plus joués".
- Le composant `RedirectionGame` qui affiche les détails et gère la navigation.

### 4. Section CTA finale

- Invitation à explorer tous les jeux.
- Bouton vers `/all-games`.
- Effets visuels avec dégradés et cercles flous en arrière-plan.
- Texte multilingue.

---

## Composants enfants

- **`SearchBar`** : champ de recherche contrôlé.
- **`FilterDropdown`** : sélection multiple pour filtrer par langue, type, catégorie.
- **`RedirectionGame`** : carte jeu cliquable avec image, titre, état verrouillé.

---

## Styles et design

- Utilisation de Tailwind CSS avec support mode clair/sombre.
- Couleurs dominantes : violet (#5328EA, #7855E6), orange (#FF774D), vert (#00C896).
- Layout responsive (grilles adaptatives).
- Animations fluides grâce à framer-motion.