import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFirebase } from '../../../firebase/useFirebase';
import { useToast } from '../../app/useToast';
import { AuthStyles } from '../AuthStyles';

export const Authenticated = (): JSX.Element => {
  const { signOut } = useFirebase();
  const { showToast } = useToast();

  const onSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      showToast(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Button style={styles.button} block={true} onPress={onSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
