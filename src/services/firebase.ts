import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvQ4r_TwRdI_huPOLi54S2C0uJ7LTqMfA",
    authDomain: "recetas-7b849.firebaseapp.com",
    projectId: "recetas-7b849",
    storageBucket: "recetas-7b849.firebasestorage.app",
    messagingSenderId: "275086700331",
    appId: "1:275086700331:web:611d38656a9d5d86209f6e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);