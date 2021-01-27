import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Restaurants } from '../../pages/Restaurants';
import { Routes } from '../route/Routes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.RestaurantsStack.restaurants}
        component={Restaurants}
        options={{
          title: 'Restaurants',
        }}
      />
    </Stack.Navigator>
  );
};

export const RestaurantsStack = (): JSX.Element => {
  return <StackNavigator />;
};
