import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import React from 'react';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import { Firebase } from '../../firebase/Firebase';
import { useCustomFonts } from '../../font/useCustomFonts';
import { Router } from '../../router/Router';
import { Anatomy } from '../anatomy/Anatomy';
import { ExceptionHandler } from '../utility/exception/ExceptionHandler';
import { AppContext } from './AppContext';

const { REACT_NATIVE_ENV_NAME } = Constants.manifest.extra;
console.log(`App: started in mode ${REACT_NATIVE_ENV_NAME}`);

export const App = (): JSX.Element => {
  const { fontsLoading, fontsError } = useCustomFonts();

  if (fontsError) {
    throw new Error(fontsError.message);
  }

  if (fontsLoading) {
    return <AppLoading />;
  }

  return (
    <ExceptionHandler>
      <AppContext>
        <Firebase>
          <Router>
            <Anatomy />
          </Router>
        </Firebase>
      </AppContext>
    </ExceptionHandler>
  );
};
