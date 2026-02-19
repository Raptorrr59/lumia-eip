EN

# **Footer Component**

React component displaying the site footer with logo, navigation links, social media, and contact information. The content adapts to the selected language thanks to the language context (useLang).

---

## **Description**

- Displays a custom SVG logo with a slogan.
- Provides several sections with internal links (react-router-dom Link) to different site pages.
- Includes buttons to open Instagram and LinkedIn pages in a new tab.
- Displays a clickable contact email address.
- Shows the current year and a copyright notice.
- Text is dynamically translated based on the selected language via useLang.
- Uses TailwindCSS for styling and light/dark theme management.

---

## **Props**

The **Footer** component does not receive any props. It uses the useLang hook to get the active language.

---

## **Features**

### **Language**

- Uses the useLang() hook to retrieve the current language.
- Displays translations from TranslationsDictionary according to this language.

### **Internal Navigation**

- Links to:
    - About (/about)
    - Contact (/contact)
    - FAQ (/faq)
    - Privacy Policy (/confidentialite)
    - Legal Notice (/mentions-legales)
    - Terms of Use (/cgu)
    - Terms and Conditions (/cgv)
    - Trainings (/games)
    - Courses (/courses)
- Each link triggers handleLinkClick to scroll to the top of the page.

### **Social Media**

- Instagram and LinkedIn buttons open external links in a new tab.
- Accessibility via aria-label.

### **Contact**

- Displays a clickable contact email with a mailto: link.

### **Style and Structure**

- Responsive layout using Flexbox (via Tailwind).
- Purple gradient colors.
- Hover effects on links and buttons.

---

## **Usage Example**

```
import Footer from './Footer';

function App() {
  return (
    <>
      {/* other contents */}
      <Footer />
    </>
  );
}
```

---

## **Source Code**

```
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import TranslationsDictionary from '../Translations';
import { Link } from "react-router-dom";
import { useLang } from '../LangProvider';

const Footer = () => {
  const selectedLang = useLang();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white py-12 px-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Logo */}
        {/* ... SVG logo and slogan ... */}

        {/* Company */}
        {/* ... Links to company pages ... */}

        {/* Developers */}
        {/* ... Links to trainings and courses ... */}

        {/* Social Media */}
        {/* ... Instagram and LinkedIn buttons ... */}

      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
        {TranslationsDictionary[selectedLang]?.["all_rights"]} | Lumia © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
```

---

## **Notes**

- Make sure the LangProvider context is properly configured so that useLang works correctly.
- Translations must be available in the TranslationsDictionary.
- The component uses react-router-dom for internal navigation.

-------------------------------------------

FR

# Footer Component

Composant React affichant le pied de page du site avec logo, liens de navigation, réseaux sociaux et informations de contact. Le contenu s’adapte à la langue sélectionnée grâce au contexte linguistique (`useLang`).

---

## Description

- Affiche un logo SVG personnalisé avec un slogan.
- Propose plusieurs sections avec des liens internes (`react-router-dom` `Link`) vers différentes pages du site.
- Inclut des boutons pour ouvrir les pages Instagram et LinkedIn dans un nouvel onglet.
- Affiche une adresse email cliquable pour contact.
- Affiche l’année courante et une mention de copyright.
- Le texte est traduit dynamiquement selon la langue sélectionnée via `useLang`.
- Utilise TailwindCSS pour le style et la gestion des thèmes clair/sombre.

---

## Props

Le composant **Footer** ne prend pas de props. Il utilise le hook `useLang` pour récupérer la langue active.

---

## Fonctionnalités

### Langue

- Utilise le hook `useLang()` pour récupérer la langue courante.
- Affiche les traductions depuis `TranslationsDictionary` en fonction de cette langue.

### Navigation interne

- Liens vers :
    - À propos (`/about`)
    - Contact (`/contact`)
    - FAQ (`/faq`)
    - Confidentialité (`/confidentialite`)
    - Mentions légales (`/mentions-legales`)
    - CGU (`/cgu`)
    - CGV (`/cgv`)
    - Formations (`/games`)
    - Cours (`/courses`)
- Chaque lien appelle `handleLinkClick` pour remonter en haut de la page.

### Réseaux sociaux

- Boutons Instagram et LinkedIn ouvrant les liens externes dans un nouvel onglet.
- Accessibilité via `aria-label`.

### Contact

- Affiche un email de contact cliquable avec un lien `mailto:`.

### Style et structure

- Mise en page responsive grâce à Flexbox (via Tailwind).
- Couleurs en dégradé violet.
- Effets de survol (hover) sur les liens et boutons.

---

## Exemple d'utilisation

```jsx
import Footer from './Footer';

function App() {
  return (
    <>
      {/* autres contenus */}
      <Footer />
    </>
  );
}

```

---

## Code source

```jsx
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import TranslationsDictionary from '../Translations';
import { Link } from "react-router-dom";
import { useLang } from '../LangProvider';

const Footer = () => {
  const selectedLang = useLang();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white py-12 px-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Logo */}
        {/* ... SVG logo and slogan ... */}

        {/* Société */}
        {/* ... Links to company pages ... */}

        {/* Développeurs */}
        {/* ... Links to trainings and courses ... */}

        {/* Social Media */}
        {/* ... Instagram and LinkedIn buttons ... */}

      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
        {TranslationsDictionary[selectedLang]?.["all_rights"]} | Lumia © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;

```

---

## Remarques

- Assure-toi que le contexte `LangProvider` est correctement configuré pour que `useLang` fonctionne.
- Les traductions doivent être présentes dans `TranslationsDictionary`.
- Le composant utilise `react-router-dom` pour la navigation interne.