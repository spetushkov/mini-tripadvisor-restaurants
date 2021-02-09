import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text, View } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

type Props = DrawerContentComponentProps;

export const TopRestaurantsScreen = (props: Props): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.text}>Top Restaurants</Text>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
