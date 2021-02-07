import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../../theme/Theme';

type Props = {
  text: string;
};

export const FormItemHelp = (props: Props): JSX.Element => {
  const { text } = props;

  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.color.greyLight,
    fontSize: 14,
    marginTop: 10,
  },
});
