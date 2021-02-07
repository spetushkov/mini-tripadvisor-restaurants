import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthForm } from '../../components/auth/AuthForm';
import { SignUpForm } from '../../components/auth/signUp/SignUpForm';
import { ScreenStyles } from '../ScreenStyles';

export const SignUp = (): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <AuthForm>
        <SignUpForm />
      </AuthForm>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...ScreenStyles,
});
