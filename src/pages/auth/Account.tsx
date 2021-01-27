import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Authenticated } from '../../components/auth/Authenticated';
import { Guest } from '../../components/auth/Guest';
import { Loader } from '../../components/utility/loader/Loader';

export const Account = (): JSX.Element => {
  const [userLogged, setUserLogged] = useState<boolean | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLogged(true) : setUserLogged(false);
    });
  }, []);

  if (userLogged === null) {
    return <Loader isVisible={true} text='Loading...' />;
  }

  return userLogged ? <Authenticated /> : <Guest />;
};
