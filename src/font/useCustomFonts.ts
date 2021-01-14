import { useFonts } from 'expo-font';

export const Fonts = {
  'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
};

type Return = {
  fontsLoading: boolean;
  fontsError: Error | null;
};

export const useCustomFonts = (): Return => {
  const [fontsLoaded, fontsError] = useFonts(Fonts);

  return {
    fontsLoading: !fontsLoaded,
    fontsError,
  };
};
