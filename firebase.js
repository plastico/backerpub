import  firebase  from "firebase";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCjL69rwnmSznrCZ18CcRmdpAV6894RaB8",
  authDomain: "backer2021-87d86.firebaseapp.com",
  projectId: "backer2021-87d86",
  storageBucket: "backer2021-87d86.appspot.com",
  messagingSenderId: "679640269018",
  appId: "1:679640269018:web:bc514c93013d7fbbe425e3",
  measurementId: "G-HGXPP1QR10"
};

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user);
    }, reject);
  });
};

firebase.initializeApp(config);

export default firebase;