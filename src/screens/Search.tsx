import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = DrawerContentComponentProps;

export const Search = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Search</Text>
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
