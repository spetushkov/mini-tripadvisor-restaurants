import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RestaurantsScreen } from '../../screens/RestaurantsScreen';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.RestaurantsStack.restaurants}
        component={RestaurantsScreen}
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
