// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA85cnPTSmxfm__iesfCYaFMNtKM-6lc40",
    authDomain: "meletric-703c8.firebaseapp.com",
    projectId: "meletric-703c8",
    storageBucket: "meletric-703c8.firebasestorage.app",
    messagingSenderId: "774822964142",
    appId: "1:774822964142:web:1660c5fb63bc4afdf2763f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase conectado com sucesso!");

// Exportando o Firestore
export { db };