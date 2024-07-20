import {useCallback, useEffect, useRef, useState} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import {useLocation} from '@remix-run/react';
import type {CurrencyCode} from '@shopify/hydrogen-react/storefront-api-types';

import {mapCartLine} from './utils';
import type {UserProperties} from './useDataLayerInit';

const isElevar =
  typeof document !== 'undefined' && !!window.ENV?.PUBLIC_ELEVAR_SIGNING_KEY;

export function useDataLayerCustomer({
  cartReady,
  currencyCode,
  handleDataLayerEvent,
  userProperties,
}: {
  cartReady: boolean;
  currencyCode?: CurrencyCode | undefined;
  handleDataLayerEvent: (event: Record<string, any>) => void;
  userProperties: UserProperties;
}) {
  const pathnameRef = useRef<string | undefined>(undefined);
  const {cost, lines = []} = useCart();
  const location = useLocation();
  const pathname = location.pathname;

  const [userDataEventTriggered, setUserDataEventTriggered] = useState(false);

  const userDataEvent = useCallback(
    ({
      currencyCode: passedCurrencyCode,
      userProperties: _userProperties,
    }: {
      currencyCode?: CurrencyCode | undefined;
      userProperties: UserProperties;
    }) => {
      const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
      const windowPathname = window.location.pathname;
      const list =
        (windowPathname.startsWith('/collections') && windowPathname) ||
        (previousPath?.startsWith('/collections') && previousPath) ||
        '';
      const event = {
        event: 'dl_user_data',
        ...(isElevar ? {cart_total: cost?.totalAmount?.amount || '0.0'} : null),
        user_properties: _userProperties,
        ecommerce: {
          currencyCode:
            passedCurrencyCode ||
            cost?.totalAmount?.currencyCode ||
            currencyCode,
          cart_contents: {
            products: lines?.map(mapCartLine(list)) || [],
          },
          ...(isElevar
            ? null
            : {cart_total: cost?.totalAmount?.amount || '0.0'}),
        },
      };
      handleDataLayerEvent(event);
      setUserDataEventTriggered(true);
    },
    [cartReady, currencyCode],
  );

  // Trigger 'user_data' event on path change after base data is ready,
  // excluding account and paths that trigger event directly before their respective events
  useEffect(() => {
    if (!userProperties || !cartReady || pathname === pathnameRef.current)
      return undefined;

    userDataEvent({userProperties});

    pathnameRef.current = pathname;
    return () => {
      pathnameRef.current = undefined;
    };
  }, [cartReady, pathname, !!userProperties]);

  return {userDataEvent, userDataEventTriggered};
}
