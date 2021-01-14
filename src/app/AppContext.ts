import Constants from 'expo-constants';
import { Logger } from '../log/Logger';

export const AppContext = (): void => {
  const { REACT_NATIVE_ENV_NAME } = Constants.manifest.extra;
  Logger.log(`App: started in mode ${REACT_NATIVE_ENV_NAME}`);
};
