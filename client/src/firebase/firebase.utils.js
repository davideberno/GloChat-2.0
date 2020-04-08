import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBiFI-Oerr67ithQ0ehFlsGUhpFHLRh1Ec",
  authDomain: "glochat2-1585614391026.firebaseapp.com",
  databaseURL: "https://glochat2-1585614391026.firebaseio.com",
  projectId: "glochat2-1585614391026",
  storageBucket: "glochat2-1585614391026.appspot.com",
  messagingSenderId: "898364011687",
  appId: "1:898364011687:web:47c73429c83ccc74c81782",
  measurementId: "G-4PBM3YNGKW",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
