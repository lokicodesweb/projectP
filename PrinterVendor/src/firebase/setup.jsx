import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6YxTGJ79coPubRNEw-B7SxwiuW57aDM4",
  authDomain: "printervending.firebaseapp.com",
  projectId: "printervending",
  storageBucket: "printervending.firebasestorage.app",
  messagingSenderId: "854268331348",
  appId: "1:854268331348:web:86417a8944f062ebc874c1",
  measurementId: "G-N702QNSCER",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default auth;
