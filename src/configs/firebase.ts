import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  browserLocalPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBRTAlED9kPJuYQ_X-ZYbDZmKhTm1CM6yo',
  authDomain: 'dbi-project-61b95.firebaseapp.com',
  projectId: 'dbi-project-61b95',
  storageBucket: 'dbi-project-61b95.firebasestorage.app',
  messagingSenderId: '1023271949335',
  appId: '1:1023271949335:web:92dca496d6fb7d0c4eb852',
};

const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

// Initialiser Auth med local persistence
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

export { db, auth };
