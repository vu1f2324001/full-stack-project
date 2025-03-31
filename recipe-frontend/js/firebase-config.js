// ✅ Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
const apiKey = process.env.GOOGLE_API_KEY;
// ✅ Firebase Configuration (Firebase Project मधून कॉपी कर)
const firebaseConfig = {
    authDomain: "recipe-cc30c",
    projectId: "recipe-cc30c",
    storageBucket: "recipe-cc30c",
    messagingSenderId: "45552139505",
    appId: "1:45552139505:web:9b338216cceccf3ef7bd50"
};

// ✅ Firebase Initialize करतोय
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };