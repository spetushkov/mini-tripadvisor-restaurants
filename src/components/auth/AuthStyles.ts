import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/Theme';

export const AuthStyles = StyleSheet.create({
  authForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: Theme.color.brandPrimary,
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: Theme.color.brandPrimaryDisabled,
  },
  text: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  action: {
    color: Theme.color.brandPrimary,
  },
});
