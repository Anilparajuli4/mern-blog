// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDnEriXFcKQppRuOGmn0gRSR5_F6xL4UQ",
  authDomain: "mern-blog-9e6f8.firebaseapp.com",
  projectId: "mern-blog-9e6f8",
  storageBucket: "mern-blog-9e6f8.appspot.com",
  messagingSenderId: "1099310110823",
  appId: "1:1099310110823:web:26cc493ee692b2f9c41cc2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)