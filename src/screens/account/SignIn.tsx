import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MyDivider } from '../../components/divider/Divider';
import { UserSignInForm } from '../../components/user/UserSignInForm';
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
        <UserSignInForm toastRef={toastRef} />
        <Toast ref={toastRef} position='top' opacity={0.9} />
      </View>
      <MyDivider style={styles.divider} />
      <Text>Social Login</Text>
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
