import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBOz4nAzd8-gupu9N-YEf-T6zAqj1Zr_vk",
  authDomain: "login-form-firebase-auth.firebaseapp.com",
  projectId: "login-form-firebase-auth",
  storageBucket: "login-form-firebase-auth.appspot.com",
  messagingSenderId: "525673344045",
  appId: "1:525673344045:web:db84c9bb9407a09f18dca4"
};

const app = initializeApp(firebaseConfig);

export default app;