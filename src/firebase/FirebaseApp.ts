import Constants from 'expo-constants';
import firebase from 'firebase/app';
import { Logger } from '../log/Logger';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.REACT_NATIVE_FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_APP_ID,
};

export const FirebaseApp = (): void => {
  firebase.initializeApp(firebaseConfig);
  Logger.log(`Firebase app ${firebaseConfig.projectId}: started`);
};
