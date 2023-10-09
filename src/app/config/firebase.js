// firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDPyf7te6P9dyg4nECwW3_gsiEe1rR-lI8",
  authDomain: "explorer-n-co.firebaseapp.com",
  projectId: "explorer-n-co",
  storageBucket: "explorer-n-co.appspot.com",
  messagingSenderId: "638590050664",
  appId: "1:638590050664:web:1e065248a4b37bdabff6dd",
  measurementId: "G-Y66LPY8DDT"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); 

export { auth };
