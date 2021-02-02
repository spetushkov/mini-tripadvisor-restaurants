import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenStyles } from './ScreenStyles';

type Props = DrawerContentComponentProps;

export const Favorites = (props: Props): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Favorites</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...ScreenStyles,
});
