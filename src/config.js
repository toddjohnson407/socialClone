
import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

Firebase.initializeApp({
  apiKey: 'AIzaSyDUiYcwGvBCzKeN7KTIVJGU1bNx6sVsmkY',
  authDomain: 'cloned-a5608.firebaseapp.com',
  projectId: 'cloned-a5608',
  storageBucket: "cloned-a5608.appspot.com",
});

import Constants from "expo-constants";
const { manifest } = Constants;

// TESTING LOCAL DB CONFIG
function getMoviesFromApiAsync() {
  return fetch(`http://${manifest.debuggerHost.split(':').shift()}:3000/api/flowskill/all`)
    .then(response => response.json()).catch(error => ('ERROR 1: ' + error)).then(resJson => resJson)
    .catch(error => ('ERROR 2: ' + error));
}

// getMoviesFromApiAsync().then(res => console.log('Fetch Request Complete:', res)).catch(err => console.log('Req Error:', err));

export const db = Firebase.firestore();
export const auth = Firebase.auth();
export const storage = Firebase.storage();

export let createTimestamp = () => Firebase.firestore.Timestamp.fromDate(new Date())
export let arrayPush = (item) => Firebase.firestore.FieldValue.arrayUnion(item)
export let arrayRemove = (item) => Firebase.firestore.FieldValue.arrayRemove(item)

// TODO: Configure database for offline persistence
// db.enablePersistence().catch(err => console.log('Error enabling persisting data:', err.code, err))