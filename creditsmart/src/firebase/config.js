// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz421tRC71KUgPsu2mFCDmSpv00R7KYpE",
  authDomain: "creditsmart-anzueta.firebaseapp.com",
  projectId: "creditsmart-anzueta",
  storageBucket: "creditsmart-anzueta.firebasestorage.app",
  messagingSenderId: "872472794536",
  appId: "1:872472794536:web:35c4d16eea1ca34186f99d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
