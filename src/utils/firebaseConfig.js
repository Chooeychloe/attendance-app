import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBi9ODgugjrV2YQImMFr4FRgLaPfNtrSIQ",
    authDomain: "dcs-scheduling-system.firebaseapp.com",
    projectId: "dcs-scheduling-system",
    storageBucket: "dcs-scheduling-system.firebasestorage.app",
    messagingSenderId: "614454738767",
    appId: "1:614454738767:web:99596cef986aa904f38f3a",
    measurementId: "G-7TV1WHWFEK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
