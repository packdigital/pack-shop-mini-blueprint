import {useEffect} from 'react';

import {AnalyticsEvent} from '../constants';

import {
  viewPageEvent,
  viewProductQuickShopEvent,
  viewCartEvent,
  addToCartEvent,
  removeFromCartEvent,
  clickProductItemEvent,
  clickProductVariantEvent,
  customerEvent,
  customerSubscribeEvent,
  ANALYTICS_NAME,
} from './events';

type Data = Record<string, any>;

export function FueledEvents({
  register,
  subscribe,
  customer,
  debug = false,
}: {
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  customer?: Record<string, any> | null;
  debug?: boolean;
}) {
  let ready: (() => void) | undefined = undefined;
  if (register) {
    ready = register(ANALYTICS_NAME).ready;
  }

  useEffect(() => {
    if (!ready || !subscribe) {
      console.error(
        `${ANALYTICS_NAME}: ❌ error: \`register\` and \`subscribe\` must be passed in from Hydrogen's useAnalytics hook.`,
      );
      return;
    }
    subscribe(AnalyticsEvent.PAGE_VIEWED, (data: Data) => {
      viewPageEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.PRODUCT_QUICK_SHOP_VIEWED, (data: Data) => {
      viewProductQuickShopEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.CART_VIEWED, (data: Data) => {
      viewCartEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.PRODUCT_VARIANT_SELECTED, (data: Data) => {
      clickProductVariantEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.PRODUCT_ITEM_CLICKED, (data: Data) => {
      clickProductItemEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.PRODUCT_ADD_TO_CART, (data: Data) => {
      addToCartEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.PRODUCT_REMOVED_FROM_CART, (data: Data) => {
      removeFromCartEvent({...data, customer, debug});
    });
    subscribe(AnalyticsEvent.CUSTOMER, (data: Data) => {
      customerEvent({...data, debug});
    });
    subscribe(AnalyticsEvent.CUSTOMER_SUBSCRIBED, (data: Data) => {
      customerSubscribeEvent({...data, debug});
    });
    ready();
    if (debug) console.log(`${ANALYTICS_NAME}: 🔄 subscriptions are ready.`);
  }, [customer?.id, debug]);

  return null;
}
