EN

# **📄BadgePreview**

## **🧩 Description**

BadgePreview is a simple and stylish React component that displays a circular badge along with its name. It is typically used to represent an award, recognition, or a visual skill icon.

---

## **✅Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| picture | string | ✅ | URL of the image representing the badge |
| name | string | ✅ | Name of the badge, displayed below the image |

---

## **🎨Visual Behavior**

- The component aligns its content **vertically and centered** (flex-col, items-center, justify-center)

### **🖼 Badge Image**

- Fixed size: 48px x 48px (w-12 h-12)
- Circular shape: rounded-full
- Custom purple border: border-[3.5px] border-[#5328EA]

### **🏷 Badge Name**

- Color: **orange** #FF774D
- Style: **bold**, size 10px, with top padding pt-1
- Font: Custom font class font-Gotham (expected to be globally available)

---

## **💡Example Usage**

```
<BadgePreview
  picture="https://example.com/badge.png"
  name="Explorer"
/>
```

---

## **🛠Dependencies**

- React
- PropTypes for prop validation

---

## **📦Export**

```
export default BadgePreview;
```

---

## **🧩Notes**

- This component is lightweight and easily reusable in profile views, leaderboards, or badge galleries.
- It fits well inside a grid or a FlexBox layout containing multiple badges.

---------------------------------------

FR

# 📄 **BadgePreview**

## Description

`BadgePreview` est un composant React simple et stylisé, qui affiche un badge circulaire accompagné de son nom. Il est souvent utilisé pour représenter une distinction, une récompense ou une compétence visuelle sous forme d’icône.

---

## ✅ **Props**

| Nom | Type | Requis | Description |
| --- | --- | --- | --- |
| `picture` | `string` | Oui | URL de l’image représentant le badge. |
| `name` | `string` | Oui | Le nom du badge affiché sous l’image. |

---

## 🎨 **Comportement visuel**

- Le composant aligne son contenu verticalement et au centre (`flex-col`, `items-center`, `justify-center`).
- **Image du badge** :
    - Taille fixe : `48px x 48px` (`w-12 h-12`)
    - Forme ronde : `rounded-full`
    - Bordure personnalisée violette : `border-[3.5px] border-[#5328EA]`
- **Nom du badge** :
    - Couleur : orange `#FF774D`
    - Style : `bold`, taille `10px`, espacement supérieur `pt-1`
    - Police : `font-Gotham` (police personnalisée attendue)

---

## 🖼 Exemple d’utilisation

```jsx
<BadgePreview
  picture="https://example.com/badge.png"
  name="Explorateur"
/>

```

---

## 🛠 Dépendances

- `React`
- `PropTypes` pour la validation des propriétés

---

## 📦 Export

Le composant est exporté par défaut :

```
export default BadgePreview;

```

---

## 🧩 Remarques

- Le composant est léger et facilement réutilisable dans des vues de profil, tableaux de classement ou galeries de récompenses.
- Il s’adapte bien dans une grille ou un `FlexBox` contenant plusieurs badges.
