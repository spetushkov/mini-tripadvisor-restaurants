import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loading/Loading';
import { UserGuest } from '../../components/user/UserGuest';
import { UserLogged } from '../../components/user/UserLogged';

export const Account = (): JSX.Element => {
  const [userLogged, setUserLogged] = useState<boolean | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLogged(true) : setUserLogged(false);
    });
  }, []);

  if (userLogged === null) {
    return <Loading isVisible={true} text='Loading...' />;
  }

  return userLogged ? <UserLogged /> : <UserGuest />;
};
