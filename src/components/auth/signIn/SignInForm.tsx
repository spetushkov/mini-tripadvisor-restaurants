import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { Form, Text, View } from 'native-base';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFirebase } from '../../../firebase/useFirebase';
import { Route } from '../../../router/Route';
import { Theme } from '../../../theme/Theme';
import { useToast } from '../../app/useToast';
import { Divider } from '../../utility/content/Divider';
import { FormButton } from '../../utility/form/FormButton';
import { FormItem } from '../../utility/form/FormItem';
import { getFormItemProps, getFormState, validateForm } from '../../utility/form/FormUtils';
import { AuthStyles } from '../AuthStyles';
import { SignInFormEntity } from './SignInFormEntity';

export const SignInForm = (): JSX.Element | null => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useFirebase();
  const { showToast } = useToast();

  const initialFormState = useMemo(() => new SignInFormEntity(), []);

  const onSubmitForm = async (
    values: SignInFormEntity,
    FormActions: FormikHelpers<SignInFormEntity>,
  ): Promise<void> => {
    const form = getFormState(values, SignInFormEntity);
    try {
      setLoading(true);
      const result = await signIn(form.email, form.password);
      setLoading(false);
      if (result) {
        navigation.navigate(Route.AccountStack.account);
      }
    } catch (error) {
      setLoading(false);
      showToast(error.message);
    }

    FormActions.setSubmitting(false);
  };

  return (
    <View>
      <Formik
        initialValues={initialFormState}
        validate={(values) => validateForm(values, SignInFormEntity)}
        onSubmit={onSubmitForm}
      >
        {(form) => (
          <Form style={styles.emailPasswordAuth}>
            <FormItem
              {...getFormItemProps(form, 'email')}
              icon='at'
              placeholder='Email'
              autoCapitalize='none'
            />
            <FormItem
              {...getFormItemProps(form, 'password')}
              icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onIconPress={() => setShowPassword(!showPassword)}
              placeholder='Password'
              secureTextEntry={!showPassword}
            />
            <FormButton
              text='Sign In'
              onPress={form.handleSubmit}
              style={styles.button}
              loading={loading}
              disabled={loading}
              disabledStyle={styles.buttonDisabled}
            />
            <Text style={styles.textAccount}>
              {"Don't have an account? "}
              <Text
                style={styles.buttonAccount}
                onPress={() => navigation.navigate(Route.AccountStack.signup)}
              >
                Sign Up
              </Text>
            </Text>
            <Text style={styles.textAccount}>
              <Text style={styles.buttonAccount} onPress={() => console.log('Forgot password')}>
                Forgot password?
              </Text>
            </Text>
          </Form>
        )}
      </Formik>
      <View>
        <Divider style={styles.divider} />
        <Text>Social Login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  divider: {
    borderBottomColor: Theme.color.green,
    width: '80%',
    margin: 40,
  },
});
