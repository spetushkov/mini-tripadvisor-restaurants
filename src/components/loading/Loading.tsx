import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Theme } from '../../theme/Theme';

type Props = {
  isVisible: boolean;
  text?: string;
};

export const Loading = (props: Props): JSX.Element => {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size='large' color={Theme.color.green} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: '#fff',
    borderColor: Theme.color.green,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Theme.color.green,
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
