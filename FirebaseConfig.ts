// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQgI9VsVWVr2C0zH0betVNuuiFfz8ipr4",
  authDomain: "tp3-movil.firebaseapp.com",
  projectId: "tp3-movil",
  storageBucket: "tp3-movil.firebasestorage.app",
  messagingSenderId: "990994617257",
  appId: "1:990994617257:web:3c33eabd388086e7c3eab8"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_BD = getFirestore(FIREBASE_APP);