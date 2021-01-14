import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Favorites } from '../../screens/Favorites';
import { FavoritesStackRoutes } from '../routes/NavigationRoutes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FavoritesStackRoutes.favorites}
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
