import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Route } from '../../../router/Route';
import { AuthStyles } from '../AuthStyles';

export const Guest = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <Button
        style={styles.button}
        block={true}
        onPress={() => navigation.navigate(Route.AccountStack.signin)}
      >
        <Text style={styles.buttonText}>View your profile</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  view: {
    marginTop: 20,
    marginHorizontal: 40,
  },
});
