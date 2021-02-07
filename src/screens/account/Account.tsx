import { Text, View } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Authenticated } from '../../components/auth/account/Authenticated';
import { Guest } from '../../components/auth/account/Guest';
import { useFirebase } from '../../firebase/useFirebase';
import { ScreenStyles } from '../ScreenStyles';

export const Account = (): JSX.Element => {
  const { isAuthenticated, waitingAuthStateChange } = useFirebase();

  if (waitingAuthStateChange) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
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
