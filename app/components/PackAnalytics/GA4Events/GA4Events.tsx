import {useEffect, useState} from 'react';

import {PackEventName} from '../constants';

import {
  viewPageEvent,
  viewProductEvent,
  viewCartEvent,
  addToCartEvent,
  removeFromCartEvent,
  clickProductItemEvent,
  customerEvent,
  customerSubscribeEvent,
  ANALYTICS_NAME,
} from './events';

type Data = Record<string, any>;

export function GA4Events({
  ga4TagId,
  register,
  subscribe,
  customer,
  debug = false,
}: {
  ga4TagId: string;
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  customer?: Record<string, any> | null;
  debug?: boolean;
}) {
  let ready: (() => void) | undefined = undefined;
  if (register) {
    ready = register(ANALYTICS_NAME).ready;
  }

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!ready || !subscribe) {
      console.error(
        `${ANALYTICS_NAME}: ❌ error: \`register\` and \`subscribe\` must be passed in from Hydrogen's useAnalytics hook.`,
      );
      return;
    }
    /* register analytics events only until script is ready */
    if (!scriptLoaded) return;
    subscribe(PackEventName.PAGE_VIEWED, (data: Data) => {
      viewPageEvent({...data, customer, debug});
    });
    subscribe(PackEventName.PRODUCT_QUICK_SHOP_VIEWED, (data: Data) => {
      viewProductEvent({...data, customer, debug});
    });
    subscribe(PackEventName.CART_VIEWED, (data: Data) => {
      viewCartEvent({...data, customer, debug});
    });
    subscribe(PackEventName.PRODUCT_ITEM_CLICKED, (data: Data) => {
      clickProductItemEvent({...data, customer, debug});
    });
    subscribe(PackEventName.PRODUCT_ADD_TO_CART, (data: Data) => {
      addToCartEvent({...data, customer, debug});
    });
    subscribe(PackEventName.PRODUCT_REMOVED_FROM_CART, (data: Data) => {
      removeFromCartEvent({...data, customer, debug});
    });
    subscribe(PackEventName.CUSTOMER, (data: Data) => {
      customerEvent({...data, debug});
    });
    subscribe(PackEventName.CUSTOMER_SUBSCRIBED, (data: Data) => {
      customerSubscribeEvent({...data, debug});
    });
    ready();
  }, [ready, subscribe, customer?.id, debug]);

  useEffect(() => {
    if (!ga4TagId) {
      console.error(
        `${ANALYTICS_NAME}: ❌ error: \`ga4TagId\` must be passed in.`,
      );
    }
  }, [ga4TagId]);

  useEffect(() => {
    if (!customer || !ga4TagId) return;
    if (window.gtag) {
      window.gtag('config', `${ga4TagId}`, {
        user_id: customer.id?.split('/').pop() || '',
      });
    }
  }, [customer?.id, ga4TagId]);

  return ga4TagId ? (
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
  ) : null;
}
