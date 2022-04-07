// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOz4nAzd8-gupu9N-YEf-T6zAqj1Zr_vk",
  authDomain: "login-form-firebase-auth.firebaseapp.com",
  projectId: "login-form-firebase-auth",
  storageBucket: "login-form-firebase-auth.appspot.com",
  messagingSenderId: "525673344045",
  appId: "1:525673344045:web:db84c9bb9407a09f18dca4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;