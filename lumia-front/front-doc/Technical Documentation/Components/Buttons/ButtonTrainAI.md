EN

# **📄ButtonTrainAI**

## **🧩 Description**

ButtonTrainAI is a styled React button that triggers a specific action—typically opening a **file upload modal** or initiating **AI training**. The button label is internationalized via the translation dictionary.

---

## **✅Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| onClick | function | ✅ | Function executed when the button is clicked. Often used to open a modal (FileUploadModal) or start an AI training-related action. |

---

## **🌍Internationalization**

- Uses the useLang() hook to get the selected language from the LangProvider context.
- The displayed text is retrieved via:

```
TranslationsDictionary[selectedLang]?.["train_ai"]
```

This enables multilingual support for the button label (e.g., “Train the AI”, “Entraîner l’IA”, etc.).

---

## **🎨Visual Behavior**

- **Size**: 300px by 40px
- **Color**:
    - Default background: bright orange #FF774D
    - On hover: black (hover:bg-black)
- **Text**:
    - White, bold (font-[600])
    - Custom font: font-Gotham
- **Layout**:
    - Centered alignment using flex, items-center, justify-center
- **Animation**: smooth transition (duration-300)
- **Padding**: horizontal padding px-4
- **Rounded corners**: 12px radius

---

## **💡Example Usage**

```
import FileUploadModal from '../modal/FileUploadModal';

const ExampleComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ButtonTrainAI onClick={() => setModalOpen(true)} />
      {isModalOpen && <FileUploadModal onClose={() => setModalOpen(false)} />}
    </>
  );
};
```

---

## **🛠Dependencies**

- React
- useLang from LangProvider
- TranslationsDictionary for multilingual support
- **(Optional)** FileUploadModal if used with a training modal

---

## **📦Export**

```
export default ButtonTrainAI;
```

---

## **✨Suggested Improvements**

- Support a **loading state** (isLoading) with a visual indicator (spinner)
- Add an **icon** to the left of the text to illustrate the theme (e.g., ⚙️ or 🤖)
- Add a disabled prop to disable the button under certain conditions

---------------------------------------

FR

# 📄 **ButtonTrainAI**

## Description

`ButtonTrainAI` est un bouton React stylisé qui déclenche une action spécifique — généralement l'ouverture d'un **modale de chargement de fichier** ou le **déclenchement d’un entraînement d’IA**. Le texte du bouton est internationalisé via le dictionnaire de traduction.

---

## ✅ **Props**

| Nom | Type | Requis | Description |
| --- | --- | --- | --- |
| `onClick` | `function` | Oui | Fonction exécutée au clic sur le bouton. Souvent utilisée pour ouvrir une modale (`FileUploadModal`) ou démarrer une action liée à l'entraînement de l'IA. |

---

## 🌍 **Internationalisation**

- Utilise le hook `useLang()` pour récupérer la langue sélectionnée depuis le contexte `LangProvider`.
- Le texte affiché est récupéré via :

```
TranslationsDictionary[selectedLang]?.["train_ai"]

```

Cela permet une prise en charge multilingue du libellé du bouton (ex: "Entraîner l'IA", "Train the AI", etc.).

---

## 🎨 **Comportement visuel**

- **Taille** : `300px x 40px`
- **Couleur** :
    - Fond par défaut : orange vif `#FF774D`
    - Au survol : noir (`hover:bg-black`)
- **Texte** :
    - Blanc, gras (`font-[600]`)
    - Police personnalisée : `font-Gotham`
- **Disposition** :
    - Alignement centré avec `flex`, `items-center`, `justify-center`
- **Animation** : transition douce (`duration-300`)
- **Paddings** : horizontal `px-4`
- **Coins arrondis** : `12px`

---

## 🔁 Exemple d’utilisation

```jsx
import FileUploadModal from '../modal/FileUploadModal';

const ExampleComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ButtonTrainAI onClick={() => setModalOpen(true)} />
      {isModalOpen && <FileUploadModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

```

---

## 🛠 Dépendances

- `React`
- `useLang` depuis `LangProvider`
- `TranslationsDictionary` pour la gestion multilingue
- **(Optionnel)** `FileUploadModal` si utilisé avec une modale d’entraînement

---

## 📦 Export

```
export default ButtonTrainAI;

```

---

## ✨ Suggestions d’amélioration

- Permettre un **état de chargement** (`isLoading`) avec un indicateur visuel (spinner).
- Ajouter un **icône** à gauche du texte pour illustrer le thème (ex: ⚙️ ou 🤖).
- Ajouter une prop `disabled` pour bloquer le bouton selon certains états.