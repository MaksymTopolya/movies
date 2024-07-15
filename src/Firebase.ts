// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9tK1sZp_5QtMscA5Aqfe0RUdeETqPc_U',
  authDomain: 'movie-617c6.firebaseapp.com',
  projectId: 'movie-617c6',
  storageBucket: 'movie-617c6.appspot.com',
  messagingSenderId: '938317420353',
  appId: '1:938317420353:web:0051c1fa40a6f4a1bbb3c0',
  measurementId: 'G-C0CSM087XJ',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
