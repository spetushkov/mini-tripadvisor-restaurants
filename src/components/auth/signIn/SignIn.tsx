import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { Form, Text, View } from 'native-base';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFirebase } from '../../../firebase/useFirebase';
import { Route } from '../../../router/Route';
import { Theme } from '../../../theme/Theme';
import { Divider } from '../../utility/content/Divider';
import { FormButton } from '../../utility/form/FormButton';
import { FormItem } from '../../utility/form/FormItem';
import { getFormItemProps, getFormState, validateForm } from '../../utility/form/FormUtils';
import { useToast } from '../../utility/toast/useToast';
import { AuthStyles } from '../AuthStyles';
import { SignInFormEntity } from './SignInFormEntity';
import { SignInWithFacebook } from './social/facebook/SignInWithFacebook';

export const SignIn = (): JSX.Element | null => {
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
      FormActions.setSubmitting(false);

      if (result) {
        navigation.reset({ index: 0, routes: [{ name: Route.AccountStack.account }] });
      }
    } catch (error) {
      setLoading(false);
      FormActions.setSubmitting(false);
      showToast(error.message);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialFormState}
        validate={(values) => validateForm(values, SignInFormEntity)}
        onSubmit={onSubmitForm}
      >
        {(form) => (
          <Form style={styles.authForm}>
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
            <Text style={styles.text}>
              {"Don't have an account? "}
              <Text
                style={styles.action}
                onPress={() => navigation.navigate(Route.AccountStack.signup)}
              >
                Sign Up
              </Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.action} onPress={() => console.log('Forgot password')}>
                Forgot password?
              </Text>
            </Text>
          </Form>
        )}
      </Formik>
      <Divider style={styles.divider} />
      <View>
        <SignInWithFacebook />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  divider: {
    borderBottomColor: Theme.color.grey,
    width: '100%',
    margin: 20,
  },
});
