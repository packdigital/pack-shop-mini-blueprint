import type {AppLoadContext} from '@shopify/remix-oxygen';
import type {Metafield} from '@shopify/hydrogen/storefront-api-types';

import {
  LAYOUT_QUERY,
  METAFIELD_FRAGMENT,
  SITE_SETTINGS_QUERY,
} from '~/data/queries';
import type {RootSiteSettings} from '~/lib/types';

export const getShop = async (context: AppLoadContext) => {
  const layout = await context.storefront.query(LAYOUT_QUERY, {
    cache: context.storefront.CacheShort(),
  });
  return layout.shop;
};

export const getSiteSettings = async (
  context: AppLoadContext,
): Promise<RootSiteSettings> => {
  return (await context.pack.query(SITE_SETTINGS_QUERY, {
    cache: context.storefront.CacheLong(),
  })) as RootSiteSettings;
};

export const getPrimaryDomain = ({
  context,
  request,
}: {
  context: AppLoadContext;
  request?: Request;
}) => {
  const PRIMARY_DOMAIN = context.env.PRIMARY_DOMAIN;
  let primaryDomainOrigin = '';
  if (PRIMARY_DOMAIN) {
    try {
      primaryDomainOrigin = new URL(PRIMARY_DOMAIN).origin;
    } catch (error) {}
  }
  if (!primaryDomainOrigin && request) {
    primaryDomainOrigin = new URL(request.url).origin;
  }
  return primaryDomainOrigin;
};

export const getEnvs = async ({
  context,
  request,
}: {
  context: AppLoadContext;
  request?: Request;
}): Promise<Record<string, string>> => {
  const PRIMARY_DOMAIN = getPrimaryDomain({context, request});

  const publicEnvs = Object.entries({...context.env}).reduce(
    (acc: any, [key, value]) => {
      if (key.startsWith('PUBLIC_')) acc[key] = value;
      return acc;
    },
    {},
  );

  return {...publicEnvs, PRIMARY_DOMAIN};
};

export const getMetafields = async (
  context: AppLoadContext,
  {
    handle,
    metafieldQueries,
  }: {
    handle: string | undefined;
    metafieldQueries: {key: string; namespace: string}[];
  },
): Promise<Record<string, Metafield | null> | null> => {
  const {storefront} = context;

  if (!handle || !metafieldQueries?.length) return null;

  const PRODUCT_METAFIELDS_QUERY = `#graphql
    query product(
      $handle: String!
      $country: CountryCode
      $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
      product(handle: $handle) {
        ${metafieldQueries.map(
          ({key, namespace}, index) => `
            metafields_${index}: metafields(
              identifiers: {key: "${key}", namespace: "${namespace}"}
            ) {
              ...metafield
            }
          `,
        )}
      }
    }
    ${METAFIELD_FRAGMENT}
  `;

  const {product} = await storefront.query(PRODUCT_METAFIELDS_QUERY, {
    variables: {
      handle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheShort(),
  });

  const metafields = Object.entries({...product}).reduce(
    (acc: Record<string, Metafield | null>, entry) => {
      const [key, value] = entry as [string, Metafield[]];
      const originalIndex = key.split('_').pop();
      const query = metafieldQueries[Number(originalIndex)];
      acc[`${query.namespace}.${query.key}`] = value?.[0] || null;
      return acc;
    },
    {},
  );
  return metafields;
};
