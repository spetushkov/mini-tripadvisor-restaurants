import dotenvExpand from 'dotenv-expand';
import dotenvFlow from 'dotenv-flow';

const env = dotenvFlow.config();
dotenvExpand(env);

export default {
  expo: {
    name: 'Topella Eats',
    slug: 'topella-eats',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    extra: {
      REACT_NATIVE_ENV_NAME: process.env.REACT_NATIVE_ENV_NAME,
      REACT_NATIVE_FIREBASE_API_KEY: process.env.REACT_NATIVE_FIREBASE_API_KEY,
      REACT_NATIVE_FIREBASE_AUTH_DOMAIN: process.env.REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
      REACT_NATIVE_FIREBASE_PROJECT_ID: process.env.REACT_NATIVE_FIREBASE_PROJECT_ID,
      REACT_NATIVE_FIREBASE_STORAGE_BUCKET: process.env.REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
      REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID:
        process.env.REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
      REACT_NATIVE_FIREBASE_APP_ID: process.env.REACT_NATIVE_FIREBASE_APP_ID,
    },
  },
};
