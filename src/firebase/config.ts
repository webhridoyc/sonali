// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1SZejJCPNnnmAgx-ki9SIhZNj0ekMJSQ",
  authDomain: "sanalisokal-d92a1.firebaseapp.com",
  projectId: "sanalisokal-d92a1",
  storageBucket: "sanalisokal-d92a1.appspot.com",
  messagingSenderId: "535447321179",
  appId: "1:535447321179:web:66802877706addf2e35d7e",
  measurementId: "G-1Z5JWCBC7L"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;


export { app, firestore, auth, analytics };
