import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useFirebase } from './useFirebase';

export const useRequireFirebaseAuthenticate = (): void => {
  const navigation = useNavigation();
  const { isAuthenticated } = useFirebase();

  useEffect(() => {
    // if (!isAuthenticated()) {
    // navigation.navigate(Route.AccountStack.signin);
    // }
  }, [isAuthenticated, navigation]);
};
