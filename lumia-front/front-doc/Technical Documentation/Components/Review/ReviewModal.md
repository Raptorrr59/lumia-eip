EN

# **ReviewModal**

# **Documentation — Component**

## **Description**

ReviewModal is a React modal component that allows a logged-in and verified user to submit a review on a specific module and course.

It manages rating input (stars), review text input, validation, submission via an HTTP POST request, and loading, success, and error states.

The component is multilingual, using a translation system (useLang + TranslationsDictionary).

---

## **Main Features**

- Displays a centered modal window with a semi-transparent blurred background.
- Interactive star rating input (1 to 5 stars) with visual feedback.
- Text input area for the review content.
- Manages internal states:
    - rating: selected rating value.
    - review: review text.
    - error: error message to display.
    - success: success message to display.
    - isLoading: loading state during submission.
- Submits the review via a POST request to /api/new-comments with authentication token in headers.
- Conditional rendering of buttons and messages depending on:
    - User login status (presence of user ID in localStorage).
    - User email verification status.
- Visual feedback during submission (spinner, input disabling).
- Automatically closes the modal after successful submission.
- Multilingual support (displays texts according to the selected language).

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Default** |
| --- | --- | --- | --- | --- |
| onClose | function | Callback to close the modal | Yes | N/A |
| moduleId | string or number | ID of the module the review is related to | Yes | N/A |
| courseId | string or number | ID of the course the review is related to | Yes | N/A |
| onReviewSubmitted | function | Callback triggered after successful submission, receives the response data | Yes | N/A |

---

## **Usage Example**

```
<ReviewModal
  onClose={() => setIsReviewModalOpen(false)}
  moduleId="123"
  courseId="456"
  onReviewSubmitted={(data) => console.log("Review submitted:", data)}
/>
```

---

## **Detailed Behavior**

### **Star Rating**

- Stars are yellow (text-yellow-400) when selected, light gray when not.
- Clicking a star updates the rating state.
- Star buttons are disabled if the user is not logged in or if submission is in progress.

### **Validation & Submission**

- Submit button is enabled only if:
    - User is logged in (localStorage.getItem("id") !== null).
    - User email is verified (emailVerified === "true").
    - A rating has been selected (rating !== 0).
- During submission:
    - Displays a loading spinner.
    - Disables the form inputs.
- On success:
    - Shows a success message (translated).
    - Calls onReviewSubmitted callback with the response data.
    - Automatically closes the modal after 1.5 seconds.
- On error:
    - Displays an error message based on error type (e.g., 401 unauthorized).
    - Does not close the modal.

### **Accessibility**

- Star buttons include explicit aria-labels.
- Textarea has a clear label.

---

## **Styles & CSS Classes**

- Modal background with blur (backdrop-blur-sm) and opacity.
- Container uses white/dark background depending on theme (dark:).
- Primary button in purple (#5328EA) with hover and disabled styles.
- Animated loading indicator.
- Error messages shown in red, success messages in green.

---

## **Dependencies**

- React (with useState hook)
- Axios for HTTP requests
- useLang (custom hook for language management)
- TranslationsDictionary (object for translated texts)
- Icon LumiaIcon (imported but unused; possibly leftover)

---

If you want, I can help you generate or translate the component code as well!

--------------------------------------

FR

# Documentation — Composant `ReviewModal`

## Description

`ReviewModal` est un composant modal React permettant à un utilisateur connecté et vérifié de laisser un avis sur un module et un cours spécifiques.

Il gère la saisie de la note (étoiles) et du texte de l’avis, la validation, l’envoi via une requête HTTP POST, ainsi que les états de chargement, succès et erreur.

Le composant est également multilingue via un système de traduction (`useLang` + `TranslationsDictionary`).

---

## Fonctionnalités principales

- Affichage d’une fenêtre modale centrée avec un fond semi-transparent flouté.
- Saisie interactive de la note (1 à 5 étoiles) avec un retour visuel.
- Saisie de texte pour l’avis.
- Gestion d’états :
    - `rating` : note choisie
    - `review` : texte de l’avis
    - `error` : message d’erreur
    - `success` : message de succès
    - `isLoading` : état de chargement lors de la soumission
- Envoi de l’avis via une requête POST à `/api/new-comments` avec authentification (token dans header).
- Affichage conditionnel des boutons et messages selon :
    - Utilisateur connecté (présence d’id dans localStorage).
    - Utilisateur vérifié (email vérifié).
- Feedback visuel pendant la soumission (spinner, désactivation des inputs).
- Fermeture automatique du modal après soumission réussie.
- Support multilingue (affichage des textes selon la langue sélectionnée).

---

## Props

| Nom | Type | Description | Obligatoire | Valeur par défaut |
| --- | --- | --- | --- | --- |
| `onClose` | `function` | Fonction appelée pour fermer la modal | Oui | N/A |
| `moduleId` | `string` ou `number` | Identifiant du module auquel est rattaché l’avis | Oui | N/A |
| `courseId` | `string` ou `number` | Identifiant du cours auquel est rattaché l’avis | Oui | N/A |
| `onReviewSubmitted` | `function` | Callback appelé après la soumission réussie, reçoit les données de la réponse | Oui | N/A |

---

## Utilisation

```jsx
<ReviewModal
  onClose={() => setIsReviewModalOpen(false)}
  moduleId="123"
  courseId="456"
  onReviewSubmitted={(data) => console.log("Avis soumis :", data)}
/>

```

---

## Comportement détaillé

### Gestion des étoiles

- Les étoiles sont affichées en jaune (`text-yellow-400`) si sélectionnées, sinon gris clair.
- Cliquer sur une étoile met à jour la note (`rating`).
- Les boutons étoiles sont désactivés si l’utilisateur n’est pas connecté ou si la soumission est en cours.

### Validation et soumission

- Bouton de soumission activé uniquement si :
    - L’utilisateur est connecté (`localStorage.getItem("id") !== null`).
    - L’utilisateur est vérifié (`emailVerified === "true"`).
    - Une note est sélectionnée (`rating !== 0`).
- Pendant la soumission :
    - Affiche un spinner de chargement.
    - Désactive le formulaire.
- En cas de succès :
    - Message de succès affiché (texte traduit).
    - Callback `onReviewSubmitted` déclenché avec les données reçues.
    - Fermeture automatique après 1.5 secondes.
- En cas d’erreur :
    - Affiche un message d’erreur approprié selon le type (401 ou autre).
    - Ne ferme pas la modal.

### Accessibilité

- Les boutons étoiles ont un label aria explicite (`aria-label`).
- La textarea a un label clair.

---

## Styles et classes CSS

- Fond modal avec flou (`backdrop-blur-sm`) et opacité.
- Conteneur blanc/ sombre selon thème (`dark:`).
- Bouton principal violet (#5328EA) avec hover et styles désactivés.
- Indicateur de chargement animé.
- Messages d’erreur en rouge, succès en vert.

---

## Dépendances

- React (hooks `useState`)
- Axios (pour requêtes HTTP)
- `useLang` (custom hook pour gestion de la langue)
- `TranslationsDictionary` (objet pour textes traduits)
- Icône `LumiaIcon` (importée mais non utilisée dans ce code, possible reliquat)