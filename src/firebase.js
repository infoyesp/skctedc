
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAzYOtQWLMBLDcGRM04yPFWbV6dP4eRac",
    authDomain: "edcs-6eb1c.firebaseapp.com",
    databaseURL: "https://edcs-6eb1c-default-rtdb.firebaseio.com",
    projectId: "edcs-6eb1c",
    storageBucket: "edcs-6eb1c.appspot.com",
    messagingSenderId: "280991955170",
    appId: "1:280991955170:web:7b25f3384d3b5519b506bb",
    measurementId: "G-SKHYVMGE4T"
  };


  firebase.initializeApp(firebaseConfig);
  

  export default firebase;