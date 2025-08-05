To begin:

1. Install dependencies: 'npm install'
2. Run: 'npm start'… click "S" on keyboard to swap between Expo and development client

PROJECT STRUCTURE BELOW.
**Hidden files not included.**
**Brief descriptions will be provided.**
**For more detail, view the comments in those files.**

<details>
<summary>📂 project-root</summary>

<details>
<summary>📂 app</summary>

<details>
<summary>📂 tabs</summary>

<details>
<summary>📂 account</summary>

- 📄 _layout.tsx — initializes account stack  
- 📄 index.tsx — sign in/up controller (unused in invite-only)  
- 📄 profile.tsx — profile page components  

</details>

- 📄 _layout.tsx — nav bar controller  
- 📄 index.tsx — feed & article fetching  
- 📄 savedArticles.tsx — user's saved articles  

</details>

- 📄 _layout.tsx — global app layout  
- 📄 +not-found.tsx — fallback for unknown routes  
- 📄 eula — EULA page wrapper  
- 📄 privacy-policy — privacy policy page wrapper  
- 📄 settings — edit profile (name, password)  

</details>

<details>
<summary>📂 assets</summary>

- 🖼️ fonts — app fonts  
- 🖼️ images — icons, logos  

<details>
<summary>📂 Legal</summary>

- 📜 EULA.tsx — rendered in eula page  
- 📜 Policy.tsx — rendered in privacy policy page  

</details>
</details>

<details>
<summary>📂 components</summary>

- 🧪 tests — minor snapshots and text tests  

<details>
<summary>📂 ui</summary>

- 🧩 IconSymbol.ios.tsx — iOS-specific icons  
- 🧩 IconSymbol.tsx — Android/web icons  
- 🧩 TabBarBackground.ios.tsx — bottom nav bar (iOS)  
- 🧩 TabBarBackground.tsx — bottom nav bar (Android/web)  

</details>

- 🧩 ArticleCard.tsx — displays articles in cards  
- 🧩 Collapsible.tsx — unused animation component  
- 🧩 DeleteAccountButton.tsx — account deletion logic  
- 🧩 DisplayImage.tsx — renders user profile pic  
- 🧩 ExternalLink.tsx — handles in-app navigation  
- 🧩 HapticTab.tsx — custom tab animation  
- 🧩 NameChange.tsx — updates name  
- 🧩 ParallaxScrollView.tsx — scroll & layout controller  
- 🧩 ResetPassword.tsx — password reset with current password  
- 🧩 Search.tsx — feed searching  
- 🧩 SideDrawer.tsx — feed selection drawer  
- 🧩 SignIn.tsx — sign in & recovery  
- 🧩 SignUp.tsx — account creation (not used)  
- 🧩 ThemeWrapper.tsx — theme context wrapper  
- 🧩 ToggleMode.tsx — light/dark mode toggle  
- 🧩 UploadImage.tsx — image picker for profile  

</details>

<details>
<summary>📂 constants</summary>

- 📄 Routes.ts — routing system  

</details>

<details>
<summary>📂 context</summary>

- 📄 AuthContext.tsx — tracks auth via Firebase  
- 📄 ImageContext.tsx — pulls profile photo from Firebase  
- 📄 ThemeContext.tsx — handles theme settings  

</details>

<details>
<summary>🔑 keys</summary>

- 🔐 Contains keys for Android, iOS, Firebase  

</details>

<details>
<summary>📂 scripts</summary>

- ⚙️ reset-project.js — resets to blank state (⚠️ destructive)  

</details>

<details>
<summary>🎨 styles</summary>

- 🎨 theme.ts — shared styling rules  
- 🎨 *(each page/component has its own style file)*  

</details>

<details>
<summary>🧰 utils</summary>

- 📄 decodeHTML.ts — converts HTML entities to readable text  

</details>

- 📄 .gitignore — ignored files list  
- ⚙️ app.config.js — main app settings  
- ⚙️ app.json — simplified app metadata  
- ⚙️ eas.json — build info  
- ⚙️ eslint.config.mjs — lint rules  
- ⚙️ firebase.js — Firebase init  
- ⚙️ metro.config.js — Expo config  
- 📄 package-lock.json — dependency versions  
- 📄 package.json — dependencies list  
- 📄 README.md — this file  
- ⚙️ tsconfig.json — TypeScript config  

</details>





