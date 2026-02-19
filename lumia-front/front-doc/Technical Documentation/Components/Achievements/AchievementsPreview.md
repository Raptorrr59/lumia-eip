EN

# **📄AchievementPreview**

## **🧩 Description**

AchievementPreview is a functional React component that displays a stylized preview of an achievement. It includes:

- a background image
- a name
- a description
- a date
- a trophy icon that varies depending on whether the achievement has a valid date

---

## **✅Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| picture | string | ✅ | URL of the background image illustrating the achievement |
| name | string | ✅ | Name of the achievement |
| description | string | ✅ | Short description of the achievement |
| date | string | ✅ | Date of completion. "00/00/00" means it’s locked or not yet obtained |

---

## **🎨Visual Behavior**

### **🖼 Background Image**

- Displayed with 40% opacity
- Positioned behind content inside a black, relatively positioned container

### **🏆 Trophy Icon**

- If date !== "00/00/00":
    - Shows **red trophy** icon
    - Name is shown in **orange** #FF774D centered over the image
    - Icon URL: https://i.imgur.com/4b1oRs0.png
- Else:
    - Shows **white trophy** icon
    - Icon URL: https://i.imgur.com/lgRJHRZ.png

### **📚 Text Content**

- **Name**:
    - Displayed above the description
    - Color changes depending on the date
        - **Orange** if unlocked
        - **Purple** if locked
- **Description**:
    - Small text (10px), color depends on theme (black/white)
    - Fully supports dark mode
- **Separator**:
    - Semi-transparent purple line
- **Date**:
    - Shown at the bottom with reduced opacity

---

## **🎨Styles & Classes**

- Styled using **Tailwind CSS**
- Uses custom classes like font-Gotham for typography
- Custom colors:
    - **Purple**: #5328EA
    - **Orange**: #FF774D

---

## **💡Example Usage**

```
<AchievementPreview
  picture="https://example.com/image.jpg"
  name="Regional Champion"
  description="Won during the Spring Tournament"
  date="23/06/25"
/>
```

---

## **🛠Dependencies**

- React
- PropTypes for props validation

---

## **📦Export**

```
export default AchievementPreview;
```

---

-----------------------------------------------------

FR

# 📄 **AchievementPreview**

## Description

`AchievementPreview` est un composant React fonctionnel qui affiche un aperçu stylisé d'un accomplissement. Il inclut une image d'arrière-plan, un nom, une description, une date, et une icône de trophée qui varie selon si l'accomplissement a une date valide ou non.

---

## ✅ **Props**

| Nom | Type | Requis | Description |
| --- | --- | --- | --- |
| `picture` | `string` | Oui | URL de l’image de fond illustrant l’accomplissement. |
| `name` | `string` | Oui | Le nom de l’accomplissement. |
| `description` | `string` | Oui | Une brève description de l’accomplissement. |
| `date` | `string` | Oui | La date à laquelle l’accomplissement a été réalisé. `"00/00/00"` signifie que l’accomplissement est verrouillé ou non encore obtenu. |

---

## 🎨 **Comportement visuel**

### 🖼 Image d’arrière-plan

- Affichée avec une opacité de 40%.
- Placée en arrière-plan d’un conteneur noir avec positionnement relatif.

### 🏆 Icône de trophée

- Si `date` est différente de `"00/00/00"` :
    - Affiche une icône de **trophée rouge** (image : `https://i.imgur.com/4b1oRs0.png`).
    - Affiche le **nom** en texte orange `#FF774D` au centre de l’image.
- Sinon :
    - Affiche une icône de **trophée blanc** (image : `https://i.imgur.com/lgRJHRZ.png`).

### 📚 Contenu textuel

- **Nom** : affiché au-dessus de la description dans une couleur dépendante de la date (orange si accomplissement obtenu, violet sinon).
- **Description** : texte en petit (10px), en noir ou blanc selon le thème (support `dark mode`).
- **Séparateur** : une ligne violette semi-transparente.
- **Date** : en bas, affichée avec opacité réduite.

---

## 💅 **Classes et styles**

- Utilisation de `tailwindcss` pour la mise en page et le style.
- Classes personnalisées comme `font-Gotham` utilisées pour la typographie.
- Couleurs personnalisées :
    - Violet : `#5328EA`
    - Orange : `#FF774D`

---

## 🔍 Exemple d’utilisation

```jsx
<AchievementPreview
  picture="https://example.com/image.jpg"
  name="Champion régional"
  description="Gagné lors du tournoi de printemps"
  date="23/06/25"
/>

```

---

## 🛠 Dépendances

- `React`
- `PropTypes` pour la validation des props.

---

## 📦 Export

Ce composant est exporté par défaut :

```
export default AchievementPreview;

```