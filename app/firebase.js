// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1xHgcl1cJx0cxXu0aNuxSvhuW-Du1n4g",
  authDomain: "mept1-6519e.firebaseapp.com",
  projectId: "mept1-6519e",
  storageBucket: "mept1-6519e.appspot.com",
  messagingSenderId: "71655970970",
  appId: "1:71655970970:web:8c2bcf2d38f7975a8e2723",
  measurementId: "G-ZRPNX2HL7S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app,auth,RecaptchaVerifier };
