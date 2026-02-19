EN

# **Profile Component Documentation**

## **Description**

The Profile component is a React page displaying the connected user’s profile information. It manages showing user details, an XP progress indicator, actions such as editing the profile, managing subscription, sending a verification email, logging out, as well as statistics and badges. It retrieves user data from localStorage and redirects to the homepage if no user is logged in.

---

## **Dependencies**

- **React** (useState, useEffect)
- **axios** (for HTTP requests)
- **framer-motion** (for animations)
- **react-router-dom** (Link)
- **useLang** (custom hook for language)
- **TranslationsDictionary** (translations dictionary)
- Internal components:
    - BadgePreview (displays badges)
    - ProfileModify (modal for profile editing)

---

## **Internal State**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| isEmailButtonDisabled | Boolean | Controls the send-email button state (disabled 60s after click). |
| isProfileModifyOpen | Boolean | Controls opening/closing of the profile edit modal. |

---

## **Features**

### **Redirect if not logged in**

- On mount (useEffect), checks if id exists in localStorage.
- If missing, redirects to homepage ('/').

### **Logout**

- disconnectFunc clears localStorage and redirects to '/'.

### **Send Verification Email**

- sendMailFunc:
    - Disables the send button for 60 seconds.
    - Sends a POST request to /api/newEmailValidation with user id and auth token in headers.
    - Handles errors and logs them to console.

### **User Data Display**

- **Profile picture**: User’s initial inside a gradient circle.
- **Email verification badge**: green (user), blue (admin), gray (unverified).
- **Username** and **location**.
- **XP progress bar** animated with framer-motion.
- **Level** displayed next to the XP bar.

### **Action Buttons**

- Edit profile (opens ProfileModify modal).
- Link to shop (/shop).
- Subscription management.
- Logout.
- Send verification email button (visible if email unverified, disabled 60s after sending).

### **Statistics**

Shows counts of:

- Achievements completed
- Events finished
- AIs fought

Data is retrieved from localStorage.

### **Badges**

- Displays user badges via BadgePreview.
- Shows a “nothing to display” message if none.

### **Profile Edit Modal**

- ProfileModify component conditionally rendered depending on isProfileModifyOpen.

---

## **JSX Structure Example**

```
<div className="min-h-screen ...">
  <div className="max-w-7xl mx-auto">
    <motion.div className="bg-white ...">

      {/* Admin link visible if role ADMIN */}
      {isAdmin && <Link to="/admin" ... />}

      <div className="flex flex-col items-center">

        {/* Profile picture + badge */}
        <div className="relative w-28 h-28 mb-4">
          {/* Circle with initial */}
          {/* Verification badge */}
        </div>

        {/* Username + location */}
        <h2>{userName}</h2>
        <p>{place}</p>

        {/* XP bar */}
        <div className="w-full max-w-md mb-6">
          <div className="relative ...">
            <motion.div style width XP />
          </div>
          <div className="flex justify-between text-sm">
            <span>XP</span>
            <span>Level</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-md space-y-3 mb-8">
          <button onClick={openModal}>Edit Profile</button>
          <Link to="/shop">Manage Subscription</Link>
          <button onClick={disconnectFunc}>Logout</button>
          { !emailVerified && <button onClick={sendMailFunc} disabled={isEmailButtonDisabled}>Send Verification Email</button> }
        </div>

        {/* Statistics */}
        <div className="w-full max-w-md mb-8">
          <h3>Statistics</h3>
          <div>
            {/* Achievements, events, AIs */}
          </div>
        </div>

        {/* Badges */}
        <div className="w-full max-w-md">
          <h3>Badges</h3>
          <div>
            {/* BadgePreview or message */}
          </div>
        </div>
      </div>
    </motion.div>
  </div>

  {/* ProfileModify Modal */}
  <ProfileModify isOpen={isProfileModifyOpen} onClose={closeModal} />
</div>
```

---

## **Technical Notes**

- User data is mainly stored and retrieved from localStorage.
- The email sending request uses axios with token authentication in headers.
- Role management (e.g., ADMIN) relies on the JSON structure stored in localStorage.
- XP bar animation is handled by framer-motion.
- The send email button is disabled for one minute after sending to prevent spam.
- Redirections use window.location.href.
- Texts are translated using a TranslationsDictionary and the current language via useLang.

----------------------------------

FR

# Documentation du composant `Profile`

## Description

Le composant `Profile` est une page React qui affiche les informations du profil utilisateur connecté. Il gère l’affichage des détails de l’utilisateur, un indicateur de progression XP, des actions comme modifier le profil, gérer l’abonnement, envoyer un mail de validation, se déconnecter, ainsi que des statistiques et badges. Il utilise `localStorage` pour récupérer les données utilisateur et assure la redirection vers la page d’accueil si aucun utilisateur n’est connecté.

---

## Dépendances

- **React** (`useState`, `useEffect`)
- **axios** (pour les requêtes HTTP)
- **framer-motion** (pour les animations)
- **react-router-dom** (`Link`)
- **useLang** (hook custom pour la langue)
- **TranslationsDictionary** (dictionnaire de traductions)
- Composants internes :
    - `BadgePreview` (affichage des badges)
    - `ProfileModify` (modale pour modifier le profil)

---

## États internes

| État | Type | Description |
| --- | --- | --- |
| `isEmailButtonDisabled` | Boolean | Gère l’état du bouton d’envoi de mail (désactivé 60s après clic). |
| `isProfileModifyOpen` | Boolean | Contrôle l’ouverture/fermeture de la modale de modification profil. |

---

## Fonctionnalités

### Redirection si non connecté

- Au montage (`useEffect`), vérifie la présence d’un `id` dans `localStorage`.
- Si absent, redirige vers la page d’accueil (`'/'`).

### Déconnexion

- Fonction `disconnectFunc` qui vide le `localStorage` et redirige vers `'/'`.

### Envoi mail de validation

- Fonction `sendMailFunc` qui :
    - Désactive le bouton d’envoi pendant 60 secondes.
    - Envoie une requête POST à `/api/newEmailValidation` avec l’`id` utilisateur et le token d’authentification dans les headers.
    - Gère les erreurs et affiche dans la console.

### Affichage des données utilisateur

- **Photo de profil** : initiale du nom utilisateur dans un cercle avec un dégradé.
- **Badge de vérification email** : vert (utilisateur), bleu (admin), gris (non vérifié).
- **Nom d’utilisateur** et **localisation**.
- **Barre de progression XP** animée avec `framer-motion`.
- **Niveau affiché** à côté de la barre XP.

### Boutons d’action

- Modifier le profil (ouvre modale `ProfileModify`).
- Lien vers la boutique (`/shop`).
- Gestion de l’abonnement.
- Déconnexion.
- Bouton d’envoi du mail de validation (visible si email non vérifié, désactivé 60s après envoi).

### Statistiques

Affiche le nombre de :

- Succès réalisés
- Événements terminés
- IA combattues

Les données sont récupérées depuis `localStorage`.

### Badges

- Affiche les badges utilisateur via le composant `BadgePreview`.
- Si aucun badge, affiche un message de type "rien à afficher".

### Modale de modification du profil

- Composant `ProfileModify` affiché conditionnellement selon `isProfileModifyOpen`.

---

## Structure du rendu JSX

```jsx
<div className="min-h-screen ...">
  <div className="max-w-7xl mx-auto">
    <motion.div className="bg-white ...">

      {/* Lien admin visible si rôle ADMIN */}
      {isAdmin && <Link to="/admin" ... />}

      <div className="flex flex-col items-center">

        {/* Photo profil + badge */}
        <div className="relative w-28 h-28 mb-4">
          {/* Cercle avec initiale */}
          {/* Badge vérification */}
        </div>

        {/* Nom + lieu */}
        <h2>{userName}</h2>
        <p>{place}</p>

        {/* Barre XP */}
        <div className="w-full max-w-md mb-6">
          <div className="relative ...">
            <motion.div style width XP />
          </div>
          <div className="flex justify-between text-sm">
            <span>XP</span>
            <span>Niveau</span>
          </div>
        </div>

        {/* Boutons actions */}
        <div className="w-full max-w-md space-y-3 mb-8">
          <button onClick={openModale}>Modifier profil</button>
          <Link to="/shop">Gérer abonnement</Link>
          <button onClick={disconnectFunc}>Déconnexion</button>
          { !emailVerified && <button onClick={sendMailFunc} disabled={isEmailButtonDisabled}>Envoyer mail</button> }
        </div>

        {/* Statistiques */}
        <div className="w-full max-w-md mb-8">
          <h3>Statistiques</h3>
          <div>
            {/* Succès, événements, IA */}
          </div>
        </div>

        {/* Badges */}
        <div className="w-full max-w-md">
          <h3>Badges</h3>
          <div>
            {/* BadgePreview ou message */}
          </div>
        </div>
      </div>
    </motion.div>
  </div>

  {/* Modale ProfileModify */}
  <ProfileModify isOpen={isProfileModifyOpen} onClose={closeModale} />
</div>

```

---

## Remarques techniques

- Les données utilisateur sont majoritairement stockées et récupérées depuis `localStorage`.
- La requête d’envoi mail utilise axios avec authentification via token dans headers.
- La gestion des rôles (ex : ADMIN) se base sur la structure JSON dans `localStorage`.
- Animation fluide pour la barre XP via `framer-motion`.
- Bouton d’envoi de mail est désactivé pendant 1 minute pour éviter les spams.
- Redirections via `window.location.href`.
- Les textes sont traduits grâce à un dictionnaire `TranslationsDictionary` et la langue sélectionnée via `useLang`.