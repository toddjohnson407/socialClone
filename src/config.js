
import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

Firebase.initializeApp({
  apiKey: 'AIzaSyDUiYcwGvBCzKeN7KTIVJGU1bNx6sVsmkY',
  authDomain: 'cloned-a5608.firebaseapp.com',
  projectId: 'cloned-a5608',
  storageBucket: "cloned-a5608.appspot.com",
});

// TESTING LOCAL DB CONFIG
// function getMoviesFromApiAsync() {
//   // return fetch('http://127.0.0.1:3000/api/admin/testmobile')
//   // return fetch('http://localhost:3000/api/admin/testmobile')
//   return fetch('https://facebook.github.io/react-native/movies.json')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson;
//     })
//     .catch((error) => {
//       console.error('ERROR:', error);
//     });
// }

// getMoviesFromApiAsync().then(res => console.log('Fetch Request Complete:', res));

export const db = Firebase.firestore();
export const auth = Firebase.auth();
export const storage = Firebase.storage();

export let createTimestamp = () => Firebase.firestore.Timestamp.fromDate(new Date())
export let arrayPush = (item) => Firebase.firestore.FieldValue.arrayUnion(item)
export let arrayRemove = (item) => Firebase.firestore.FieldValue.arrayRemove(item)

// TODO: Configure database for offline persistence
// db.enablePersistence().catch(err => console.log('Error enabling persisting data:', err.code, err))