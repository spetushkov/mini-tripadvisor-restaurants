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
    <View style={styles.view}>
      <AccountInfo user={user} />
      <AccountOptions user={user} />
      <Button
        style={[styles.button, styles.buttonSignOut]}
        bordered
        full={true}
        onPress={onSignOut}
      >
        <Text style={[styles.buttonText, styles.buttonSignOutText]}>Sign Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  buttonSignOut: {
    backgroundColor: Theme.color.white,
    borderColor: Theme.color.greyLight2,
  },
  buttonSignOutText: {
    color: Theme.color.green,
  },
  view: {
    minHeight: '100%',
    backgroundColor: '#f2f2f2',
  },
});
