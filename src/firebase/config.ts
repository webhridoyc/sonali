
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-sD7fMuYqFfC92DM3BfVeQVNEfua2WS0",
  authDomain: "studio-4762668076-5f840.firebaseapp.com",
  projectId: "studio-4762668076-5f840",
  storageBucket: "studio-4762668076-5f840.appspot.com",
  messagingSenderId: "430862672104",
  appId: "1:430862672104:web:0b7e402d7387b03f39a95d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
