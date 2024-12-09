import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ8E3lblt_KfzcKAPZbaZjHvFj7Gc6BPk",
  authDomain: "try-firebase-1809b.firebaseapp.com",
  databaseURL: "https://try-firebase-1809b-default-rtdb.firebaseio.com",
  projectId: "try-firebase-1809b",
  storageBucket: "try-firebase-1809b.appspot.com",
  messagingSenderId: "941494378019",
  appId: "1:941494378019:web:975f2f48d30ba2bab35b96",
  measurementId: "G-06DNR6HMMX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const storage = getStorage(app);
