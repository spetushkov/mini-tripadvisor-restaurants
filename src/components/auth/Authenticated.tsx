import firebase from 'firebase';
import { Button } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../theme/Theme';
import { Loader } from '../utility/loader/Loader';

export const Authenticated = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const signOutHandler = async () => {
    try {
      setLoading(true);
      setLoadingText('Signing out...');
      await firebase.auth().signOut();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Loader isVisible={loading} text={loadingText} />
      <View style={styles.content}>
        <Text style={styles.text}>UserLogged</Text>
        <Button style={styles.button} block={true} onPress={signOutHandler}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Theme.color.green,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
