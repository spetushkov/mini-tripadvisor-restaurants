import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Search } from '../../pages/Search';
import { Routes } from '../route/Routes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.SearchStack.search}
        component={Search}
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
