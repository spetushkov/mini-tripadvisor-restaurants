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
import { ObjectUtils } from '../../utils/ObjectUtils';
import { useApp } from '../app/useApp';
import { FormConstraints } from '../utility/form/FormConstraints';
import { FormControlError } from '../utility/form/FormControlError';
import { FormValidationState } from '../utility/form/FormValidationState';
import { Loader } from '../utility/loader/Loader';
import { AuthStyles } from './AuthStyles';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialFormState: FormState = {
  email: '',
  password: '',
  confirmPassword: '',
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
  confirmPassword: {
    length: {
      minimum: 6,
      message: '^at least 6 characters required',
    },
  },
};

const initialFormValidationState: FormValidationState<FormState> = {};

export const SignUpForm = (): JSX.Element => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [formValidation, setFormValidation] = useState(initialFormValidationState);
  const [loading, setLoading] = useState(false);
  const { signUp, isAuthenticated } = useFirebase();
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
      const result = await signUp(form.email, form.password);
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
      const { password, confirmPassword } = form;

      if (validate.isEmpty(password)) {
        formValidation = {
          ...formValidation,
          password: ['is required'],
        };
      }

      if (validate.isEmpty(confirmPassword)) {
        formValidation = {
          ...formValidation,
          confirmPassword: ['is required'],
        };
      }

      if (password && confirmPassword && password !== confirmPassword) {
        formValidation = {
          ...formValidation,
          confirmPassword: ['passwords do not match'],
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
    <View style={styles.emailPasswordAuth}>
      <Loader isVisible={loading} />
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
      <View>
        <Item style={styles.item} error={!!formValidation.confirmPassword}>
          <Input
            placeholder='Confirm password'
            secureTextEntry={!showRepeatPassword}
            onChange={(e) => onChangeFromInput(e, 'confirmPassword')}
          />
          <Icon
            type='MaterialCommunityIcons'
            name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
            style={styles.icon}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        </Item>
        <FormControlError value={formValidation.confirmPassword} />
      </View>
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
      <Button style={styles.button} block={true} onPress={onSubmitForm}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
      <Text style={styles.textAccount}>
        {'Already have an account? '}
        <Text
          style={styles.buttonAccount}
          onPress={() => navigation.navigate(Route.AccountStack.signin)}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AuthStyles,
});
