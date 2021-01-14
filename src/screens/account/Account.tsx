import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loading/Loading';
import { UserAuth } from '../../components/user/UserAuth';
import { UserGuest } from '../../components/user/UserGuest';

type AuthState = boolean | null;

export const Account = (): JSX.Element => {
  const [auth, setAuth] = useState<AuthState>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setAuth(true) : setAuth(false);
    });
  }, []);

  if (auth === null) {
    return <Loading isVisible={true} text='Loading...' />;
  }

  return auth ? <UserAuth /> : <UserGuest />;
};
