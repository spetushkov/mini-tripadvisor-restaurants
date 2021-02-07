import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TopRestaurantsScreen } from '../../screens/TopRestaurantsScreen';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.TopRestaurantsStack.topRestaurants}
        component={TopRestaurantsScreen}
        options={{
          title: 'Top Restaurants',
        }}
      />
    </Stack.Navigator>
  );
};

export const TopRestaurantsStack = (): JSX.Element => {
  return <StackNavigator />;
};
