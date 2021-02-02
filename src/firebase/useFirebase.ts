import { useContext } from 'react';
import { FirebaseContext } from './Firebase';

export const useFirebase = (): FirebaseContext => useContext(FirebaseContext);
