import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Favorites } from '../../pages/Favorites';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.FavoritesStack.favorites}
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
