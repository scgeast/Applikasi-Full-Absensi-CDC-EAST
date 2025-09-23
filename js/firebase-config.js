// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD8-YpoEESvqN57q7-PP2GheINU-W7uF9M",
    authDomain: "applikasi-absensi-d0588.firebaseapp.com",
    projectId: "applikasi-absensi-d0588",
    storageBucket: "applikasi-absensi-d0588.firebasestorage.app",
    messagingSenderId: "259203444953",
    appId: "1:259203444953:web:375cb5942bc5b76f2d8ec8",
    measurementId: "G-B2R2DC012T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
