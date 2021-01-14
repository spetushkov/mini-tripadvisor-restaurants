import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import { DrawerNavigation } from './DrawerNavigation';
// import { StackNavigation } from './StackNavigation';
import { BottomTabNavigation } from './BottomTabNavigation';

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};
