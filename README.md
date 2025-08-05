To begin:

1. Install dependencies: 'npm install'
2. Run: 'npm start'… click "S" on keyboard to swap between Expo and development client

PROJECT STRUCTURE BELOW.
**Hidden files not included.**
**Brief descriptions will be provided.**
**For more detail, view the comments in those files.**

<details>
<summary>📁 project-root</summary>

<details>
<summary>📁 app <em>(these consist of all the pages)</em></summary>

<details>
<summary>📁 (tabs) <em>(tabs holds the pages shown in the navigation bar)</em></summary>

<details>
<summary>📁 account <em>(pages related to the account stack)</em></summary>

- 📄 _layout.tsx <em>(contains the function to initialize the account stack)</em>  
- 📄 index.tsx <em>(controller for showing sign up or sign in page… not used in the invite-only version)</em>  
- 📄 profile.tsx <em>(this page renders different components that make up the profile page)</em>  

</details>

- 📄 _layout.tsx <em>(this controls the nav bar and what appears in it)</em>  
- 📄 index.tsx <em>(this page is the feed page where all the data fetching is done for articles)</em>  
- 📄 savedArticles.tsx <em>(consists of saved articles for that user)</em>  

</details>

- 📄 _layout.tsx <em>(this layout is for the app structure)</em>  
- 📄 +not-found.tsx <em>(display if a page route is not found)</em>  
- 📄 eula <em>(EULA page outline that contains the component)</em>  
- 📄 privacy-policy <em>(privacy policy page that contains said component)</em>  
- 📄 settings <em>(edit profile page for resetting password and name change)</em>  

</details>

<details>
<summary>📁 assets</summary>

- 📁 fonts <em>(holds the fonts used for the app, can be changed)</em>  
- 📁 images <em>(contains all the image assets such as icons or logos)</em>  

<details>
<summary>📁 Legal <em>(legal documents)</em></summary>

- 📄 EULA.tsx <em>(the EULA module rendered into the eula page)</em>  
- 📄 Policy.tsx <em>(the privacy policy module rendered into the privacy policy page)</em>  

</details>
</details>

<details>
<summary>📁 components</summary>

- 📁 tests <em>(just a couple of tests and snapshots for themed texts, not utilized much)</em>  

<details>
<summary>📁 ui</summary>

- 📄 IconSymbol.ios.tsx <em>(icons used that are specific to iOS)</em>  
- 📄 IconSymbol.tsx <em>(icons that are used for Android and the web)</em>  
- 📄 TabBarBackground.ios.tsx <em>(setup for the nav-tab bar in the bottom for iOS)</em>  
- 📄 TabBarBackground.tsx <em>(set for the navigation bar for Android and web)</em>  

</details>

- 📄 ArticleCard.tsx <em>(receives the information and displays it to a card for each article)</em>  
- 📄 Collapsible.tsx <em>(a dead component that controls collapsing animation, can be used in the future for more generic use animations)</em>  
- 📄 DeleteAccountButton.tsx <em>(controls account deletion)</em>  
- 📄 DisplayImage.tsx <em>(solely responsible for displaying the user profile if available)</em>  
- 📄 ExternalLink.tsx <em>(used for link navigation, such as the in-app browser)</em>  
- 📄 HapticTab.tsx <em>(controls the animation for the tab bar, developed a bit of our own)</em>  
- 📄 NameChange.tsx <em>(allows user to change their first and last name if they want to)</em>  
- 📄 ParallaxScrollView.tsx <em>(controls page layout and scroll mechanics for the main pages)</em>  
- 📄 ResetPassword.tsx <em>(allows the user to reset their password for people knowing their old password)</em>  
- 📄 Search.tsx <em>(enables user to search through all feeds based on what they type)</em>  
- 📄 SideDrawer.tsx <em>(side menu for the user to select which feed they want to view)</em>  
- 📄 SignIn.tsx <em>(this manages user sign in or forgotten password)</em>  
- 📄 SignUp.tsx <em>(account creation within the app… not used in invite-only)</em>  
- 📄 ThemeWrapper.tsx <em>(wrapper for light or dark theme)</em>  
- 📄 ToggleMode.tsx <em>(users can choose what mode dark/light that they want, pulls from system initially)</em>  
- 📄 UploadImage.tsx <em>(this uses ImagePicker for user to select a profile picture)</em>  

</details>

<details>
<summary>📁 constants</summary>

- 📄 Routes.ts <em>(page routing management system)</em>  

</details>

<details>
<summary>📁 context</summary>

- 📄 AuthContext.tsx <em>(tracking the user in the system using Firebase)</em>  
- 📄 ImageContext.tsx <em>(retrieves the profile photo for the user from Firebase)</em>  
- 📄 ThemeContext.tsx <em>(gets theme settings from Firebase for the user)</em>  

</details>

- 📁 keys <em>(this folder contains keys for Android, Firebase, and iOS)</em>  

<details>
<summary>📁 scripts</summary>

- 📄 reset-project.js <em>(used to reset project to blank state… fatal)</em>  

</details>

<details>
<summary>📁 styles</summary>

- 📄 theme.ts <em>(the common styles shared among the other style files)</em>  
- 💬 <em>(each page and component has a styles page for organization)</em>  

</details>

<details>
<summary>📁 utils</summary>

- 📄 decodeHTML.ts <em>(this takes weird characters in the HTML and converts them to letters, numbers, symbols as necessary)</em>  

</details>

- 📄 .gitignore <em>(contains the files that are not pushed to GitHub)</em>  
- 📄 app.config.js <em>(contains general app information like name, version, and icon)</em>  
- 📄 app.json <em>(less extensive than the app.config.js file but similar information)</em>  
- 📄 eas.json <em>(build and production information)</em>  
- 📄 eslint.config.mjs <em>(this is the linting file, defines parameters for other files)</em>  
- 📄 firebase.js <em>(firebase initialization file)</em>  
- 📄 metro.config.js <em>(standard for expo projects, part of the backbone of the app)</em>  
- 📄 package-lock.json <em>(contains the versions of all the dependencies)</em>  
- 📄 package.json <em>(contains the versions of all the dependencies)</em>  
- 📄 README.md <em>(THIS file that has project structure)</em>  
- 📄 tsconfig.json <em>(helps with small things like imports in each file)</em>  

</details>




