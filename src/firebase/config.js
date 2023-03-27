
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// config del proyecto importadad desde firebase

const firebaseConfig = {
  apiKey: "AIzaSyDydmIKxLMCRDhluNQMQ1AHhi2mQegQarw",
  authDomain: "mi-diario-a7fbd.firebaseapp.com",
  projectId: "mi-diario-a7fbd",
  storageBucket: "mi-diario-a7fbd.appspot.com",
  messagingSenderId: "713855692427",
  appId: "1:713855692427:web:186ac43f59347b98ceae8e"
};

export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );