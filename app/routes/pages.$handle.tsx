import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {AnalyticsPageType, getSeoMeta} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';
import type {LoaderFunctionArgs, MetaArgs} from '@shopify/remix-oxygen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {getShop, getSiteSettings} from '~/lib/utils';
import {PAGE_QUERY, PRODUCT_ITEM_QUERY} from '~/data/queries';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import type {Page} from '~/lib/types';

export const headers = routeHeaders;

export async function loader({context, params, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront, pack} = context;
  const {data} = await pack.query(PAGE_QUERY, {
    variables: {handle},
    cache: storefront.CacheLong(),
  });

  if (!data?.page) throw new Response(null, {status: 404});

  const page = data.page as Page;
  const productsMap: Record<string, Product> = {};

  const shoppableSocialVideoSectionsProductHandles =
    page.sections?.nodes
      ?.filter((section) => {
        return (
          section.data?._template === 'shoppable-social-video' &&
          section.data?.sectionVisibility === 'visible'
        );
      })
      ?.map((section) => section.data?.product?.product?.handle) || [];
  const productSectionsProductHandles =
    page.sections?.nodes
      ?.filter((section) => {
        return (
          section.data?._template === 'product' &&
          section.data?.sectionVisibility === 'visible'
        );
      })
      ?.map((section) => section.data?.product?.handle) || [];
  const productHandles = [
    ...shoppableSocialVideoSectionsProductHandles,
    ...productSectionsProductHandles,
  ];
  if (productHandles?.length) {
    const productsPromise = productHandles.map(async (handle) => {
      if (productsMap[handle]) return productsMap[handle];
      const {product} = await storefront.query(PRODUCT_ITEM_QUERY, {
        variables: {
          handle,
          country: storefront.i18n.country,
          language: storefront.i18n.language,
        },
        cache: storefront.CacheShort(),
      });
      return product;
    });
    const products = await Promise.all(productsPromise);
    products.forEach((product) => {
      if (!product) return;
      productsMap[product?.handle] = product;
    });
  }

  const shop = await getShop(context);
  const siteSettings = await getSiteSettings(context);
  const isPolicy = handle?.includes('privacy') || handle?.includes('policy');
  const analytics = {
    pageType: isPolicy ? AnalyticsPageType.policy : AnalyticsPageType.page,
  };
  const seo = seoPayload.page({
    page,
    shop,
    siteSettings,
  });

  return json({
    analytics,
    page,
    productsMap,
    seo,
    url: request.url,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function PageRoute() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <div>
      <RenderSections content={page} />
    </div>
  );
}
