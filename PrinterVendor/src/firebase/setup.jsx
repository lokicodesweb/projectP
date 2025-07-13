import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD3Fg1AbsSRz0pR9zewUjMykyIZpIKzFzM",
  authDomain: "printerproject-4b378.firebaseapp.com",
  projectId: "printerproject-4b378",
  storageBucket: "printerproject-4b378.firebasestorage.app",
  messagingSenderId: "606396960602",
  appId: "1:606396960602:web:3d32cd1fa6bb39f6c86d63",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default auth;
