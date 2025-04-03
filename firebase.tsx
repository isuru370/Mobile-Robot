// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgv2dD6B92KizDNGcxLWqEjaxo9J9f_yA",
  authDomain: "online-robot-7237a.firebaseapp.com",
  projectId: "online-robot-7237a",
  storageBucket: "online-robot-7237a.firebasestorage.app",
  messagingSenderId: "1088695158928",
  appId: "1:1088695158928:web:6ba67303cb942352017015"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};