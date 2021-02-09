import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
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
    color: Theme.color.brandInfo,
    fontSize: 14,
    marginTop: 10,
  },
});
