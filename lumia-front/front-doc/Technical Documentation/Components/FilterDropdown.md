EN

# **FilterDropdown**

# **Documentation — Component**

## **Description**

FilterDropdown is a React component that displays a dropdown menu allowing to filter a list by three categories: **languages**, **game types**, and **categories**. It supports multiple selections in each filter, shows the total count of selected filters, and provides an easy way to reset all filters.

---

## **Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| languageOptions | string[] | List of available options for the language filter. |
| typeOptions | string[] | List of available options for the game type filter. |
| categoryOptions | string[] | List of available options for the category filter. |
| selectedLanguages | string[] | Currently selected languages. |
| onLanguageChange | `(language: string | string[]) => void` |
| selectedTypes | string[] | Currently selected game types. |
| onTypeChange | `(type: string | string[]) => void` |
| selectedCategories | string[] | Currently selected categories. |
| onCategoryChange | `(category: string | string[]) => void` |

---

## **Key Features**

- **Open/close dropdown menu:**
    
    The dropdown opens when clicking the main button and closes automatically when clicking outside the component (via a mousedown event listener).
    
- **Display total selected filters count:**
    
    A badge shows the total number of selected filters across all three categories.
    
- **Multiple selection support:**
    
    Each category shows its options as buttons. The button style changes to indicate selection (background color and text color).
    
- **Animations:**
    
    Uses framer-motion to animate the dropdown’s appearance/disappearance with fade and vertical slide.
    
- **Reset filters:**
    
    When at least one filter is selected, a “Reset filters” button appears at the bottom of the menu to clear all selections.
    
- **Internationalization:**
    
    Titles and text are translated based on the active language, obtained via the useLang() hook and texts stored in TranslationsDictionary.
    

---

## **Implementation Details**

- Uses useState to track dropdown open state (isOpen).
- Uses useRef and useEffect to detect clicks outside the component to close the menu.
- The main button displays a filter icon (FilterIcon), translated text (“Filters”), and a badge showing the count of selected filters.
- Options are rendered as buttons that call the respective onLanguageChange, onTypeChange, or onCategoryChange callbacks on click.
- Each category uses a distinct selection color:
    - Languages: violet (#5328EA)
    - Game types: orange (#FF774D)
    - Categories: green (#00C896)

---

## **Usage Example**

```
import React, { useState } from 'react';
import FilterDropdown from './FilterDropdown';

const App = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const languageOptions = ['Python', 'JavaScript', 'Java'];
  const typeOptions = ['Puzzle', 'Action', 'RPG'];
  const categoryOptions = ['Beginner', 'Intermediate', 'Advanced'];

  // Simple toggle handler to add/remove a value from the selected array
  const handleLanguageChange = (lang) => {
    setSelectedLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  return (
    <FilterDropdown
      languageOptions={languageOptions}
      typeOptions={typeOptions}
      categoryOptions={categoryOptions}
      selectedLanguages={selectedLanguages}
      onLanguageChange={handleLanguageChange}
      selectedTypes={selectedTypes}
      onTypeChange={handleTypeChange}
      selectedCategories={selectedCategories}
      onCategoryChange={handleCategoryChange}
    />
  );
};
```

--------------------------------------------

FR

# Documentation du composant `FilterDropdown`

## Description

`FilterDropdown` est un composant React qui affiche un menu déroulant permettant de filtrer une liste selon trois catégories : **langages**, **types de jeux**, et **catégories**. Il supporte la sélection multiple dans chaque filtre, affiche le nombre total de filtres sélectionnés, et permet de réinitialiser facilement tous les filtres.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| `languageOptions` | `string[]` | Liste des options disponibles pour le filtre des langages. |
| `typeOptions` | `string[]` | Liste des options disponibles pour le filtre des types de jeux. |
| `categoryOptions` | `string[]` | Liste des options disponibles pour le filtre des catégories. |
| `selectedLanguages` | `string[]` | Liste des langages actuellement sélectionnés. |
| `onLanguageChange` | `(language: string | string[]) => void` |
| `selectedTypes` | `string[]` | Liste des types de jeux actuellement sélectionnés. |
| `onTypeChange` | `(type: string | string[]) => void` |
| `selectedCategories` | `string[]` | Liste des catégories actuellement sélectionnées. |
| `onCategoryChange` | `(category: string | string[]) => void` |

---

## Fonctionnalités principales

- **Ouverture / fermeture du menu déroulant** :
    
    Le menu s’ouvre au clic sur le bouton principal et se ferme automatiquement lorsqu’on clique en dehors du composant (via un gestionnaire d’événements sur `mousedown`).
    
- **Affichage du nombre total de filtres sélectionnés** :
    
    Un badge affiche la somme des éléments sélectionnés parmi les trois catégories.
    
- **Sélection multiple** :
    
    Chaque catégorie présente ses options sous forme de boutons. Le style du bouton change pour indiquer la sélection (couleur de fond et texte).
    
- **Animations** :
    
    Utilisation de `framer-motion` pour animer l’apparition/disparition du menu avec fondu et translation verticale.
    
- **Réinitialisation des filtres** :
    
    Lorsque au moins un filtre est sélectionné, un bouton "Réinitialiser les filtres" apparaît en bas du menu, permettant de vider toutes les sélections.
    
- **Internationalisation** :
    
    Les titres et textes sont traduits selon la langue active, récupérée via le hook `useLang()` et les traductions stockées dans `TranslationsDictionary`.
    

---

## Détails d’implémentation

- Utilisation de `useState` pour gérer l’état d’ouverture du dropdown (`isOpen`).
- Utilisation de `useRef` et `useEffect` pour détecter et gérer les clics en dehors du composant afin de fermer le menu.
- Le bouton principal affiche une icône filtre (`FilterIcon`), un texte traduit ("Filtres") et un compteur du nombre de filtres sélectionnés.
- Les options sont rendues en boutons qui appellent la fonction `onLanguageChange`, `onTypeChange` ou `onCategoryChange` lors du clic.
- Chaque catégorie a une couleur distincte pour la sélection :
    - Langages : violet (#5328EA)
    - Types de jeux : orange (#FF774D)
    - Catégories : vert (#00C896)

---

## Exemple d’utilisation

```jsx
import React, { useState } from 'react';
import FilterDropdown from './FilterDropdown';

const App = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const languageOptions = ['Python', 'JavaScript', 'Java'];
  const typeOptions = ['Puzzle', 'Action', 'RPG'];
  const categoryOptions = ['Débutant', 'Intermédiaire', 'Avancé'];

  // Exemple simple de gestion des sélections : toggle d’une option dans le tableau
  const handleLanguageChange = (lang) => {
    setSelectedLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  return (
    <FilterDropdown
      languageOptions={languageOptions}
      typeOptions={typeOptions}
      categoryOptions={categoryOptions}
      selectedLanguages={selectedLanguages}
      onLanguageChange={handleLanguageChange}
      selectedTypes={selectedTypes}
      onTypeChange={handleTypeChange}
      selectedCategories={selectedCategories}
      onCategoryChange={handleCategoryChange}
    />
  );
};

```