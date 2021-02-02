import firebase from 'firebase';

export type App = firebase.app.App;
export type User = firebase.User;
export type UserCredential = firebase.auth.UserCredential;

const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signOut = async (): Promise<void> => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const FirebaseApi = {
  signUp,
  signIn,
  signOut,
};
