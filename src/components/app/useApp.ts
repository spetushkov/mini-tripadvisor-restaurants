import { useContext } from 'react';
import { RootContext } from './AppContext';

export const useApp = (): RootContext => useContext(RootContext);
