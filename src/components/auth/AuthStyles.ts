import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/Theme';

export const AuthStyles = StyleSheet.create({
  emailPasswordAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  item: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: Theme.color.brandPrimary,
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: Theme.color.brandPrimaryDisabled,
  },
  buttonText: {
    color: Theme.color.brandLight,
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    color: Theme.color.grey,
  },
  textAccount: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  buttonAccount: {
    color: Theme.color.brandPrimary,
  },
});
