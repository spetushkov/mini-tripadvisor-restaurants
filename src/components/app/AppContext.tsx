import React, { createContext, useMemo } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

type Props = {
  children: React.ReactNode;
};

export type RootContext = {};

export const RootContext = createContext({} as RootContext);

export const AppContext = ({ children }: Props): JSX.Element => {
  const initialContext = useMemo<RootContext>(() => ({}), []);

  return (
    <RootSiblingParent>
      <RootContext.Provider value={initialContext}>{children}</RootContext.Provider>
    </RootSiblingParent>
  );
};
