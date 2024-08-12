import {useAnalytics} from '@shopify/hydrogen';

import {usePathStorage, useRootLoaderData} from '~/hooks';

import {ElevarEvents} from './ElevarEvents';
import {FueledEvents} from './FueledEvents';
import {GA4Events} from './GA4Events';
import {MetaPixelEvents} from './MetaPixelEvents';
import {TikTokPixelEvents} from './TikTokPixelEvents';

/*
 * These are some out of the box third party analytics events. Add new events or
 * new third party analytics, or remove or update these existing ones as needed.
 */

const DEBUG = true;

export function PackAnalytics() {
  const {ENV} = useRootLoaderData();
  const {register, subscribe} = useAnalytics();
  usePathStorage();

  const enabledFueled = false;
  const enabledElevar = !!ENV.PUBLIC_ELEVAR_SIGNING_KEY;
  const enabledGA4 = !!ENV.PUBLIC_GA4_TAG_ID;
  const enabledMetaPixel = !!ENV.PUBLIC_META_PIXEL_ID;
  const enabledTikTokPixel = !!ENV.PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <>
      {enabledFueled && (
        <FueledEvents register={register} subscribe={subscribe} debug={DEBUG} />
      )}

      {enabledElevar && (
        <ElevarEvents
          elevarSigningKey={ENV.PUBLIC_ELEVAR_SIGNING_KEY}
          register={register}
          subscribe={subscribe}
          debug={DEBUG}
        />
      )}

      {enabledGA4 && (
        <GA4Events
          ga4TagId={ENV.PUBLIC_GA4_TAG_ID}
          register={register}
          subscribe={subscribe}
          debug={DEBUG}
        />
      )}

      {enabledMetaPixel && (
        <MetaPixelEvents
          metaPixelId={ENV.PUBLIC_META_PIXEL_ID}
          register={register}
          subscribe={subscribe}
          debug={DEBUG}
        />
      )}

      {enabledTikTokPixel && (
        <TikTokPixelEvents
          tiktokPixelId={ENV.PUBLIC_TIKTOK_PIXEL_ID}
          register={register}
          subscribe={subscribe}
          debug={DEBUG}
        />
      )}
    </>
  );
}
