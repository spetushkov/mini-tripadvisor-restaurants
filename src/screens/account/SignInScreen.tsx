import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Auth } from '../../components/auth/Auth';
import { SignIn } from '../../components/auth/signIn/SignIn';

export const SignInScreen = (): JSX.Element => {
  return (
    <ScrollView>
      <Auth>
        <SignIn />
      </Auth>
    </ScrollView>
  );
};
