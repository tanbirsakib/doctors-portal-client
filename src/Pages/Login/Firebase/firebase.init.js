import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseI.config";


const initFirebase = () => {
    initializeApp(firebaseConfig);
}

export default initFirebase;