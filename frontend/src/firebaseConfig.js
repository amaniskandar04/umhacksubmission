// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace this with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCfNtGzbKeq8SO49Wzx9hoCllA9AuVtQO8",
  authDomain: "umhack2025-50892.firebaseapp.com",
  projectId: "umhack2025-50892",
  storageBucket: "umhack2025-50892.firebasestorage.app",
  messagingSenderId: "11218868557",
  appId: "1:11218868557:web:dd0ee7de54e93296dfff04",
};

const app = initializeApp(firebaseConfig); // 🟢 Initializes the Firebase App

const auth = getAuth(app); // ✅ Use this in other files

export { auth };
