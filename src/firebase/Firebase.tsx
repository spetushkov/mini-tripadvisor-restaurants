import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { FacebookConfig, init as facebookInit } from '../facebook/FacebookConfig';
import { App, FirebaseAuthApi, User, UserCredential } from './FirebaseAuthApi';
import { init as firebaseInit } from './FirebaseConfig';
import { FirebaseStorageApi, UploadTask } from './FirebaseStorageApi';

type Props = {
  children: React.ReactNode;
};

export type FirebaseContext = {
  app: App | null;
  user: User | null;
  authenticated: boolean;
  waitingAuthentication: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithFacebook: () => Promise<UserCredential | null>;
  signOut: () => Promise<boolean>;
  uploadImage: (uri: string, imageId: string) => Promise<UploadTask>;
  getImageDownloadUrl: (imageId: string) => Promise<string>;
  updateCurrentUserProfile: (payload: Partial<User>) => Promise<void>;
};

firebaseInit();

export const FirebaseContext = createContext({} as FirebaseContext);

export const Firebase = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [waitingAuthentication, setWaitingAuthentication] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setAuthenticated(!!user);
      setWaitingAuthentication(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setWaitingAuthentication(true);
      const response = await FirebaseAuthApi.signUp(email, password);
      return Promise.resolve(response);
    } catch (error) {
      setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setWaitingAuthentication(true);
      const response = await FirebaseAuthApi.signIn(email, password);
      return Promise.resolve(response);
    } catch (error) {
      setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const signInWithFacebook = async (): Promise<UserCredential | null> => {
    try {
      // setWaitingAuthentication(true);

      await facebookInit();

      const { permissions } = FacebookConfig;
      const fbResponse = await Facebook.logInWithReadPermissionsAsync({ permissions });

      if (fbResponse.type === 'cancel') {
        return Promise.resolve(null);
      }

      const token = fbResponse.type === 'success' && fbResponse.token ? fbResponse.token : '';
      if (!token) {
        return Promise.resolve(null);
      }

      const firebaseResponse = await FirebaseAuthApi.signInWithFacebook(token);
      return Promise.resolve(firebaseResponse);
    } catch (error) {
      // setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      setWaitingAuthentication(true);
      await FirebaseAuthApi.signOut();
      return Promise.resolve(true);
    } catch (error) {
      setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const uploadImage = async (uri: string, imageId: string): Promise<UploadTask> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const result = await FirebaseStorageApi.uploadFile(blob, imageId);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getImageDownloadUrl = async (imageId: string): Promise<string> => {
    try {
      const response = await FirebaseStorageApi.getFileDownloadUrl(imageId);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCurrentUserProfile = async (payload: Partial<User>): Promise<void> => {
    try {
      const user = await FirebaseAuthApi.updateCurrentUserProfile(payload);
      if (!user) {
        return;
      }

      setUser(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const initialContext = useMemo<FirebaseContext>(
    () => ({
      app: firebase.app(),
      user,
      authenticated,
      waitingAuthentication,
      signUp,
      signIn,
      signInWithFacebook,
      signOut,
      uploadImage,
      getImageDownloadUrl,
      updateCurrentUserProfile,
    }),
    [user, authenticated, waitingAuthentication],
  );

  return <FirebaseContext.Provider value={initialContext}>{children}</FirebaseContext.Provider>;
};
