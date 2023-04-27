// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQIjK1nnZ4BZqhLRU9fWtRnQGfQAipWGI",
  authDomain: "recipeapp-a0ff3.firebaseapp.com",
  projectId: "recipeapp-a0ff3",
  storageBucket: "recipeapp-a0ff3.appspot.com",
  messagingSenderId: "862770005084",
  appId: "1:862770005084:web:d9132a4405c56341bc5299",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
