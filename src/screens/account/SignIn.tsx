import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthForm } from '../../components/auth/AuthForm';
import { SignInForm } from '../../components/auth/signIn/SignInForm';
import { ScreenStyles } from '../ScreenStyles';

export const SignIn = (): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <AuthForm>
        <SignInForm />
      </AuthForm>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...ScreenStyles,
});
