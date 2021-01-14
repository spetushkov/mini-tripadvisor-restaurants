import 'react-native-gesture-handler';
import 'reflect-metadata';
import { FirebaseApp } from '../firebase/FirebaseApp';
import { Screens } from '../screens/Screens';
import { AppContext } from './AppContext';

export const AppConfig = (): void => {
  AppContext();
  Screens();
  FirebaseApp();
};
