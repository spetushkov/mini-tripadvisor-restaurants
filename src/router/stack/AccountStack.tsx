import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Account } from '../../screens/account/Account';
import { SignIn } from '../../screens/account/SignIn';
import { SignUp } from '../../screens/account/SignUp';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.AccountStack.account}
        component={Account}
        options={{
          title: 'Account',
        }}
      />
      <Stack.Screen
        name={Route.AccountStack.signin}
        component={SignIn}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name={Route.AccountStack.signup}
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
