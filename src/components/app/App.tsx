import { AppLoading } from 'expo';
import React from 'react';
import { useCustomFonts } from '../../font/useCustomFonts';
import { Outline } from '../outline/Outline';
import { ExceptionHandler } from '../utility/exception/ExceptionHandler';
import { AppConfig } from './AppConfig';

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
      <AppConfig>
        <Outline />
      </AppConfig>
    </ExceptionHandler>
  );
};
