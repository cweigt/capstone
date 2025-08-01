// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { extra } = Constants.expoConfig;
const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  databaseURL: extra.firebaseDatabaseURL,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId,
  measurementId: extra.firebaseMeasurementId
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
