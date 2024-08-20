import {useMemo} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import type {CartReturn} from '@shopify/hydrogen';

import {useGlobal} from '~/hooks';

export function useCartForAnalytics() {
  const cart = useCart();
  const {cartIsReady} = useGlobal();

  const cartForAnalytics = useMemo(() => {
    return {
      id: 'uninitialized',
      updatedAt: 'uninitialized',
      ...cart,
      lines: {nodes: cart.lines},
    } as CartReturn;
  }, [cart]);

  return cartIsReady ? cartForAnalytics : null;
}
