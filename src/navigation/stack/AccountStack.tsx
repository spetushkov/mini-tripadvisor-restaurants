import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Account } from '../../pages/auth/Account';
import { SignIn } from '../../pages/auth/SignIn';
import { SignUp } from '../../pages/auth/SignUp';
import { Routes } from '../route/Routes';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.AccountStack.account}
        component={Account}
        options={{
          title: 'Account',
        }}
      />
      <Stack.Screen
        name={Routes.AccountStack.signin}
        component={SignIn}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name={Routes.AccountStack.signup}
        component={SignUp}
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack.Navigator>
  );
};

export const AccountStack = (): JSX.Element => {
  return <StackNavigator />;
};
