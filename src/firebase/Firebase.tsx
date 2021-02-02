import firebase from 'firebase';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { App, FirebaseApi, User, UserCredential } from './FirebaseApi';
import { FirebaseConfig } from './FirebaseConfig';

type Props = {
  children: React.ReactNode;
};

export type FirebaseContext = {
  app: App | null;
  user: User | null;
  isAuthenticated: boolean;
  waitingAuthStateChange: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<boolean>;
};

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}
console.log(`Firebase: started project ${FirebaseConfig.projectId}`);

export const FirebaseContext = createContext({} as FirebaseContext);

export const Firebase = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [waitingAuthStateChange, setWaitingAuthStateChange] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setWaitingAuthStateChange(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setWaitingAuthStateChange(true);
      const response = await FirebaseApi.signUp(email, password);
      return Promise.resolve(response);
    } catch (error) {
      setWaitingAuthStateChange(false);
      return Promise.reject(error);
    }
  };

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      setWaitingAuthStateChange(true);
      const response = await FirebaseApi.signIn(email, password);
      return Promise.resolve(response);
    } catch (error) {
      setWaitingAuthStateChange(false);
      return Promise.reject(error);
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      setWaitingAuthStateChange(true);
      await FirebaseApi.signOut();
      return Promise.resolve(true);
    } catch (error) {
      setWaitingAuthStateChange(false);
      return Promise.reject(error);
    }
  };

  const initialContext = useMemo<FirebaseContext>(
    () => ({
      app: firebase.app(),
      user,
      isAuthenticated,
      waitingAuthStateChange,
      signUp,
      signIn,
      signOut,
    }),
    [user, isAuthenticated, waitingAuthStateChange],
  );

  return <FirebaseContext.Provider value={initialContext}>{children}</FirebaseContext.Provider>;
};
