import {useEffect} from 'react';

import {PackEventName} from '../constants';

import {
  viewPageEvent,
  viewProductEvent,
  viewCartEvent,
  addToCartEvent,
  removeFromCartEvent,
  clickProductItemEvent,
  customerSubscribeEvent,
} from './events';

type Data = Record<string, any>;

export function FueledEvents({
  register,
  subscribe,
  debug = false,
}: {
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  debug?: boolean;
}) {
  let ready: () => void = () => {};
  if (register) {
    ready = register('FueledEvents').ready;
  }

  useEffect(() => {
    if (!ready || !subscribe) {
      console.error(
        "FueledEvents: error: `register` and `subscribe` must be passed in from Hydrogen's useAnalytics hook.",
      );
      return;
    }
    subscribe(PackEventName.PAGE_VIEWED, (data: Data) => {
      viewPageEvent({...data, debug});
    });
    subscribe(PackEventName.PRODUCT_QUICK_SHOP_VIEWED, (data: Data) => {
      viewProductEvent({...data, debug});
    });
    subscribe(PackEventName.CART_VIEWED, (data: Data) => {
      viewCartEvent({...data, debug});
    });
    subscribe(PackEventName.PRODUCT_ADD_TO_CART, (data: Data) => {
      addToCartEvent({...data, debug});
    });
    subscribe(PackEventName.PRODUCT_REMOVED_FROM_CART, (data: Data) => {
      removeFromCartEvent({...data, debug});
    });
    subscribe(PackEventName.PRODUCT_ITEM_CLICKED, (data: Data) => {
      clickProductItemEvent({...data, debug});
    });
    subscribe(PackEventName.CUSTOMER_SUBSCRIBED, (data: Data) => {
      customerSubscribeEvent({...data, debug});
    });
    ready();
  }, [ready, subscribe, debug]);

  return null;
}
