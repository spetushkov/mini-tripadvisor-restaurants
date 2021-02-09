import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/Theme';

type Props = {
  error?: string;
};

export const FormItemError = (props: Props): JSX.Element | null => {
  const { error } = props;

  if (!error) {
    return null;
  }

  const errors = [...error];
  return (
    <View>
      {errors.map((error, index) => (
        <Text key={index} style={styles.text}>
          {error}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.color.brandDanger,
    fontSize: 14,
    marginTop: 10,
  },
});
