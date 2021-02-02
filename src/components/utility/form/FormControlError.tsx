import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  value: string[] | undefined;
};

export const FormControlError = (props: Props): JSX.Element | null => {
  const { value } = props;

  if (!value) {
    return null;
  }

  return <Text style={styles.text}>{value}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});
