import {useEffect, useState} from 'react';

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

export function GA4Events({
  ga4TagId,
  register,
  subscribe,
  debug = false,
}: {
  ga4TagId: string;
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  debug?: boolean;
}) {
  let ready: () => void = () => {};
  if (register) {
    ready = register('GA4Events').ready;
  }

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!ready || !subscribe) {
      console.error(
        "GA4Events: error: `register` and `subscribe` must be passed in from Hydrogen's useAnalytics hook.",
      );
      return;
    }
    if (!scriptLoaded) return;
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

  useEffect(() => {
    if (!ga4TagId) {
      console.error('GA4Events: error: `ga4TagId` must be passed in');
    }
  }, [ga4TagId]);

  return (
    <>
      <script
        id="gtag-script"
        type="text/javascript"
        async
        onLoad={() => setScriptLoaded(true)}
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4TagId}`}
      />

      <script
        id="gtag-config"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4TagId}');
            `,
        }}
      />
    </>
  );
}
