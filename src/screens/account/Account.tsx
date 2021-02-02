import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Authenticated } from '../../components/auth/Authenticated';
import { Guest } from '../../components/auth/Guest';
import { Loader } from '../../components/utility/loader/Loader';
import { useFirebase } from '../../firebase/useFirebase';
import { ScreenStyles } from '../ScreenStyles';

export const Account = (): JSX.Element => {
  const { isAuthenticated, waitingAuthStateChange } = useFirebase();

  if (waitingAuthStateChange) {
    return <Loader isVisible={true} />;
  }

  return (
    <ScrollView style={styles.container}>
      {isAuthenticated ? <Authenticated /> : <Guest />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...ScreenStyles,
});
