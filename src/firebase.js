// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCVwIOpnfGnlKbQDV5HytvTRD4o-F6ffMo",
  authDomain: "notwhatsapp-eba8d.firebaseapp.com",
  projectId: "notwhatsapp-eba8d",
  storageBucket: "notwhatsapp-eba8d.appspot.com",
  messagingSenderId: "762255262911",
  appId: "1:762255262911:web:bfccf296703d0e6563320a",
  measurementId: "G-XFM0R5PPWV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
