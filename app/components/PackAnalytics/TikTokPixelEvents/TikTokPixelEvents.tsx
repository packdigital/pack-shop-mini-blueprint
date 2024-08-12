import {useEffect, useState} from 'react';

import {PackEventName} from '../constants';

import {viewProductEvent, addToCartEvent} from './events';

type Data = Record<string, any>;

export function TikTokPixelEvents({
  tiktokPixelId,
  register,
  subscribe,
  debug = false,
}: {
  tiktokPixelId: string;
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
    if (!tiktokPixelId) {
      console.error(
        'TikTokPixelEvents: error: `tiktokPixelId` must be passed in',
      );
    }
    if (!ready || !subscribe) {
      console.error(
        "TikTokPixelEvents: error: `register` and `subscribe` must be passed in from Hydrogen's useAnalytics hook.",
      );
      return;
    }
    if (!scriptLoaded) return;
    subscribe(PackEventName.PRODUCT_QUICK_SHOP_VIEWED, (data: Data) => {
      viewProductEvent({...data, tiktokPixelId, debug});
    });
    subscribe(PackEventName.PRODUCT_ADD_TO_CART, (data: Data) => {
      addToCartEvent({...data, tiktokPixelId, debug});
    });
    ready();
  }, [tiktokPixelId, scriptLoaded, ready, subscribe, debug]);

  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
          ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
          var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
          var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load('${tiktokPixelId}'); ttq.page(); }(window, document, 'ttq');
        `,
      }}
      onLoad={() => setScriptLoaded(true)}
    />
  );
}
