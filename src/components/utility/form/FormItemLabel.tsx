import { Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/Theme';

type Props = {
  text: string;
};

export const FormItemLabel = (props: Props): JSX.Element => {
  const { text } = props;

  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Theme.color.greyDark,
    marginLeft: 6,
    fontSize: 17,
  },
});
