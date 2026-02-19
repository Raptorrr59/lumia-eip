EN

# **Events Component Documentation**

## **Description**

The Events component displays a list of AI-related events, organized into different categories (workshops, competitions, webinars, etc.). It features category-based filtering, dynamic event display, and a special highlight for exclusive events (such as the Beta).

It uses React hooks, framer-motion for animations, and icons from lucide-react.

---

## **Imports**

- **React, useState**: To manage local state (selected category).
- **useLang**: Custom hook to retrieve the selected language.
- **TranslationsDictionary**: Object containing text translations for multiple languages.
- **framer-motion**: Used for fade-in and transition animations.
- **lucide-react**: SVG icon library for visual information (calendar, location, time, participants, rating, badges).

---

## **State**

- selectedCategory (string): The currently selected event category, default is 'all'.

---

## **Main Features**

### **1.**

### **Category Filtering**

- The user can select an event category (all, beta, workshops, competitions, etc.).
- The list of displayed events is filtered accordingly.

### **2.**

### **Dynamic Event Display**

Each event card shows:

- Title and description (localized by current language).
- Formatted date (locale-sensitive).
- Time and location.
- Number of participants and maximum capacity.
- Rating.
- Thumbnail image.
- Price.
- Special badge if applicable (e.g., exclusive Beta badge).
- Visual highlight for exclusive events (colored border + animation).

### **3.**

### **Animations**

- Titles, filters, and events appear with fade-in and vertical slide animations using framer-motion.
- Event cards slightly zoom in on hover.

### **4.**

### **Beta Event Handling**

- A dedicated button opens a Google Forms signup in a new tab.
- A specific “Beta Pioneer” badge is shown with a description and icon.
- A progress bar displays how full the event is.

---

## **Render Structure**

1. **Header**
    
    Title and subtitle introducing the event section.
    
2. **Category Filters**
    
    Buttons to select the active category.
    
3. **Event Grid**
    
    One card per filtered event.
    
4. **“No Events” Message**
    
    Displayed if no event matches the selected filter.
    

---

## **Example Usage**

```
import Events from './components/Events';

function App() {
  return (
    <div>
      <Events />
    </div>
  );
}
```

---

## **Props**

The component does not accept external props — all logic is handled internally (language via hook, event data is hardcoded).

---

## **Important Variables**

- eventsData: array of objects containing event info (id, title, description, date, time, location, category, participants, etc.).
- categories: list of event categories available for filtering.
- filteredEvents: filtered event list according to selected category.

---

## **Internal Methods**

- handleBetaClick: opens the Beta registration Google Form in a new tab.
- formatDate(dateString): formats the date based on the selected language (fr-FR or en-US).

---

## **Styling**

- Heavy use of Tailwind CSS for responsive layout, light/dark theme support, and visual effects (shadows, transitions, animations).
- Exclusive events are emphasized with a colored ring and pulsating animation.
- Buttons (category selection and registration) feature hover transitions.

---

## **Potential Improvements**

- Extract event data into an external JSON file or API.
- Add registration handling for other types of events.
- Add unit tests.
- Support more languages.
- Add pagination for large numbers of events.

---------------------------------

FR

# Documentation du composant `Events`

## Description

Le composant `Events` affiche une liste d'événements liés à l'IA, organisés en différentes catégories (ateliers, compétitions, webinars, etc.). Il propose un filtre par catégorie, un affichage dynamique des événements, ainsi qu’une mise en avant spéciale pour les événements exclusifs (notamment la Beta).

Il utilise les hooks React, la bibliothèque `framer-motion` pour les animations, et les icônes de `lucide-react`.

---

## Importations

- **React, useState** : Pour gérer le state local (catégorie sélectionnée).
- **useLang** : Hook personnalisé pour récupérer la langue sélectionnée.
- **TranslationsDictionary** : Objet contenant les traductions des textes dans plusieurs langues.
- **framer-motion** : Pour les animations d'apparition et transitions.
- **lucide-react** : Icônes utilisées pour afficher des informations visuelles (calendrier, lieu, heure, participants, note, badge).

---

## State

- `selectedCategory` (string) : La catégorie d'événements sélectionnée par l'utilisateur, par défaut `'all'`.

---

## Fonctionnalités principales

### 1. **Filtrage par catégorie**

- L'utilisateur peut sélectionner une catégorie d'événements parmi plusieurs (tous, beta, workshops, compétitions, etc.).
- La liste des événements affichés est filtrée en fonction de cette sélection.

### 2. **Affichage dynamique des événements**

- Chaque événement affiche :
    - Titre, description (localisés selon la langue choisie)
    - Date formatée (adaptée à la langue)
    - Heure et lieu
    - Nombre de participants et capacité maximale
    - Note (rating)
    - Image illustrative
    - Prix
    - Badge spécial si applicable (ex : badge exclusif Beta)
    - Mise en avant visuelle des événements exclusifs (bordure et animation)

### 3. **Animation**

- Les titres, filtres, et événements apparaissent avec des animations d’opacité et de translation verticale via `framer-motion`.
- Les cartes d'événements zooment légèrement au survol.

### 4. **Gestion de l’événement Beta**

- Un bouton spécial ouvre un formulaire Google Forms dans un nouvel onglet.
- Affichage d’un badge spécifique « Beta Pioneer » avec description et icône.
- Barre de progression pour visualiser l’occupation des places.

---

## Structure principale du rendu

1. **Header**
    
    Titre et sous-titre présentant les événements.
    
2. **Filtres de catégorie**
    
    Boutons pour sélectionner une catégorie.
    
3. **Grille d'événements**
    
    Carte pour chaque événement filtré.
    
4. **Message "pas d'événement"**
    
    Affiché si aucun événement ne correspond au filtre.
    

---

## Exemple d’utilisation

```jsx
import Events from './components/Events';

function App() {
  return (
    <div>
      <Events />
    </div>
  );
}

```

---

## Détail des props (internes)

Le composant n’a pas de props externes, il gère tout en interne (langue via hook, données événements hardcodées).

---

## Variables importantes

- `eventsData` : tableau d’objets contenant les données des événements (id, titre, description, date, heure, lieu, catégorie, participants, etc.).
- `categories` : tableau des catégories pour le filtre.
- `filteredEvents` : tableau des événements filtrés selon la catégorie sélectionnée.

---

## Méthodes internes

- `handleBetaClick` : ouvre le formulaire Google Forms pour s’inscrire à la Beta.
- `formatDate(dateString)` : formate la date selon la langue (`fr-FR` ou `en-US`).

---

## Styles

- Utilisation intensive de Tailwind CSS pour le responsive, le thème clair/sombre et les effets visuels (ombres, transitions, animations).
- Mise en avant des événements exclusifs avec un anneau coloré et animation de pulsation.
- Boutons de catégorie et d'inscription avec effets de hover.

---

## Points d’amélioration possibles

- Extraire les données événements dans un fichier JSON ou une API externe.
- Ajouter la gestion des inscriptions pour les autres types d’événements.
- Ajouter des tests unitaires.
- Supporter plus de langues.
- Ajouter pagination si beaucoup d’événements.