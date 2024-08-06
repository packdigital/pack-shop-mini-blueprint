import {AnalyticsEvent} from '@shopify/hydrogen';

import {useRootLoaderData} from '~/hooks';

import {ElevarEvents} from './ElevarEvents';
import {FueledEvents} from './FueledEvents';
import {GA4Events} from './GA4Events';
import {MetaPixelEvents} from './MetaPixelEvents';
import {TikTokPixelEvents} from './TikTokPixelEvents';

/*
 * These are some out of the box third party analytics events. Add new events or
 * new third party analytics, or remove or update these existing ones as needed.
 */

export const CustomAnalyticsEvent = {
  ...AnalyticsEvent,
  PRODUCT_ITEM_CLICKED: 'custom_product_item_clicked',
  PRODUCT_QUICK_SHOP_VIEWED: 'custom_product_quick_shop_viewed',
  CUSTOMER_SUBSCRIBED: 'custom_customer_subscribed',
} as typeof AnalyticsEvent & {
  PRODUCT_ITEM_CLICKED: 'custom_product_item_clicked';
  PRODUCT_QUICK_SHOP_VIEWED: 'custom_product_quick_shop_viewed';
  CUSTOMER_SUBSCRIBED: 'custom_customer_subscribed';
};

export function CustomAnalytics() {
  const {ENV} = useRootLoaderData();

  const enabledFueled = false;
  const enabledElevar = !!ENV.PUBLIC_ELEVAR_SIGNING_KEY;
  const enabledGA4 = !!ENV.PUBLIC_GA4_TAG_ID;
  const enabledMetaPixel = !!ENV.PUBLIC_META_PIXEL_ID;
  const enabledTikTokPixel = !!ENV.PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <>
      {enabledFueled && <FueledEvents />}

      {enabledElevar && (
        <ElevarEvents elevarSigningKey={ENV.PUBLIC_ELEVAR_SIGNING_KEY} />
      )}

      {enabledGA4 && <GA4Events ga4TagId={ENV.PUBLIC_GA4_TAG_ID} />}

      {enabledMetaPixel && (
        <MetaPixelEvents metaPixelId={ENV.PUBLIC_META_PIXEL_ID} />
      )}

      {enabledTikTokPixel && (
        <TikTokPixelEvents tiktokPixelId={ENV.PUBLIC_TIKTOK_PIXEL_ID} />
      )}
    </>
  );
}
