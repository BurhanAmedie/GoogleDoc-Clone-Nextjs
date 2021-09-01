import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyBYkQpzPnT4WIIMSmZTS9TrqJcjqcdbbsE",
    authDomain: "doc-1bf55.firebaseapp.com",
    projectId: "doc-1bf55",
    storageBucket: "doc-1bf55.appspot.com",
    messagingSenderId: "916000295378",
    appId: "1:916000295378:web:bd5957916c74b6c950200b"
  };
  
const app =  !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();


const db = app.firestore();

export { db } ;