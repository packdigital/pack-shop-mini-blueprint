import {useMemo} from 'react';
import type {ReactNode} from 'react';

import {useRootLoaderData} from '~/hooks';
import type {Settings} from '~/lib/types';

import {Context} from './useSettingsContext';

export function SettingsProvider({children}: {children: ReactNode}) {
  const {siteSettings} = useRootLoaderData();

  const value = useMemo(
    () => ({
      state: {
        settings: siteSettings?.data?.siteSettings?.settings as Settings,
      },
    }),
    [JSON.stringify(siteSettings?.data?.siteSettings?.settings)],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
