import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import "firebase/database";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
