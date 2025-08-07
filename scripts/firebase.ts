import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-m-YsokZG-Z2ANKSBN-L5cpTc52dBaY0",
  authDomain: "weathertracker007.firebaseapp.com",
  projectId: "weathertracker007",
  storageBucket: "weathertracker007.firebasestorage.app",
  messagingSenderId: "578699576589",
  appId: "1:578699576589:web:09b0a57a4bd70e7ac99c44"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);