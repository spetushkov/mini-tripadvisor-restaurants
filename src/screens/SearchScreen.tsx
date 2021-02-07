import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenStyles } from './ScreenStyles';

type Props = DrawerContentComponentProps;

export const SearchScreen = (props: Props): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.text}>Search</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...ScreenStyles,
});
