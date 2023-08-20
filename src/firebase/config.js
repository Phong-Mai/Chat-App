// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDYR-hv3dJfUozNgzgRGWCFLAWJLi30nI4",
  authDomain: "chat-app-cba1a.firebaseapp.com",
  projectId: "chat-app-cba1a",
  storageBucket: "chat-app-cba1a.appspot.com",
  messagingSenderId: "69994836678",
  appId: "1:69994836678:web:d0d9b050606a53a0229dc7",
  measurementId: "G-ES1DYYVJD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
