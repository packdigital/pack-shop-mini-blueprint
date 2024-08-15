import {useEffect, useMemo, useState} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import type {CartReturn} from '@shopify/hydrogen';

export function useCartForAnalytics() {
  const cart = useCart();

  const cartIsIdle = cart.status === 'idle';

  const [cartReady, setCartReady] = useState(cartIsIdle);

  const cartForAnalytics = useMemo(() => {
    return {
      id: 'uninitialized',
      updatedAt: 'uninitialized',
      ...cart,
      lines: {nodes: cart.lines},
    } as CartReturn;
  }, [cart]);

  useEffect(() => {
    if (cartIsIdle) setCartReady(true);
    // uninitialized cart never becomes idle so instead set cart ready after 1 sec
    else setTimeout(() => setCartReady(true), 1000);
  }, [cartIsIdle]);

  return cartReady ? cartForAnalytics : null;
}
