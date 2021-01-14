import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

type NamedStyles = ViewStyle | TextStyle | ImageStyle;

type Props = {
  style?: NamedStyles;
};

export const MyDivider = (props: Props): JSX.Element => {
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
