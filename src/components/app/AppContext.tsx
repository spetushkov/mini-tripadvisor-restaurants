import React, { createContext, useMemo, useRef } from 'react';
import Toast from 'react-native-easy-toast';

type Props = {
  children: React.ReactNode;
};

export type RootContext = {
  showToast: (message: string, duration?: number) => void;
};

export const RootContext = createContext({} as RootContext);

export const AppContext = ({ children }: Props): JSX.Element => {
  const toast = useRef<Toast>(null);

  const showToast = (message: string, duration = 4000) => {
    toast.current?.show(message, duration);
  };

  const initialContext = useMemo<RootContext>(
    () => ({
      showToast,
    }),
    [],
  );

  return (
    <RootContext.Provider value={initialContext}>
      <>
        {children}
        <Toast ref={toast} position='top' opacity={0.9} />
      </>
    </RootContext.Provider>
  );
};
