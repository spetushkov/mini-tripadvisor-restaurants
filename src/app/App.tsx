import { AppLoading } from 'expo';
import React from 'react';
import { AppError } from '../components/exception/AppError';
import { ErrorHandler } from '../components/exception/ErrorHandler';
import { useCustomFonts } from '../font/useCustomFonts';
import { Navigation } from '../navigation/Navigation';
import { AppConfig } from './AppConfig';

AppConfig();

export const App = (): JSX.Element => {
  const { fontsLoading, fontsError } = useCustomFonts();

  if (fontsError) {
    return <AppError error={fontsError} />;
  }

  if (fontsLoading) {
    return <AppLoading />;
  }

  return (
    <ErrorHandler>
      <Navigation />
    </ErrorHandler>
  );
};
