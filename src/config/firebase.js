// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPh-1eAhqqIneERlrHNfRYx6RP8sbplow",
  authDomain: "society-b362f.firebaseapp.com",
  projectId: "society-b362f",
  storageBucket: "society-b362f.appspot.com",
  messagingSenderId: "40783935032",
  appId: "1:40783935032:web:5d02990d1543aa9c0158cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
