import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MyDivider } from '../../components/divider/Divider';
import { UserSignIn } from '../../components/user/UserSignIn';
import { AccountStackRoutes } from '../../navigation/routes/NavigationRoutes';
import { Theme } from '../../theme/Theme';

export const SignIn = (): JSX.Element => {
  const toastRef = useRef<Toast>(null);
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../assets/img/logo.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.view}>
        <UserSignIn toastRef={toastRef} />
        <Text style={styles.textRegister}>
          Do not have an account?{' '}
          <Text
            style={styles.buttonRegister}
            onPress={() => navigation.navigate(AccountStackRoutes.signup)}
          >
            Sign up
          </Text>
        </Text>
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
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonRegister: {
    color: Theme.color.green,
    fontWeight: 'bold',
  },
});
