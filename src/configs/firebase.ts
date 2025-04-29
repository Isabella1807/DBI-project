// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRTAlED9kPJuYQ_X-ZYbDZmKhTm1CM6yo",
  authDomain: "dbi-project-61b95.firebaseapp.com",
  projectId: "dbi-project-61b95",
  storageBucket: "dbi-project-61b95.firebasestorage.app",
  messagingSenderId: "1023271949335",
  appId: "1:1023271949335:web:92dca496d6fb7d0c4eb852"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };