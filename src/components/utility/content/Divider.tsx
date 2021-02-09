import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NamedStyles } from '../../../types/NamedStyle';

type Props = {
  style?: NamedStyles;
};

export const Divider = (props: Props): JSX.Element => {
  const { style } = props;

  return (
    <View style={styles.container}>
      <View style={{ ...styles.border, ...style }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: 1,
  },
});
