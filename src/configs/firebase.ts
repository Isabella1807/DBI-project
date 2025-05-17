import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyBRTAlED9kPJuYQ_X-ZYbDZmKhTm1CM6yo',
  authDomain: 'dbi-project-61b95.firebaseapp.com',
  projectId: 'dbi-project-61b95',
  storageBucket: 'dbi-project-61b95.firebasestorage.app',
  messagingSenderId: '1023271949335',
  appId: '1:1023271949335:web:92dca496d6fb7d0c4eb852',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // 👈 dette er nødvendigt

export { db, auth }; // 👈 så du kan bruge auth i LogIn.vue
