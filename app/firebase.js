import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaBoGCI-pR07np53-Omtn1kePh7sPcvGo",
  authDomain: "cprg-306-project.firebaseapp.com",
  projectId: "cprg-306-project",
  storageBucket: "cprg-306-project.appspot.com",
  messagingSenderId: "355597169305",
  appId: "1:355597169305:web:8cb17fd554ff1605307e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
