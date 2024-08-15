import {useEffect, useState} from 'react';

import {PackEventName} from '../constants';

import {viewProductEvent, addToCartEvent, ANALYTICS_NAME} from './events';

type Data = Record<string, any>;

export function MetaPixelEvents({
  metaPixelId,
  register,
  subscribe,
  customer,
  debug = false,
}: {
  metaPixelId: string;
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  customer?: Record<string, any> | null;
  debug?: boolean;
}) {
  let ready: () => void = () => {};
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
    subscribe(PackEventName.PRODUCT_QUICK_SHOP_VIEWED, (data: Data) => {
      viewProductEvent({...data, customer, debug});
    });
    subscribe(PackEventName.PRODUCT_ADD_TO_CART, (data: Data) => {
      addToCartEvent({...data, customer, debug});
    });
    ready();
  }, [scriptLoaded, ready, subscribe, customer?.id, debug]);

  useEffect(() => {
    if (!metaPixelId) {
      console.error(
        `${ANALYTICS_NAME}: ❌ error: \`metaPixelId\` must be passed in.`,
      );
    }
  }, [metaPixelId]);

  return metaPixelId ? (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `,
      }}
      onLoad={() => setScriptLoaded(true)}
    />
  ) : null;
}
