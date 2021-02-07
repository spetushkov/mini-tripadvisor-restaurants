import Toast from 'react-native-root-toast';

type ReturnProps = {
  showToast: (message: string) => void;
};

export const useToast = (): ReturnProps => {
  const showToast = (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: 100,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        return;
      },
      onShown: () => {
        return;
      },
      onHide: () => {
        return;
      },
      onHidden: () => {
        return;
      },
    });
  };

  return {
    showToast,
  };
};
