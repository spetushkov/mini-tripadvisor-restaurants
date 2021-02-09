import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFirebase } from '../../../firebase/useFirebase';
import { Theme } from '../../../theme/Theme';
import { useToast } from '../../utility/toast/useToast';
import { AuthStyles } from '../AuthStyles';
import { AccountInfo } from './AccountInfo';
import { AccountOptions } from './AccountOptions';

export const Account = (): JSX.Element => {
  const { user, signOut } = useFirebase();
  const { showToast } = useToast();

  const onSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      showToast(error.message);
    }
  };

  return (
    <View>
      <AccountInfo user={user} />
      <AccountOptions user={user} />
      <Button
        style={[styles.button, styles.buttonSignOut]}
        bordered
        full={true}
        onPress={onSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  buttonSignOut: {
    backgroundColor: Theme.color.brandLight,
    borderColor: Theme.color.greyLight,
  },
  buttonText: {
    color: Theme.color.brandPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
