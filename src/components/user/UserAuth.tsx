import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const UserAuth = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>UserAuth</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
