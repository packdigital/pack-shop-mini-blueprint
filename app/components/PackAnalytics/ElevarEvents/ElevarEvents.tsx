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

/*
 * Env to set:
 * PUBLIC_ELEVAR_SIGNING_KEY // enables Elevar data layer, e.g. 1234567890
 * --> from the url within the `fetch()` call in the script, take the unique string of characters in between `/configs/` and `/config.json`
 */

type Data = Record<string, any>;

export function ElevarEvents({
  elevarSigningKey,
  register,
  subscribe,
  debug = false,
}: {
  elevarSigningKey: string;
  register: (key: string) => {ready: () => void};
  subscribe: (arg0: any, arg1: any) => void;
  debug?: boolean;
}) {
  let ready: () => void = () => {};
  if (register) {
    ready = register('ElevarEvents').ready;
  }

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!ready || !subscribe) {
      console.error(
        "ElevarEvents: error: `register` and `subscribe` must be passed in from Hydrogen's useAnalytics hook.",
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
    if (!elevarSigningKey) {
      console.error(
        'ElevarEvents: error: `elevarSigningKey` must be passed in',
      );
    }
  }, [elevarSigningKey]);

  return (
    <script
      type="module"
      id="elevar-script"
      dangerouslySetInnerHTML={{
        __html: `try {
            const settings = {};
            const config = (await import("https://shopify-gtm-suite.getelevar.com/configs/${elevarSigningKey}/config.js")).default;
            const scriptUrl = settings.proxyPath
              ? settings.proxyPath + config.script_src_custom_pages_proxied
              : config.script_src_custom_pages;

            if (scriptUrl) {
              const { handler } = await import(scriptUrl);
              await handler(config, settings);
            }
          } catch (error) {
            console.error("Elevar Error:", error);
          }`,
      }}
      onLoad={() => setScriptLoaded(true)}
    />
  );
}
