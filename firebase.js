//import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';




//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

//your web app's Firebase configuration… also used for iOS and Android
//for Firebase JS SDK v7.20.0 and later, measurementId is optional
const { extra } = Constants.expoConfig;
//the keys are all hidden for security reasons
const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  databaseURL: extra.firebaseduburl,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId,
  measurementId: extra.firebaseMeasurementId
};

//initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

//initialize Database
const db = getDatabase(app);

//ensure Firebase is initialized
if (!app) {
    throw new Error('Firebase failed to initialize');
}

export { auth, db };
