import Constants from 'expo-constants';
import React from 'react';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { Firebase } from '../../firebase/Firebase';
import { Screens } from '../../pages/Screens';

type Props = {
  children: React.ReactNode;
};

export const AppConfig = ({ children }: Props): JSX.Element => {
  Screens();
  Firebase();

  const { REACT_NATIVE_ENV_NAME } = Constants.manifest.extra;
  console.log(`App: started in mode ${REACT_NATIVE_ENV_NAME}`);

  return <>{children}</>;
};
