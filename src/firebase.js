// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk9U5c7nJS2QqO1rBymVxCa_wTOSJDWHg",
  authDomain: "notification-demo-bf318.firebaseapp.com",
  projectId: "notification-demo-bf318",
  storageBucket: "notification-demo-bf318.appspot.com",
  messagingSenderId: "893390784051",
  appId: "1:893390784051:web:7d1047441f42d6a3ffc546",
  measurementId: "G-XQ2DXL7B6E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging  = getMessaging(app)