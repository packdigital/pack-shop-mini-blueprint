import {useEffect} from 'react';
import {Script, useAnalytics} from '@shopify/hydrogen';
import type {CartLineUpdatePayload} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

import {CustomAnalyticsEvent} from '~/components';

const DEBUG = false;

const viewProductEvent = ({product}: {product: Product}) => {
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

    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    } else {
      throw new Error('window.fbq is not defined');
    }
    if (DEBUG) {
      console.log(`meta pixel : event emitted : ${eventName}`, {
        eventName,
        parameters,
      });
    }
  } catch (error) {
    console.error('MetaPixelEvents:viewProductEvent', error);
  }
};

const addToCartEvent = ({cart, currentLine}: CartLineUpdatePayload) => {
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

    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    } else {
      throw new Error('window.fbq is not defined');
    }
    if (DEBUG) {
      console.log(`meta pixel : event emitted : ${eventName}`, {
        eventName,
        parameters,
      });
    }
  } catch (error) {
    console.error('MetaPixelEvents:addToCartEvent', error);
  }
};

export function MetaPixelEvents({metaPixelId}: {metaPixelId: string}) {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('MetaPixelEvents');

  useEffect(() => {
    subscribe(CustomAnalyticsEvent.PRODUCT_QUICK_SHOP_VIEWED, (data) => {
      if (DEBUG)
        console.log(
          'meta pixel : analytics subscribed : PRODUCT_QUICK_SHOP_VIEWED:',
          data,
        );
      viewProductEvent(data);
    });
    subscribe(CustomAnalyticsEvent.PRODUCT_ADD_TO_CART, (data) => {
      if (DEBUG)
        console.log(
          'meta pixel : analytics subscribed : PRODUCT_ADD_TO_CART:',
          data,
        );
      addToCartEvent(data);
    });
    ready();
  }, []);

  return (
    <Script
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
    />
  );
}
