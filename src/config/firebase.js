// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsSbA4z9zEc_k9YEmHmgZUTyXA5SGL0Ys",
  authDomain: "vite-contact-42e26.firebaseapp.com",
  projectId: "vite-contact-42e26",
  storageBucket: "vite-contact-42e26.appspot.com",
  messagingSenderId: "1043362192374",
  appId: "1:1043362192374:web:947bb57c4795160c1245d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);