import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Account } from '../../components/account/Account';
import { useFirebase } from '../../firebase/useFirebase';
import { Route } from '../../router/Route';

export const AccountScreen = (): JSX.Element | null => {
  const navigation = useNavigation();
  const { authenticated: isAuthenticated, waitingAuthentication } = useFirebase();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !waitingAuthentication && !isAuthenticated) {
      navigation.reset({ index: 0, routes: [{ name: Route.AccountStack.signin }] });
    }
  }, [isFocused, waitingAuthentication, isAuthenticated, navigation]);

  if (waitingAuthentication || (isFocused && !isAuthenticated)) {
    return null;
  }

  return (
    <ScrollView>
      <Account />
    </ScrollView>
  );
};
