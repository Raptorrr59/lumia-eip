EN

# **About Page**

This page introduces the project team and the company’s core values, with multilingual support and animations.

---

## **Description**

- The page uses the useLang() hook to get the user’s current language.
- Displays a header with a dynamically translated title and description.
- Presents a responsive grid listing team members with their photo, name, role, and localized description.
- Includes a dedicated section for the company’s core values, each accompanied by an icon and a translated description.
- Integrates appearance and interaction animations using the framer-motion library.
- Supports light/dark mode via Tailwind CSS classes.

---

## **Data Used**

- teamMembersData: Array containing each team member’s information (name, role, description, image).
- TranslationsDictionary: Dictionary of text translations used on the page, adapted to the selected language.

---

## **Key Features**

- **Animations with Framer Motion**:
    
    Fade-in and slide transitions on section load, zoom on photo and badge hover.
    
- **Multilingual**:
    
    All text is fully translated based on the active language using the useLang context and the TranslationsDictionary.
    
- **Responsive**:
    
    Grid layout adapts to mobile, tablet, and desktop screen sizes.
    
- **Light/Dark Mode Support**:
    
    Conditional styling based on the active theme.
    

---

## **Page Structure**

- **Header**: Main title and general description of the team.
- **Team Grid**: Individual cards with photo, name, role, and description.
- **Values Section**: Three blocks showcasing the company’s fundamental values with SVG icons and translated texts.

---

## **Example Integration**

```
import About from './pages/About';

function App() {
  return (
    <div>
      <About />
    </div>
  );
}
```

---

## **External Dependencies**

- React
- framer-motion for animations
- Custom language context (useLang)
- Tailwind CSS for styling

--------------------------------

FR

# Page About

Cette page présente l’équipe du projet ainsi que les valeurs de l’entreprise, avec un support multilingue et des animations.

---

## Description

- La page utilise le hook `useLang()` pour récupérer la langue courante de l’utilisateur.
- Elle affiche un en-tête avec un titre et une description traduits dynamiquement.
- Présente une grille responsive listant les membres de l’équipe avec leur photo, nom, rôle et description localisée.
- Affiche une section dédiée aux valeurs clés de l’entreprise, chacune accompagnée d’une icône et d’une description traduite.
- Intègre des animations d’apparition et d’interaction via la bibliothèque `framer-motion`.
- Gère le mode clair/sombre avec des classes Tailwind CSS.

---

## Données utilisées

- `teamMembersData` : tableau contenant les informations de chaque membre (nom, rôle, description, image).
- `TranslationsDictionary` : dictionnaire des traductions des textes utilisés sur la page, adapté à la langue sélectionnée.

---

## Fonctionnalités principales

- **Animations avec Framer Motion** :
    
    Transitions d’opacité et translation lors du chargement des sections, zoom au survol des photos et badges.
    
- **Multilingue** :
    
    Texte entièrement traduit selon la langue active grâce au contexte `useLang` et au dictionnaire `TranslationsDictionary`.
    
- **Responsive** :
    
    Mise en page en grille adaptable sur mobiles, tablettes et desktop.
    
- **Support thème clair/sombre** :
    
    Styles conditionnels selon le mode affiché.
    

---

## Structure de la page

- **Header** : Titre principal et description générale de l’équipe.
- **Grille des membres** : Cartes individuelles avec photo, nom, rôle, description.
- **Section valeurs** : Trois blocs illustrant les valeurs fondamentales avec icônes SVG et textes.

---

## Exemple d’intégration

```jsx
import About from './pages/About';

function App() {
  return (
    <div>
      <About />
    </div>
  );
}

```

---

## Dépendances externes

- React
- `framer-motion` pour les animations
- Contexte de langue personnalisé (`useLang`)
- Tailwind CSS pour la gestion des styles