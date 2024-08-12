import {useEffect, useState} from 'react';

import {PackEventName} from '../constants';

import {viewProductEvent, addToCartEvent} from './events';

type Data = Record<string, any>;

export function MetaPixelEvents({
  metaPixelId,
  register,
  subscribe,
  debug = false,
}: {
  metaPixelId: string;
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  debug?: boolean;
}) {
  let ready: () => void = () => {};
  if (register) {
    ready = register('FueledEvents').ready;
  }

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!ready || !subscribe) {
      console.error(
        "MetaPixelEvents: error: `register` and `subscribe` must be passed in from Hydrogen's useAnalytics hook.",
      );
      return;
    }
    if (!scriptLoaded) return;
    subscribe(PackEventName.PRODUCT_QUICK_SHOP_VIEWED, (data: Data) => {
      viewProductEvent({...data, debug});
    });
    subscribe(PackEventName.PRODUCT_ADD_TO_CART, (data: Data) => {
      addToCartEvent({...data, debug});
    });
    ready();
  }, [scriptLoaded, ready, subscribe, debug]);

  useEffect(() => {
    if (!metaPixelId) {
      console.error('MetaPixelEvents: error: `metaPixelId` must be passed in');
    }
  }, [metaPixelId]);

  return (
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
  );
}
