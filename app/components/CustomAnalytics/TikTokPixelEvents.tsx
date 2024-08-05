import {useEffect} from 'react';
import {Script, useAnalytics} from '@shopify/hydrogen';
import type {CartLineUpdatePayload} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

import {CustomAnalyticsEvent} from '~/components';

const DEBUG = false;

const viewProductEvent = ({
  product,
  tiktokPixelId,
}: {
  product: Product;
  tiktokPixelId: string;
}) => {
  try {
    if (!product) return;

    const eventName = 'ViewContent';
    const parameters = {
      content_name: product.title,
      content_category: product.productType,
      content_ids: [product.id],
      content_type: 'product',
      currency: product.priceRange?.minVariantPrice?.currencyCode,
      value: Number(product.priceRange?.minVariantPrice?.amount),
    };

    if (window.ttq) {
      window.ttq.instance(tiktokPixelId).track('track', eventName, parameters);
    } else {
      throw new Error('window.ttq is not defined');
    }
    if (DEBUG) {
      console.log(`tiktok pixel : event emitted : ${eventName}`, {
        eventName,
        parameters,
      });
    }
  } catch (error) {
    console.error('TikTokPixelEvents:viewProductEvent', error);
  }
};

const addToCartEvent = ({
  cart,
  currentLine,
  tiktokPixelId,
}: CartLineUpdatePayload & {tiktokPixelId: string}) => {
  try {
    if (!cart || !currentLine) return;
    const {quantity} = currentLine;
    const {product} = currentLine.merchandise;
    const {amount, currencyCode} = currentLine.cost.totalAmount;

    const eventName = 'AddToCart';
    const parameters = {
      content_ids: [product.id],
      content_type: 'product',
      contents: [{id: product.id, quantity}],
      value: Number(amount) * quantity,
      currency: currencyCode,
    };

    if (window.ttq) {
      window.ttq.instance(tiktokPixelId).track('track', eventName, parameters);
    }
    if (DEBUG) {
      console.log(`tiktok pixel : event emitted : ${eventName}`, {
        eventName,
        parameters,
      });
    } else {
      throw new Error('window.ttq is not defined');
    }
  } catch (error) {
    console.error('TikTokPixelEvents:addToCartEvent', error);
  }
};

export function TikTokPixelEvents({tiktokPixelId}: {tiktokPixelId: string}) {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('TikTokPixelEvents');

  useEffect(() => {
    subscribe(CustomAnalyticsEvent.PRODUCT_QUICK_SHOP_VIEWED, (data) => {
      if (DEBUG)
        console.log(
          'tiktok pixel : analytics subscribed : PRODUCT_QUICK_SHOP_VIEWED:',
          data,
        );
      viewProductEvent({...data, tiktokPixelId});
    });
    subscribe(CustomAnalyticsEvent.PRODUCT_ADD_TO_CART, (data) => {
      if (DEBUG)
        console.log(
          'tiktok pixel : analytics subscribed : PRODUCT_ADD_TO_CART:',
          data,
        );
      addToCartEvent({...data, tiktokPixelId});
    });
    ready();
  }, []);

  return (
    <Script
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
    />
  );
}
