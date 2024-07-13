import {useLoaderData} from '@remix-run/react';
import {ProductProvider} from '@shopify/hydrogen-react';
import {json} from '@shopify/remix-oxygen';
import type {LoaderFunctionArgs, MetaArgs} from '@shopify/remix-oxygen';
import {AnalyticsPageType, getSeoMeta} from '@shopify/hydrogen';
import type {ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {RenderSections} from '@pack/react';

import {getMetafields, getShop, getSiteSettings} from '~/lib/utils';
import {PRODUCT_PAGE_QUERY, PRODUCT_QUERY} from '~/data/queries';
import {Product} from '~/components';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

/*
 * Add metafield queries to the METAFIELD_QUERIES array to fetch desired metafields for product pages
 * e.g. [{namespace: 'global', key: 'description'}, {namespace: 'product', key: 'seasonal_colors'}]
 */
const METAFIELD_QUERIES: {namespace: string; key: string}[] = [];

export const headers = routeHeaders;

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const pageData = await context.pack.query(PRODUCT_PAGE_QUERY, {
    variables: {handle},
    cache: context.storefront.CacheLong(),
  });

  const productPage = pageData?.data?.productPage;

  const storeDomain = storefront.getShopifyDomain();
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: Record<string, any>[] = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    if (name === 'variant') return;
    selectedOptions.push({name, value});
  });

  let {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheShort(),
  });

  if (!product) throw new Response(null, {status: 404});

  if (METAFIELD_QUERIES?.length) {
    const metafields = await getMetafields(context, {
      handle,
      metafieldQueries: METAFIELD_QUERIES,
    });
    product = {...product, metafields};
  }

  const selectedVariant = product.selectedVariant ?? product.variants?.nodes[0];

  delete product.selectedVariant;

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };
  const analytics = {
    pageType: AnalyticsPageType.product,
    resourceId: product.id,
    products: [productAnalytics],
    totalValue: parseFloat(selectedVariant.price.amount),
  };
  const shop = await getShop(context);
  const siteSettings = await getSiteSettings(context);

  return json({
    analytics,
    product,
    productPage,
    selectedVariant,
    storeDomain,
    url: request.url,
  });
}

export const meta = ({data}: MetaArgs) => {
  return getSeoMeta(data.seo);
};

export default function ProductRoute() {
  const {product, productPage, selectedVariant} =
    useLoaderData<typeof loader>();

  return (
    <ProductProvider
      data={product}
      initialVariantId={selectedVariant?.id || null}
    >
      <div data-comp={ProductRoute.displayName}>
        <Product product={product} />

        {productPage && <RenderSections content={productPage} />}
      </div>
    </ProductProvider>
  );
}

ProductRoute.displayName = 'ProductRoute';
