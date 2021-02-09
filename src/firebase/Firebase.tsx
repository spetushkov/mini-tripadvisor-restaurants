import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { FacebookConfig, init as facebookInit } from '../facebook/FacebookConfig';
import { App, FirebaseApi, User, UserCredential } from './FirebaseApi';
import { init as firebaseInit } from './FirebaseConfig';

type Props = {
  children: React.ReactNode;
};

export type FirebaseContext = {
  app: App | null;
  user: User | null;
  isAuthenticated: boolean;
  waitingAuthentication: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithFacebook: () => Promise<UserCredential | null>;
  signOut: () => Promise<boolean>;
};

firebaseInit();

export const FirebaseContext = createContext({} as FirebaseContext);

export const Firebase = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [waitingAuthentication, setWaitingAuthentication] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setWaitingAuthentication(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setWaitingAuthentication(true);
      const response = await FirebaseApi.signUp(email, password);
      return Promise.resolve(response);
    } catch (error) {
      setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setWaitingAuthentication(true);
      const response = await FirebaseApi.signIn(email, password);
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

      const firebaseResponse = await FirebaseApi.signInWithFacebook(token);
      return Promise.resolve(firebaseResponse);
    } catch (error) {
      // setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      setWaitingAuthentication(true);
      await FirebaseApi.signOut();
      return Promise.resolve(true);
    } catch (error) {
      setWaitingAuthentication(false);
      return Promise.reject(error);
    }
  };

  const initialContext = useMemo<FirebaseContext>(
    () => ({
      app: firebase.app(),
      user,
      isAuthenticated,
      waitingAuthentication,
      signUp,
      signIn,
      signInWithFacebook,
      signOut,
    }),
    [user, isAuthenticated, waitingAuthentication],
  );

  return <FirebaseContext.Provider value={initialContext}>{children}</FirebaseContext.Provider>;
};
