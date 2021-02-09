import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { Form, Text } from 'native-base';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFirebase } from '../../../firebase/useFirebase';
import { Route } from '../../../router/Route';
import { Theme } from '../../../theme/Theme';
import { FormButton } from '../../utility/form/FormButton';
import { FormItem } from '../../utility/form/FormItem';
import { getFormItemProps, getFormState, validateForm } from '../../utility/form/FormUtils';
import { useToast } from '../../utility/toast/useToast';
import { AuthStyles } from '../AuthStyles';
import { SignUpFormEntity } from './SignUpFormEntity';

export const SignUp = (): JSX.Element => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useFirebase();
  const { showToast } = useToast();

  const initialFormState = useMemo(() => new SignUpFormEntity(), []);

  const onSubmitForm = async (
    values: SignUpFormEntity,
    FormActions: FormikHelpers<SignUpFormEntity>,
  ): Promise<void> => {
    const form = getFormState(values, SignUpFormEntity);
    try {
      setLoading(true);
      const result = await signUp(form.email, form.password);
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
    <Formik
      initialValues={initialFormState}
      validate={(values) => validateForm(values, SignUpFormEntity)}
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
          <FormItem
            {...getFormItemProps(form, 'confirmPassword')}
            icon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            placeholder='Confirm password'
            secureTextEntry={!showConfirmPassword}
          />
          <Text style={styles.info}>
            {'By signing up, you agree to our '}
            <Text style={styles.action} onPress={() => console.log('Terms of Service')}>
              Terms of Service
            </Text>
            {' and '}
            <Text style={styles.action} onPress={() => console.log('Privacy Policy')}>
              Privacy Policy
            </Text>
          </Text>
          <FormButton
            text='Sign Up'
            onPress={form.handleSubmit}
            style={styles.button}
            loading={loading}
            disabled={loading}
            disabledStyle={styles.buttonDisabled}
          />
          <Text style={styles.text}>
            {'Already have an account? '}
            <Text
              style={styles.action}
              onPress={() => navigation.navigate(Route.AccountStack.signin)}
            >
              Sign In
            </Text>
          </Text>
        </Form>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
  info: {
    color: Theme.color.brandInfo,
  },
});
