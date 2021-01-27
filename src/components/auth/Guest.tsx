import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Routes } from '../../navigation/route/Routes';
import { Theme } from '../../theme/Theme';

export const Guest = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.view}>
      <Icon type='FontAwesome5' name='user' style={styles.icon} />
      <Text style={styles.title}>Check your profile</Text>
      <Text style={styles.description}>
        How would you describe your best restaurant? Search and view the best restaurants in a
        simple way, vote which one you liked the most and comment on how your experience has been.
      </Text>
      <Button
        style={styles.button}
        block={true}
        onPress={() => navigation.navigate(Routes.AccountStack.signin)}
      >
        <Text style={styles.buttonText}>View your profile</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginLeft: 30,
    marginRight: 30,
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
  button: {
    backgroundColor: Theme.color.green,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
