// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHTp7_TbRR91CRZa8UUFi0-ca-Tvagau8",
    authDomain: "aurorawdc-app-5a801.firebaseapp.com",
    databaseURL: "https://aurorawdc-app-5a801-default-rtdb.firebaseio.com",
    projectId: "aurorawdc-app-5a801",
    storageBucket: "aurorawdc-app-5a801.firebasestorage.app",
    messagingSenderId: "142728050041",
    appId: "1:142728050041:web:e948984f4ebc9db6e1eba8",
    measurementId: "G-QB7EJSQJBW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Database
const db = getDatabase(app);

// Ensure Firebase is initialized
if (!app) {
    throw new Error('Firebase failed to initialize');
}

export { auth, db };
