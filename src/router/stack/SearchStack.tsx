import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SearchScreen } from '../../screens/SearchScreen';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.SearchStack.search}
        component={SearchScreen}
        options={{
          title: 'Search',
        }}
      />
    </Stack.Navigator>
  );
};

export const SearchStack = (): JSX.Element => {
  return <StackNavigator />;
};
