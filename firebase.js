// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7N-BOm26nyeju-fWIr3eFfGV8-l3L4RA",
    authDomain: "aurorawdc.firebaseapp.com",
    projectId: "aurorawdc",
    storageBucket: "aurorawdc.firebasestorage.app",
    messagingSenderId: "1085205837895",
    appId: "1:1085205837895:web:094fba8340806ac671d962",
    measurementId: "G-0DVN9242ZF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
