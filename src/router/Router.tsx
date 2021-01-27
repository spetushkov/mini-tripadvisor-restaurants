import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Router = ({ children }: Props): JSX.Element => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
