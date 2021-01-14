import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
};

export const NoContent = (props: Props): JSX.Element => {
  const { message } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  message: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'grey',
    marginVertical: 10,
  },
});
