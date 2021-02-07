import React from 'react';
import { ScrollView } from 'react-native';
import { Authenticated } from '../../components/auth/account/Authenticated';
import { Guest } from '../../components/auth/account/Guest';
import { Loader } from '../../components/utility/loader/Loader';
import { useFirebase } from '../../firebase/useFirebase';

export const AccountScreen = (): JSX.Element => {
  const { isAuthenticated, waitingAuthStateChange } = useFirebase();

  if (waitingAuthStateChange) {
    return <Loader isVisible={true} />;
  }

  return <ScrollView>{isAuthenticated ? <Authenticated /> : <Guest />}</ScrollView>;
};
