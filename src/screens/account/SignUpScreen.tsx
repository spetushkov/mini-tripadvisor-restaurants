import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Auth } from '../../components/auth/Auth';
import { SignUp } from '../../components/auth/signUp/SignUp';

export const SignUpScreen = (): JSX.Element => {
  return (
    <ScrollView>
      <Auth>
        <SignUp />
      </Auth>
    </ScrollView>
  );
};
