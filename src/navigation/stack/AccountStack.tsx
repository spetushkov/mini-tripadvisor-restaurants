import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Account } from '../../screens/account/Account';
import { SignIn } from '../../screens/account/SignIn';
import { SignUp } from '../../screens/account/SignUp';
import { AccountStackRoutes } from '../routes/NavigationRoutes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AccountStackRoutes.account}
        component={Account}
        options={{
          title: 'Account',
        }}
      />
      <Stack.Screen
        name={AccountStackRoutes.signin}
        component={SignIn}
        options={{
          title: 'Sign in',
        }}
      />
      <Stack.Screen
        name={AccountStackRoutes.signup}
        component={SignUp}
        options={{
          title: 'Sign up',
        }}
      />
    </Stack.Navigator>
  );
};

export const AccountStack = (): JSX.Element => {
  return <StackNavigator />;
};
