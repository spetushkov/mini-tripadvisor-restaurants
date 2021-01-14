import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Search } from '../../screens/Search';
import { SearchStackRoutes } from '../routes/NavigationRoutes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SearchStackRoutes.search}
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
