// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCwC7F3ykAykqDz7y4p5birROTZKPP9ZWY",
    authDomain: "facebook-clone-496ed.firebaseapp.com",
    projectId: "facebook-clone-496ed",
    storageBucket: "facebook-clone-496ed.appspot.com",
    messagingSenderId: "1016334803943",
    appId: "1:1016334803943:web:f2ed5b4a39a80d8f3f9342",
    measurementId: "G-C3KPJFH64K"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

console.log(auth);

export { auth, provider, storage };
export default db;