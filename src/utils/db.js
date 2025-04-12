import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "contact-book-4e55b.firebaseapp.com",
  projectId: "contact-book-4e55b",
  storageBucket: "contact-book-4e55b.firebasestorage.app",
  messagingSenderId: "540962152733",
  appId: "1:540962152733:web:de488f4e0f0fca6f0c81f4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
