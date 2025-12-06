// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEsorEw-cKLE0JXun0MU2naje4EvbZA24",
  authDomain: "assignment11-196f4.firebaseapp.com",
  projectId: "assignment11-196f4",
  storageBucket: "assignment11-196f4.firebasestorage.app",
  messagingSenderId: "589072976002",
  appId: "1:589072976002:web:b2aad602b0b93b2dc3cc9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
