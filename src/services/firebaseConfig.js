
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAUgi8NdMkxP-i337BCwZC9M4iGhvjs5Y",
  authDomain: "navsos.firebaseapp.com",
  projectId: "navsos",
  storageBucket: "navsos.appspot.com",
  messagingSenderId: "124472527897",
  appId: "1:124472527897:web:f78d5b5acfacbe8b50ee88",
  measurementId: "G-NRNKVLFJJM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

