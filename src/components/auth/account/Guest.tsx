import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Route } from '../../../router/Route';
import { Theme } from '../../../theme/Theme';
import { AuthStyles } from '../AuthStyles';

export const Guest = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <Icon type='FontAwesome5' name='user' style={styles.icon} />
      <Text style={styles.title}>Check your profile</Text>
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
    marginTop: 40,
    marginHorizontal: 40,
  },
  icon: {
    marginBottom: 40,
    color: Theme.color.green,
    fontSize: 140,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});
