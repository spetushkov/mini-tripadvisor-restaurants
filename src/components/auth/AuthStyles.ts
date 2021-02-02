import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/Theme';

export const AuthStyles = StyleSheet.create({
  emailPasswordAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  item: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: Theme.color.green,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    color: '#c1c1c1',
  },
  textAccount: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonAccount: {
    color: Theme.color.green,
    fontWeight: 'bold',
  },
});
