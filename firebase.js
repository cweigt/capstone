// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
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

// Initialize Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Database
const db = getDatabase(app);

// Ensure Firebase is initialized
if (!app) {
    throw new Error('Firebase failed to initialize');
}

export { auth, db };
