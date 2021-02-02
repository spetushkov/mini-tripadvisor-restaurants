import { useNavigation } from '@react-navigation/native';
import { Button, Icon, View } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Route } from '../../router/Route';
import { Theme } from '../../theme/Theme';
import { AuthStyles } from './AuthStyles';

export const Guest = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <Icon type='FontAwesome5' name='user' style={styles.icon} />
      <Text style={styles.title}>Check your profile</Text>
      <Text style={styles.description}>
        How would you describe your best restaurant? Search and view the best restaurants in a
        simple way, vote which one you liked the most and comment on how your experience has been.
      </Text>
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
    marginLeft: 40,
    marginRight: 40,
  },
  icon: {
    marginBottom: 40,
    color: Theme.color.green,
    fontSize: 140,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
