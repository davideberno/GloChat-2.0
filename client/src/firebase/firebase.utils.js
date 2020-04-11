import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyArOLDYSZUgLD9mQcI4BnF4P4QnTa5Iig0",
  authDomain: "glochat-2auth.firebaseapp.com",
  databaseURL: "https://glochat-2auth.firebaseio.com",
  projectId: "glochat-2auth",
  storageBucket: "glochat-2auth.appspot.com",
  messagingSenderId: "645453272459",
  appId: "1:645453272459:web:62dc1a3184d38383bf0b8e",
  measurementId: "G-JZ2HWLNQEE",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
