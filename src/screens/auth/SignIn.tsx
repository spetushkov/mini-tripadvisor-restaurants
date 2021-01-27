import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignInForm } from '../../components/auth/SignInForm';
import { MyDivider } from '../../components/utility/content/Divider';
import { Theme } from '../../theme/Theme';

export const SignIn = (): JSX.Element => {
  const toastRef = useRef<Toast>(null);

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../assets/img/logo.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.view}>
        <SignInForm toastRef={toastRef} />
      </View>
      <MyDivider style={styles.divider} />
      <Text>Social Login</Text>
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
  divider: {
    borderBottomColor: Theme.color.green,
    width: '80%',
    margin: 40,
  },
});
