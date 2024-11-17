// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCFR6ONBjQkil21bGd7keaHZAMcG2V_ScI',
    authDomain: 'forum-f356a.firebaseapp.com',
    databaseURL: 'https://forum-f356a-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'forum-f356a',
    storageBucket: 'forum-f356a.firebasestorage.app',
    messagingSenderId: '112706338145',
    appId: '1:112706338145:web:f75c557e3ebdb127361920',
    measurementId: 'G-EE58J4LVZ0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authFirebase = getAuth();
export default app;
