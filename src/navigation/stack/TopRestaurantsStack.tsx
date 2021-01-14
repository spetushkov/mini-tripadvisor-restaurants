import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TopRestaurants } from '../../screens/TopRestaurants';
import { TopRestaurantsStackRoutes } from '../routes/NavigationRoutes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={TopRestaurantsStackRoutes.topRestaurants}
        component={TopRestaurants}
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
