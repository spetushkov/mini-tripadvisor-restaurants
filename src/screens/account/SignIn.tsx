import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MyDivider } from '../../components/divider/Divider';
import { AccountStackRoutes } from '../../navigation/routes/NavigationRoutes';
import { Theme } from '../../theme/Theme';

export const SignIn = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Image
        source={require('../../assets/img/logo.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.view}>
        <Text>Sign in</Text>
        <Text style={styles.textRegister}>
          Do not have an account?{' '}
          <Text
            style={styles.buttonRegister}
            onPress={() => navigation.navigate(AccountStackRoutes.signup)}
          >
            Sign up
          </Text>
        </Text>
      </View>
      <MyDivider style={styles.divider} />
      <Text>Social Login</Text>
    </ScrollView>
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
