
import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

Firebase.initializeApp({
  apiKey: 'AIzaSyDUiYcwGvBCzKeN7KTIVJGU1bNx6sVsmkY',
  authDomain: 'cloned-a5608.firebaseapp.com',
  projectId: 'cloned-a5608',
  storageBucket: "cloned-a5608.appspot.com",
});

export const db = Firebase.firestore();
export const auth = Firebase.auth();
export const storage = Firebase.storage();

export let createTimestamp = () => Firebase.firestore.Timestamp.fromDate(new Date())

// TODO: Configure database for offline persistence
// db.enablePersistence().catch(err => console.log('Error enabling persisting data:', err.code, err))