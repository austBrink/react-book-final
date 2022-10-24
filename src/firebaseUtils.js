import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAPjTVzOaa2f1PI__1erS-3J8QRHFALYaU",
    authDomain: "react-book-final.firebaseapp.com",
    projectId: "react-book-final",
    storageBucket: "react-book-final.appspot.com",
    messagingSenderId: "207316138991",
    appId: "1:207316138991:web:6f6b4cddd4d9c44fc1941a"
};

firebase.initializeApp(config);
export default firebase;