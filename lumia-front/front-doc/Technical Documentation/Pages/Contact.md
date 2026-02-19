EN

# **Contact Page Documentation**

## **Description**

A simple and elegant contact page that allows users to access an external form (Google Forms) to get in touch with the Lumia team.

The page is translated based on the selected language and includes animations using **Framer Motion**.

---

## **Main Features**

- Displays a title and multiple explanatory paragraphs, adapted to the selected language.
- A clear, stylized action button opens a Google Form in a new tab.
- Smooth entrance animation across the entire content using Framer Motion.
- Supports both light and dark modes, with adapted background and text colors.

---

## **Internal State**

- No local state (pure functional component) — everything is handled via props and language context.

---

## **Data & Sources**

- **useLang()**: Custom hook that provides the selected language.
- **TranslationsDictionary**: Dictionary containing translations for all displayed text strings.

---

## **Components Used**

- **motion.div (Framer Motion)**
    
    Used to animate the appearance of the main content with a vertical slide and fade-in effect.
    

---

## **JSX Structure**

- **Main container**
    
    A div using flex column layout, vertically and horizontally centered, with padding and light/dark theme handling.
    
- **Main title**
    
    An h1 with Gotham font, responsive size, violet or white color depending on the mode, centered.
    
- **Content block**
    
    A div with light/dark background, shadow, rounded corners, generous padding. Contains:
    
    - Multiple translated text paragraphs.
    - A violet-styled button with hover effects, opening a Google Form in a new tab.

---

## **Used Translations (examples)**

| **Key** | **Example French Translation** |
| --- | --- |
| contact_us | “Nous contacter” |
| contact_at | “Vous pouvez nous contacter via” |
| contact_intro | “ pour toute question ou suggestion.” |
| contact_explain | “N’hésitez pas à remplir le formulaire suivant.” |
| contact_link | “Cliquez sur le bouton ci-dessous pour accéder au formulaire.” |
| contact_fill | “Remplir le formulaire” |

---

## **Accessibility & UX**

- The link to the form uses rel="noopener noreferrer" and target="_blank" for security and to ensure it opens in a new tab.
- High-contrast colors ensure readability in both light and dark modes.
- Large, easily clickable button designed to work well on mobile.

--------------------------------

FR

# Documentation de la page **Contact**

## Description

Page de contact simple et élégante permettant à l’utilisateur d’accéder à un formulaire externe (Google Forms) pour prendre contact avec l’équipe Lumia.

La page est traduite en fonction de la langue sélectionnée et intègre des animations avec **Framer Motion**.

---

## Fonctionnalités principales

- Affichage d’un titre et de plusieurs paragraphes explicatifs adaptés à la langue choisie.
- Bouton d’action clair, stylisé, qui ouvre un formulaire Google Forms dans un nouvel onglet.
- Animation d’apparition douce sur l’ensemble du contenu grâce à Framer Motion.
- Support du mode clair et sombre avec adaptation des couleurs de fond et texte.

---

## États internes

- Aucun état local (fonctionnelle pure) — tout est géré par props et contexte de langue.

---

## Données & sources

- **useLang()** : hook custom qui fournit la langue sélectionnée.
- **TranslationsDictionary** : dictionnaire contenant les traductions des chaînes de texte affichées.

---

## Composants utilisés

- **motion.div (Framer Motion)**
    
    Pour animer l’apparition du contenu principal avec un effet de translation verticale et fondu.
    

---

## Structure JSX

- **Conteneur principal**
    
    `div` en flex column centré verticalement et horizontalement, avec padding et gestion des modes clair/sombre.
    
- **Titre principal**
    
    `h1` avec police Gotham, taille responsive, couleur violette ou blanche selon mode, centré.
    
- **Bloc de contenu**
    
    `div` avec fond clair/sombre, ombre, arrondis, padding généreux. Contient :
    
    - Plusieurs paragraphes textuels avec des fragments traduits.
    - Un bouton stylisé violet, avec effet hover, ouvrant un lien Google Forms dans un nouvel onglet.

---

## Traductions utilisées (exemples)

| Clé | Exemple de traduction française |
| --- | --- |
| `contact_us` | "Nous contacter" |
| `contact_at` | "Vous pouvez nous contacter via" |
| `contact_intro` | " pour toute question ou suggestion." |
| `contact_explain` | "N’hésitez pas à remplir le formulaire suivant." |
| `contact_link` | "Cliquez sur le bouton ci-dessous pour accéder au formulaire." |
| `contact_fill` | "Remplir le formulaire" |

---

## Accessibilité & UX

- Le lien vers le formulaire utilise `rel="noopener noreferrer"` et `target="_blank"` pour sécurité et ouverture dans un nouvel onglet.
- Couleurs contrastées pour garantir une bonne lisibilité en mode clair et sombre.
- Bouton large et facilement cliquable, adapté aux mobiles.