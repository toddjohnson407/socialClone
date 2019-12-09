
import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

Firebase.initializeApp({
  apiKey: 'AIzaSyDUiYcwGvBCzKeN7KTIVJGU1bNx6sVsmkY',
  authDomain: 'cloned-a5608.firebaseapp.com',
  projectId: 'cloned-a5608'
});

export const db = Firebase.firestore();
export const auth = Firebase.auth()



// Use for realtime firebase database
// let config = {
//   apiKey: "AIzaSyDUiYcwGvBCzKeN7KTIVJGU1bNx6sVsmkY",
//   authDomain: "cloned-a5608.firebaseapp.com",
//   databaseURL: "https://cloned-a5608.firebaseio.com",
//   projectId: "cloned-a5608",
//   storageBucket: "cloned-a5608.appspot.com",
//   messagingSenderId: "142729095936",
//   appId: "1:142729095936:web:fc142a3d55c5b1a63fe1e5",
//   measurementId: "G-50GKYEMVMC"
// };
// let app = Firebase.initializeApp(config);
// export const db = app.database();