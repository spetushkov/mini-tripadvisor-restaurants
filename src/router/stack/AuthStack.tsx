import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AccountScreen } from '../../screens/account/AccountScreen';
import { SignInScreen } from '../../screens/account/SignInScreen';
import { SignUpScreen } from '../../screens/account/SignUpScreen';
import { Route } from '../Route';

const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.AccountStack.account}
        component={AccountScreen}
        options={{
          title: 'Account',
        }}
      />
      <Stack.Screen
        name={Route.AccountStack.signin}
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name={Route.AccountStack.signup}
        component={SignUpScreen}
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
