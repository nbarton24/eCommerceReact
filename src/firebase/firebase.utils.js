import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDQ7XWG4kOhcSexc671A_oelZQebXUuxj4",
    authDomain: "crwn-db-8279d.firebaseapp.com",
    databaseURL: "https://crwn-db-8279d.firebaseio.com",
    projectId: "crwn-db-8279d",
    storageBucket: "crwn-db-8279d.appspot.com",
    messagingSenderId: "624187451711",
    appId: "1:624187451711:web:49eb1857d3635b55694b8a"
  };

  export const createUserProfileDocument = async (userAuth, additonalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additonalData
        })
      }catch (error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;