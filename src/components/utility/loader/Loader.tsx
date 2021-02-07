import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Theme } from '../../../theme/Theme';

type Props = {
  isVisible: boolean;
  text?: string;
};

export const Loader = (props: Props): JSX.Element => {
  const { isVisible, text } = props;

  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size='large' color={Theme.color.black} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: 'transparent',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Theme.color.black,
    marginTop: 10,
  },
});
