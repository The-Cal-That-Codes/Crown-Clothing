import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'




const config = {
    apiKey: "AIzaSyASRFEi_cKU5dpMvXQQrYJrDP5Qb5QOO-A",
    authDomain: "crown-clothing-mockecommerce.firebaseapp.com",
    projectId: "crown-clothing-mockecommerce",
    storageBucket: "crown-clothing-mockecommerce.appspot.com",
    messagingSenderId: "14797415273",
    appId: "1:14797415273:web:4550fc206f1ba8625413f8",
    measurementId: "G-VC8120390L"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,

          ...additionalData
        })
      }
      catch(error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;