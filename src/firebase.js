import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAD-wZBdqqpMrXng0BKFSIiJw9jzL_xzjA",
  authDomain: "lake-d30ad.firebaseapp.com",
  databaseURL: "https://lake-d30ad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lake-d30ad",
  storageBucket: "lake-d30ad.appspot.com",
  messagingSenderId: "633397665516",
  appId: "1:633397665516:web:9545c24d528da466544fc9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const database = getDatabase(app); // Initialize Realtime Database

export { app, analytics, firestore, database };
