import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_gNkG5T0ZYshKynsiz9N5L8WChA5TT6Y",
  authDomain: "podcastapp-f5268.firebaseapp.com",
  projectId: "podcastapp-f5268",
  storageBucket: "podcastapp-f5268.appspot.com",
  messagingSenderId: "119704716077",
  appId: "1:119704716077:web:f8a82da7daa1929a3909a4",
  measurementId: "G-QH379RS3X2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
