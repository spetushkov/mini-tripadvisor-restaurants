import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { Button, Icon, Input, Item } from 'native-base';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import validate from 'validate.js';
import { Route } from '../../router/Route';
import { Theme } from '../../theme/Theme';
import { ObjectUtils } from '../../utils/ObjectUtils';
import { FormControlError } from '../utility/form/FormControlError';
import { Loader } from '../utility/loader/Loader';

type Props = {
  toastRef: React.RefObject<Toast>;
};

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormConstraints = Partial<Record<keyof FormState, Object>>;

type FormValidationState = Partial<Record<keyof FormState, string[]>>;

const formConstraints: FormConstraints = {
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

const initialFormState: FormState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const initialFormValidationState: FormValidationState = {};

export const SignUpForm = (props: Props): JSX.Element => {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [formValidation, setFormValidation] = useState<FormValidationState>(
    initialFormValidationState,
  );
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const submitHandler = async () => {
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
      setLoadingText('Signing up...');
      await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
      navigation.navigate(Route.BottomTab.account);
      setLoading(false);
    } catch (error) {
      toastRef.current?.show(error.message);
      setLoading(false);
    }
  };

  const validateForm = (): FormValidationState => {
    setFormValidation(initialFormValidationState);
    let formValidation: FormValidationState = validate({ ...form }, formConstraints);

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

  const changeInputHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    inputName: keyof FormState,
  ) => {
    setForm({
      ...form,
      [inputName]: e.nativeEvent.text,
    });
  };

  return (
    <View style={styles.container}>
      <Loader isVisible={loading} text={loadingText} />
      <View>
        <Item style={styles.item} error={!!formValidation.email}>
          <Input
            placeholder='Email'
            onChange={(e) => changeInputHandler(e, 'email')}
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
            onChange={(e) => changeInputHandler(e, 'password')}
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
            onChange={(e) => changeInputHandler(e, 'confirmPassword')}
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
      <Button style={styles.button} block={true} onPress={submitHandler}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
      <Text style={styles.textAccount}>
        Already have an account?{' '}
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
  container: {
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