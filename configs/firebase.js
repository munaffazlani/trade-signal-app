import firebase from "firebase/app";
import "firebase/storage";
// import "firebase/analytics";
import "firebase/database";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRVB_DLEhPa5bGRGM6dQQwuHjhW7OGgZc",
  authDomain: "trade-signal-app.firebaseapp.com",
  databaseURL:
    "https://trade-signal-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trade-signal-app",
  storageBucket: "trade-signal-app.appspot.com",
  messagingSenderId: "344342272741",
  appId: "1:344342272741:web:f74ee58e4f68bed53f920c",
  measurementId: "G-RPF880ZH7R",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();
const app = firebase.app();
const database = firebase.database(app);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export { storage, database, firestore, serverTimestamp, firebase };
