import * as firebase from 'firebase';

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

const signInWithFacebook = async (token: string): Promise<UserCredential> => {
  try {
    const credentials = firebase.auth.FacebookAuthProvider.credential(token);
    const response = await firebase.auth().signInWithCredential(credentials);
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

const getCurrentUser = async (): Promise<User | null> => {
  try {
    return Promise.resolve(firebase.auth().currentUser);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateCurrentUserProfile = async (payload: Partial<User>): Promise<User | null> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Promise.resolve(null);
    }

    await user.updateProfile(payload);
    const userUpdated = await getCurrentUser();
    return Promise.resolve(userUpdated);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const FirebaseAuthApi = {
  signUp,
  signIn,
  signInWithFacebook,
  signOut,
  getCurrentUser,
  updateCurrentUserProfile,
};
