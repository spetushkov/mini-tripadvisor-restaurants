import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input, Item } from 'native-base';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import validate from 'validate.js';
import { useFirebase } from '../../firebase/useFirebase';
import { Route } from '../../router/Route';
import { Theme } from '../../theme/Theme';
import { ObjectUtils } from '../../utils/ObjectUtils';
import { useApp } from '../app/useApp';
import { Divider } from '../utility/content/Divider';
import { FormConstraints } from '../utility/form/FormConstraints';
import { FormControlError } from '../utility/form/FormControlError';
import { FormValidationState } from '../utility/form/FormValidationState';
import { Loader } from '../utility/loader/Loader';
import { AuthStyles } from './AuthStyles';

type FormState = {
  email: string;
  password: string;
};

const initialFormState: FormState = {
  email: '',
  password: '',
};

const formConstraints: FormConstraints<FormState> = {
  email: {
    email: {
      message: '^a valid email format required',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: '^at least 6 characters required',
    },
  },
};

const initialFormValidationState: FormValidationState<FormState> = {};

export const SignInForm = (): JSX.Element | null => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [formValidation, setFormValidation] = useState(initialFormValidationState);
  const [loading, setLoading] = useState(false);
  const { signIn } = useFirebase();
  const { showToast } = useApp();

  const onSubmitForm = async () => {
    const formValidation = validateForm();
    if (formValidation && !ObjectUtils.isEmpty(formValidation)) {
      setFormValidation(formValidation);
      return;
    }

    if (!form) {
      return;
    }

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
  };

  const validateForm = (): FormValidationState<FormState> => {
    setFormValidation(initialFormValidationState);
    let formValidation: FormValidationState<FormState> = validate({ ...form }, formConstraints);

    if (!formValidation) {
      formValidation = {};
      const { password } = form;

      if (validate.isEmpty(password)) {
        formValidation = {
          ...formValidation,
          password: ['is required'],
        };
      }
    }

    return formValidation;
  };

  const onChangeFromInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    inputName: keyof FormState,
  ) => {
    setForm({
      ...form,
      [inputName]: e.nativeEvent.text,
    });
  };

  return (
    <View>
      <View style={styles.emailPasswordAuth}>
        <Loader isVisible={loading} text='sign in' />
        <View>
          <Item style={styles.item} error={!!formValidation.email}>
            <Input
              placeholder='Email'
              onChange={(e) => onChangeFromInput(e, 'email')}
              autoCapitalize='none'
            />
            <Icon type='MaterialCommunityIcons' name='at' style={styles.icon} />
          </Item>
          <FormControlError value={formValidation.email} />
        </View>
        <View>
          <Item style={styles.item} error={!!formValidation.password}>
            <Input
              placeholder='Password'
              secureTextEntry={!showPassword}
              onChange={(e) => onChangeFromInput(e, 'password')}
            />
            <Icon
              type='MaterialCommunityIcons'
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </Item>
          <FormControlError value={formValidation.password} />
        </View>
        <Button style={styles.button} block={true} onPress={onSubmitForm}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Button>
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
      </View>
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
