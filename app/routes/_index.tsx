import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import type {LoaderFunctionArgs, MetaArgs} from '@shopify/remix-oxygen';
import {AnalyticsPageType, getSeoMeta} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';

import {ProductModal} from '~/components';
import {getShop, getSiteSettings} from '~/lib/utils';
import {PAGE_QUERY, PRODUCT_ITEM_QUERY} from '~/data/queries';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, pack} = context;
  const {data} = await pack.query(PAGE_QUERY, {
    variables: {handle: '/'},
    cache: context.storefront.CacheLong(),
  });

  if (!data?.page) throw new Response(null, {status: 404});

  const firstSection = data.page.sections?.nodes?.find(
    ({data}) => data?.sectionVisibility === 'visible',
  )?.data;
  let socialVideoProduct;
  if (firstSection?._template === 'shoppable-social-video') {
    const handle = firstSection.product?.product?.data?.handle;
    const {product} = await storefront.query(PRODUCT_ITEM_QUERY, {
      variables: {
        handle,
        country: storefront.i18n.country,
        language: storefront.i18n.language,
      },
      cache: storefront.CacheShort(),
    });
    socialVideoProduct = product;
  }

  const shop = await getShop(context);
  const siteSettings = await getSiteSettings(context);
  const analytics = {pageType: AnalyticsPageType.home};
  const seo = seoPayload.home({
    page: data.page,
    shop,
    siteSettings,
  });

  return json({
    analytics,
    page: data.page,
    seo,
    socialVideoProduct,
  });
}

export const meta = ({data}: MetaArgs) => {
  return getSeoMeta(data.seo);
};

export default function Index() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <div>
      <ProductModal />
      <RenderSections content={page} />
    </div>
  );
}
