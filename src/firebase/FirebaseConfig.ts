import Constants from 'expo-constants';
import * as firebase from 'firebase';

export const FirebaseConfig = {
  apiKey: Constants.manifest.extra.REACT_NATIVE_FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_APP_ID,
};

export const init = (): void => {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
  }
  console.log(`Firebase: started project ${FirebaseConfig.projectId}`);
};
