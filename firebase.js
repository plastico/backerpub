import firebase from "firebase";
import "firebase/auth";

const config = {
  apiKey: /**/,
  authDomain: /**/,
  databaseURL: /**/,
  projectId: /**/,
  storageBucket: /**/,
  messagingSenderId: /**/,
  appId: /**/,
  measurementId: /**/
};

firebase.initializeApp(config);

export default firebase;