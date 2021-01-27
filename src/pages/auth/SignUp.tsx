import React, { useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignUpForm } from '../../components/auth/SignUpForm';

export const SignUp = (): JSX.Element => {
  const toastRef = useRef<Toast>(null);

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../assets/img/logo.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.view}>
        <SignUpForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position='top' opacity={0.9} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  view: {
    marginLeft: 40,
    marginRight: 40,
  },
});
