EN

# **StyledCourseContent Component**

React component to display HTML content passed via props with bottom padding styling.

---

## **Description**

- Renders a <div> block containing HTML content injected via the dangerouslySetInnerHTML property.
- Applies bottom padding (pb-14) to visually space the content downward.
- Allows rendering of rich (formatted HTML) content directly on the page.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Default Value** |
| --- | --- | --- | --- | --- |
| html | string | HTML content to inject and display | Yes | — |

---

## **Usage**

```
import StyledCourseContent from './components/StyledCourseContent';

const courseHtml = `
  <h1>Introduction to React</h1>
  <p>React is a JavaScript library for building user interfaces.</p>
`;

function CoursePage() {
  return <StyledCourseContent html={courseHtml} />;
}
```

---

## **Behavior**

- The HTML content is directly inserted into the DOM using dangerouslySetInnerHTML.
- Bottom padding (pb-14) is applied on the container to leave a visual space below the content.
- Does not perform any transformation or validation on the HTML content; it must be sanitized upstream.

---

## **Warning**

- Using dangerouslySetInnerHTML may expose to XSS risks if the HTML content is not clean or secure.
- Ensure the HTML content is sanitized or comes from a trusted source before injection.

-------------------------------------------------

FR

# StyledCourseContent Component

Composant React pour afficher du contenu HTML passé en props avec un style de padding en bas.

---

## Description

- Rend un bloc `<div>` contenant du contenu HTML injecté via la propriété `dangerouslySetInnerHTML`.
- Applique un padding bottom (`pb-14`) pour espacer le contenu vers le bas.
- Permet d’afficher du contenu riche (HTML formaté) directement dans la page.

---

## Props

| Nom | Type | Description | Obligatoire | Valeur par défaut |
| --- | --- | --- | --- | --- |
| `html` | `string` | Contenu HTML à injecter et afficher | Oui | — |

---

## Utilisation

```jsx
import StyledCourseContent from './components/StyledCourseContent';

const courseHtml = `
  <h1>Introduction au React</h1>
  <p>React est une bibliothèque JavaScript pour construire des interfaces utilisateur.</p>
`;

function CoursePage() {
  return <StyledCourseContent html={courseHtml} />;
}

```

---

## Fonctionnement

- Le contenu HTML est inséré directement dans le DOM via `dangerouslySetInnerHTML`.
- Le padding en bas (`pb-14`) est appliqué au conteneur pour laisser un espace visuel en bas du contenu.
- Ne fait aucune transformation ou validation du contenu HTML, il doit être sécurisé en amont.

---

## Attention

- L’utilisation de `dangerouslySetInnerHTML` peut exposer à des risques XSS si le contenu HTML n’est pas propre ou sécurisé.
- Assure-toi que le contenu HTML est nettoyé ou provient d’une source fiable avant de l’injecter.