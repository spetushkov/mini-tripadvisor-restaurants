import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Restaurants } from '../../screens/Restaurants';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.RestaurantsStack.restaurants}
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
