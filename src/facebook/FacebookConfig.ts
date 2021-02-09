import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';

export const FacebookConfig = {
  appId: Constants.manifest.extra.REACT_NATIVE_FACEBOOK_APP_ID,
  appName: Constants.manifest.extra.REACT_NATIVE_FACEBOOK_APP_NAME,
  permissions: ['public_profile', 'email'],
};

export const init = async (): Promise<void> => {
  try {
    const { appId, appName } = FacebookConfig;
    await Facebook.initializeAsync({ appId, appName });
  } catch (error) {
    return Promise.reject(error);
  }
};
