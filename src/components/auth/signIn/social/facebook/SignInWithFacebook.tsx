import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import { useFirebase } from '../../../../../firebase/useFirebase';
import { useToast } from '../../../../app/useToast';

export const SignInWithFacebook = (): JSX.Element => {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { signInWithFacebook } = useFirebase();
  const [loading, setLoading] = useState(false);

  const onsSignInWithFacebook = async () => {
    try {
      setLoading(true);
      const result = await signInWithFacebook();
      setLoading(false);

      if (result) {
        console.log('result', result);
        // navigation.reset({ index: 0, routes: [{ name: Route.AccountStack.account }] });
      }
    } catch (error) {
      setLoading(false);
      showToast(error.message);
    }
  };

  return (
    <SocialIcon
      title='Sign In using Facebook'
      button={true}
      type='facebook'
      onPress={onsSignInWithFacebook}
    />
  );
};
