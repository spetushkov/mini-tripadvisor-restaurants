import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Favorites } from '../../pages/Favorites';
import { Routes } from '../route/Routes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.FavoritesStack.favorites}
        component={Favorites}
        options={{
          title: 'Favorites',
        }}
      />
    </Stack.Navigator>
  );
};

export const FavoritesStack = (): JSX.Element => {
  return <StackNavigator />;
};
