EN

# **Documentation for Legal React Components**

## **LegalPage Component**

### **Description**

A generic component that displays a legal page (Terms of Use, Terms of Sale, Legal Notice, Privacy Policy) with a title, rich content, and a fade-in animation using **Framer Motion**.

### **Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| title | string | Main title of the legal page |
| content | ReactNode | Detailed content (JSX or HTML) to display |

### **Usage Example**

```
<LegalPage
  title="Terms of Use"
  content={<p>Detailed content here...</p>}
/>
```

---

## **CGU Component (Terms of Use)**

### **Description**

Multilingual Terms of Use page.

Uses useLang() hook for current language and fetches translated texts from TranslationsDictionary.

### **Features**

- Displays effective date and “Official Document” label.
- Multiple sections with titles and descriptions.
- Supports light and dark mode.
- Texts dynamically translated based on selected language.

---

## **CGV Component (Terms of Sale)**

### **Description**

Static French content page presenting Terms of Sale.

Structured presentation of pricing, payment, and delivery conditions.

---

## **MentionsLegales Component (Legal Notice)**

### **Description**

Static Legal Notice page including information about:

publisher, publication director, hosting provider, business activity, intellectual property, personal data, contact.

---

## **Confidentialite Component (Privacy Policy)**

### **Description**

Multilingual Privacy Policy page with clear and detailed sections covering:

commitments, data collection, storage, third-party services, access control, employee confidentiality, legal compliance, updates.

---

## **Common Technical Details**

- All components use the LegalPage component for consistent layout and styling.
- Styling is done with **Tailwind CSS** for responsive design and light/dark mode support.
- Entry animations implemented with **Framer Motion** (fade and vertical slide).
- Translations managed with TranslationsDictionary and useLang() language context.
- Clickable links are embedded in the texts (e.g., privacy policy links).

-------------------------------------------------

FR

# Documentation des composants légaux React

## Composant `LegalPage`

### Description

Composant générique qui affiche une page légale (CGU, CGV, Mentions Légales, Confidentialité) avec un titre, un contenu riche et une animation d'apparition via Framer Motion.

### Props

| Nom | Type | Description |
| --- | --- | --- |
| `title` | `string` | Titre principal de la page légale |
| `content` | `ReactNode` | Contenu détaillé à afficher |

### Exemple d'utilisation

```jsx
<LegalPage
  title="Conditions Générales d'Utilisation"
  content={<p>Contenu détaillé ici...</p>}
/>

```

---

## Composant `CGU`

### Description

Page des Conditions Générales d'Utilisation, qui utilise la langue sélectionnée via le hook `useLang()` et récupère les textes depuis `TranslationsDictionary`.

### Fonctionnalités

- Affiche la date d'entrée en vigueur et un label "Document officiel".
- Sections variées avec titres et descriptions.
- Supporte le mode sombre et clair.
- Texte et titres traduits dynamiquement selon la langue sélectionnée.

---

## Composant `CGV`

### Description

Page des Conditions Générales de Vente.

Contenu statique en français avec une présentation structurée des tarifs, paiement, livraison.

---

## Composant `MentionsLegales`

### Description

Page des Mentions légales avec informations statiques sur l’éditeur, directeur de publication, hébergement, activité, propriété intellectuelle, données personnelles et contact.

---

## Composant `Confidentialite`

### Description

Page de la Politique de confidentialité, multilingue via `TranslationsDictionary` et `useLang()`.

Affiche des sections claires avec engagement, collecte, stockage, services tiers, contrôle d'accès, confidentialité employés, conformité légale et modifications.

---

## Détails techniques

- Tous les composants utilisent le composant `LegalPage` pour la structure visuelle.
- Utilisation de TailwindCSS pour le style (gestion responsive, couleurs, modes sombre/clair).
- Animation d'entrée avec Framer Motion (fondu et décalage vertical).
- Utilisation d’un dictionnaire de traductions externe (`TranslationsDictionary`) avec le contexte de langue `useLang`.
- Liens cliquables dans les textes (ex: politique de confidentialité).