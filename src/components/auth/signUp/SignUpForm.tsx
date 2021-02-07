import { useNavigation } from '@react-navigation/native';
import { Formik, FormikErrors, FormikHelpers } from 'formik';
import { Form, Text } from 'native-base';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFirebase } from '../../../firebase/useFirebase';
import { Route } from '../../../router/Route';
import { useToast } from '../../app/useToast';
import { FormButton } from '../../utility/form/FormButton';
import { FormItem } from '../../utility/form/FormItem';
import { FormUtils } from '../../utility/form/FormUtils';
import { AuthStyles } from '../AuthStyles';
import { SignUpFormEntity } from './SignUpFormEntity';

export const SignUpForm = (): JSX.Element => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useFirebase();
  const { showToast } = useToast();

  const initialFormState = useMemo(() => new SignUpFormEntity(), []);

  const onValidateForm = async (
    values: SignUpFormEntity,
  ): Promise<FormikErrors<SignUpFormEntity>> => {
    try {
      const result = await FormUtils.validate(values, SignUpFormEntity);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const isFormSubmittable = (): boolean => {
    return !loading;
  };

  const onSubmitForm = async (
    values: SignUpFormEntity,
    FormActions: FormikHelpers<SignUpFormEntity>,
  ): Promise<void> => {
    const form = FormUtils.getState(values, SignUpFormEntity);
    try {
      setLoading(true);
      const result = await signUp(form.email, form.password);
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
    <Formik initialValues={initialFormState} validate={onValidateForm} onSubmit={onSubmitForm}>
      {(form) => (
        <Form style={styles.emailPasswordAuth}>
          <FormItem
            value={form.values['email']}
            meta={form.getFieldMeta('email')}
            onChangeText={form.handleChange('email')}
            icon='at'
            instantFeedback={true}
            placeholder='Email'
            autoCapitalize='none'
          />
          <FormItem
            value={form.values['password']}
            meta={form.getFieldMeta('password')}
            onChangeText={form.handleChange('password')}
            icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onIconPress={() => setShowPassword(!showPassword)}
            instantFeedback={true}
            placeholder='Password'
            secureTextEntry={!showPassword}
          />
          <FormItem
            value={form.values['confirmPassword']}
            meta={form.getFieldMeta('confirmPassword')}
            onChangeText={form.handleChange('confirmPassword')}
            icon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            instantFeedback={true}
            placeholder='Confirm password'
            secureTextEntry={!showConfirmPassword}
          />
          <Text style={styles.textAccount}>
            {'By signing up, you agree to our '}
            <Text style={styles.buttonAccount} onPress={() => console.log('agreement')}>
              Terms of Service
            </Text>
            {' and '}
            <Text style={styles.buttonAccount} onPress={() => console.log('agreement')}>
              Privacy Policy
            </Text>
          </Text>
          <FormButton
            text='Sign Up'
            onPress={form.handleSubmit}
            style={styles.button}
            loading={loading}
            disabled={!isFormSubmittable()}
            disabledStyle={styles.buttonDisabled}
          />
          <Text style={styles.textAccount}>
            {'Already have an account? '}
            <Text
              style={styles.buttonAccount}
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
});
