EN

# **ReviewReview**

# **Documentation — Component**

## **Description**

ReviewReview is a React component that displays an individual user review with a modern glassmorphism style.

It shows the user’s name (or pseudonym), star rating, review text, profile picture, and publication date.

The component includes a hover animation for a dynamic effect.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| pseudo | string | Name or username of the user who left the review | Yes | "JeanDupont" |
| rating | number | Rating given by the user (between 0 and 5) | Yes | 4 |
| review | string | Full review text from the user | Yes | "Very good course, thanks!" |
| date | string | Publication date of the review (displayed as-is) | Yes | "12/04/2024" |
| picture | string | URL of the user’s profile picture | Yes | "https://example.com/photo.jpg" |

---

## **Features & Behavior**

- Displays a container with glassmorphism effect (semi-transparent blurred background, gradient borders).
- On hover:
    - Slight scale up (scale: 1.02).
    - Vertical shift upwards (y: -4).
    - Subtle glowing halo appears around the profile picture.
- Shows the profile picture as a circle with a subtle gradient border.
- Displays the username in bold white text.
- Shows the rating as colored violet stars (#5328EA) and gray stars for unfilled ratings.
- Review text is italicized and wrapped in quotation marks.
- Publication date shown at the bottom in small light gray text.

---

## **Usage Example**

```
<ReviewReview
  pseudo="JeanDupont"
  rating={4}
  review="Very good course, thanks!"
  date="12/04/2024"
  picture="https://example.com/photo.jpg"
/>
```

---

## **Key Styles and CSS Classes**

- bg-gradient-to-br from-[#030318]/80 to-[#1a1a2e]/60 + backdrop-blur-xl for glassmorphism effect.
- Gradient blurred border that intensifies on hover.
- Light text for strong contrast on dark backgrounds.
- Violet stars (#5328EA) with drop shadow.
- Smooth hover animations powered by framer-motion.

---

## **Dependencies**

- React (functional component)
- framer-motion for animations
- prop-types for prop validation

------------------------

FR

# Documentation — Composant `ReviewReview`

## Description

`ReviewReview` est un composant React qui affiche un avis utilisateur individuel avec une mise en forme moderne basée sur le glassmorphism.

Il présente le pseudo de l’utilisateur, sa note en étoiles, son texte d’avis, une photo de profil, ainsi que la date de publication.

Le composant intègre une animation au survol pour un effet dynamique.

---

## Props

| Nom | Type | Description | Obligatoire | Exemple |
| --- | --- | --- | --- | --- |
| `pseudo` | `string` | Nom ou pseudo de l'utilisateur qui a laissé l'avis | Oui | `"JeanDupont"` |
| `rating` | `number` | Note attribuée par l'utilisateur (entre 0 et 5) | Oui | `4` |
| `review` | `string` | Texte complet de l’avis utilisateur | Oui | `"Très bon cours, merci !"` |
| `date` | `string` | Date de publication de l'avis (format affiché directement) | Oui | `"12/04/2024"` |
| `picture` | `string` | URL de la photo de profil de l'utilisateur | Oui | `"https://example.com/photo.jpg"` |

---

## Fonctionnalités et Comportement

- Affiche un conteneur avec un effet glassmorphism (fond semi-transparent flouté, bordures avec dégradés).
- Au survol :
    - Légère augmentation de la taille (`scale: 1.02`).
    - Décalage vertical vers le haut (`y: -4`).
    - Apparition progressive d’un halo lumineux autour de la photo.
- Affiche la photo de profil ronde avec un contour dégradé subtil.
- Affiche le pseudo en texte blanc, en gras.
- Affiche la note sous forme d’étoiles colorées (violet) et d’étoiles grises pour les étoiles non remplies.
- Affiche le texte de l’avis en italique avec guillemets.
- Affiche la date de publication en bas, dans un petit texte gris clair.

---

## Exemple d’utilisation

```jsx
<ReviewReview
  pseudo="JeanDupont"
  rating={4}
  review="Très bon cours, merci !"
  date="12/04/2024"
  picture="https://example.com/photo.jpg"
/>

```

---

## Styles et classes CSS clés

- `bg-gradient-to-br from-[#030318]/80 to-[#1a1a2e]/60` + `backdrop-blur-xl` : effet glassmorphism.
- Bordure floue et dégradée au survol.
- Texte clair avec contrastes sur fond sombre.
- Étoiles colorées en violet (#5328EA) avec ombre portée.
- Animation fluide au survol via `framer-motion`.

---

## Dépendances

- React (fonctionnel)
- `framer-motion` pour animations
- `prop-types` pour la validation des props