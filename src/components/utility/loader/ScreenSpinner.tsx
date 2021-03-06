import { Spinner, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Theme } from '../../../theme/Theme';

type Props = {
  visible: boolean;
  text?: string;
};

export const ScreenSpinner = (props: Props): JSX.Element => {
  const { visible, text } = props;

  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <Spinner size='large' color={Theme.color.brandDark} />
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
    color: Theme.color.brandDark,
    marginTop: 10,
  },
});
