// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAF02yCDq3Hzr9pVlIj6uDj9Z8UB8Yfu4",
  authDomain: "test-server-d4f45.firebaseapp.com",
  projectId: "test-server-d4f45",
  storageBucket: "test-server-d4f45.firebasestorage.app",
  messagingSenderId: "593705036940",
  appId: "1:593705036940:web:7c2c79dc6d1cf0285c9fa9",
  measurementId: "G-NDYJTSNVE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const AUTH_FIREBASE = getAuth(app)