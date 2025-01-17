import {createContext, useContext} from 'react';

import type {SettingsContext} from '~/lib/types';

export const Context = createContext({
  state: {},
} as SettingsContext);

export const useSettingsContext = () => useContext(Context);
