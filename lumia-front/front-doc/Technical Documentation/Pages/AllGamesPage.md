EN

# **AllGamesPage Documentation**

## **Description**

This page displays all available games, featuring advanced filtering and search capabilities.

It uses smooth animations via **Framer Motion** to enhance user experience.

---

## **Main Features**

### **Search by Name**

- A search field (SearchBar) allows filtering games based on the entered name.

### **Multiple Filters**

- Three multi-select filters using the FilterDropdown component:
    - **Languages** (e.g., Python)
    - **Game Types** (e.g., Strategy, Arcade, Puzzle)
    - **Categories** (e.g., Most Played, Top Rated)
- Filtering applies cumulative conditions (logical AND across filters).

### **Animated Display**

- Filtered games are displayed in a responsive grid (1 to 4 columns depending on screen size).
- Each game card uses **Framer Motion** for:
    - Progressive entrance animation with column-based delay
    - Hover effects (glow, slight translation, rotation, zoom)
    - Click effect (slight scale down)

### **User Feedback**

- If no games match the criteria, an informative message is displayed.

---

## **Internal State (useState)**

| **State Name** | **Type** | **Description** |
| --- | --- | --- |
| searchTerm | string | Text entered in the search bar. |
| selectedLanguages | array | Selected programming languages for filtering (e.g., Python). |
| selectedTypes | array | Selected game types for filtering. |
| selectedCategories | array | Selected categories for filtering. |

---

## **Data & Sources**

- **GamesData** (imported): an array containing all game data (name, type, language, image, category, ID, etc.).
- **TranslationsDictionary**: dictionary of translated strings used throughout the page, depending on the active language (via useLang()).

---

## **Components Used**

- **SearchBar**
    
    A controlled input field for filtering games by name.
    
- **FilterDropdown**
    
    Allows multiple selections for each filter type (language, type, category).
    
- **RedirectionGame**
    
    Displays a game card with relevant info and handles redirection on click.
    
- **motion (Framer Motion)**
    
    Used for animations on appearance, hover, and click.
    

---

## **Filtering Logic**

A game is displayed **only if it satisfies all** of the following:

- Its name contains the searchTerm (case-insensitive).
- Its language is in selectedLanguages (or all if none selected).
- Its type is in selectedTypes (or all if none selected).
- Its category is in selectedCategories (or all if none selected).

---

## **Design & UX**

- Responsive layout built with Tailwind CSS.
- Supports dark mode.
- Primary color: violet (#5328EA) used in headings and animations.
- Hover effects with shadows and gradients on cards to catch the user’s eye.

------------------------------

FR

# Documentation de la page **AllGamesPage**

## Description

Page affichant tous les jeux disponibles, avec des fonctionnalités avancées de filtrage et de recherche.

Elle utilise des animations fluides via **Framer Motion** pour une meilleure expérience utilisateur.

---

## Fonctionnalités principales

### Recherche par nom

- Un champ de recherche (`SearchBar`) permet de filtrer les jeux en fonction du nom saisi.

### Filtres multiples

- Trois filtres avec sélection multiple via le composant `FilterDropdown` :
    - Langues (ex : Python)
    - Types de jeux (ex : Stratégie, Arcade, Jeu de réflexion)
    - Catégories (ex : Les plus joués, Les mieux notés, etc.)
- Le filtrage s’applique en cumulant les conditions (AND logique entre les filtres).

### Affichage animé

- Les jeux filtrés s’affichent en grille responsive (1 à 4 colonnes selon la taille d’écran).
- Chaque carte jeu utilise **Framer Motion** pour :
    - Animation d’apparition progressive avec délai par colonne
    - Effets au survol (lueur, légère translation, rotation, zoom)
    - Effet au clic (réduction légère de l’échelle)

### Messages utilisateur

- Si aucun jeu ne correspond aux critères, un message informatif s’affiche.

---

## États internes (useState)

| État | Type | Description |
| --- | --- | --- |
| `searchTerm` | string | Texte saisi dans la barre de recherche. |
| `selectedLanguages` | array | Langues sélectionnées pour filtrer (ex : Python). |
| `selectedTypes` | array | Types de jeux sélectionnés pour filtrer. |
| `selectedCategories` | array | Catégories sélectionnées pour filtrer. |

---

## Données & sources

- **GamesData** (importé) : tableau contenant les données des jeux (nom, type, langage, image, catégorie, id, etc.).
- **TranslationsDictionary** : dictionnaire de traductions pour le texte selon la langue active (via `useLang()`).

---

## Composants utilisés

- **SearchBar**
    
    Champ de recherche contrôlé pour filtrer les jeux par nom.
    
- **FilterDropdown**
    
    Permet de sélectionner plusieurs options pour chaque critère (langue, type, catégorie).
    
- **RedirectionGame**
    
    Affiche une carte jeu avec ses informations et gère la redirection au clic.
    
- **motion (Framer Motion)**
    
    Pour les animations d’apparition, hover, et clic.
    

---

## Logique de filtrage

Chaque jeu doit satisfaire :

- `game.name` contient le texte de recherche (insensible à la casse).
- Sa langue est dans `selectedLanguages` (ou tous si aucune sélection).
- Son type est dans `selectedTypes` (ou tous si aucune sélection).
- Sa catégorie est dans `selectedCategories` (ou tous si aucune sélection).

Le jeu est affiché uniquement s’il remplit tous ces critères.

---

## Design & UX

- Layout responsive avec Tailwind CSS.
- Mode sombre pris en charge.
- Couleurs principales violet (#5328EA) pour les titres et animations.
- Ombres et dégradés au survol des cartes pour attirer l’attention.