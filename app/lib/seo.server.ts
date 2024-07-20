import type {SeoConfig} from '@shopify/hydrogen';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import type {Organization, WebPage} from 'schema-dts';

import type {Page, RootSiteSettings, Seo} from '~/lib/types';

type SeoMedia = SeoConfig['media'];

const getMeta = ({
  page,
  resource,
  shop,
  siteSettings,
}: {
  page?: Page;
  resource?: Record<string, any>;
  shop: Shop;
  siteSettings: RootSiteSettings;
}): {
  title: string;
  description: string;
  pageTitle: string;
  pageDescription: string;
  media: SeoMedia;
  robots: {noIndex: boolean; noFollow: boolean};
} => {
  const {title: seoSiteTitle, description: seoSiteDescription} = {
    ...siteSettings?.data?.siteSettings?.seo,
  } as Seo;
  const siteTitle = seoSiteTitle || shop?.name || '';
  let pageTitle =
    resource?.seo?.title ||
    resource?.title ||
    page?.seo?.title ||
    page?.title ||
    '';
  let title = pageTitle
    ? `${pageTitle}${siteTitle ? ` | ${siteTitle}` : ''}`
    : siteTitle;
  if (page?.handle === '/') {
    pageTitle = pageTitle === 'Homepage' ? siteTitle : pageTitle;
    title = siteTitle;
  }
  const pageDescription =
    resource?.seo?.description ||
    resource?.description ||
    page?.seo?.description ||
    page?.description ||
    '';
  const description = truncate(
    pageDescription || seoSiteDescription || shop?.description || '',
  );
  const media: SeoMedia = {
    type: 'image',
    url: page?.seo?.image || resource?.seo?.image || '',
  };
  const robots = {
    noIndex: !!page?.seo?.noIndex,
    noFollow: !!page?.seo?.noFollow,
  };
  return {title, description, pageTitle, pageDescription, media, robots};
};

function root({
  shop,
  siteSettings,
  url,
}: {
  shop: Shop;
  siteSettings: RootSiteSettings;
  url: Request['url'];
}): SeoConfig<Organization> {
  const {title: seoSiteTitle, description: seoSiteDescription} = {
    ...siteSettings?.data?.siteSettings?.seo,
  } as Seo;
  const title = seoSiteTitle || shop?.name || '';
  const description = truncate(seoSiteDescription || shop?.description || '');
  const siteUrl = new URL(url);
  const origin = siteUrl.origin;

  return {
    title,
    description,
    url,
    robots: {
      noIndex: false,
      noFollow: false,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: shop.name,
      logo: shop.brand?.logo?.image?.url,
      sameAs: [], // social media links
      url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/search?q={search_term}`,
        query: "required name='search_term'",
      },
    },
  };
}

function page({
  page,
  shop,
  siteSettings,
}: {
  page: Page;
  shop: Shop;
  siteSettings: RootSiteSettings;
}): SeoConfig<WebPage> {
  const {title, description, pageTitle, media, robots} = getMeta({
    page,
    shop,
    siteSettings,
  });
  return {
    title,
    description,
    media,
    robots,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
    },
  };
}

export const seoPayload = {
  page,
  root,
};

/**
 * Truncate a string to a given length, adding an ellipsis if it was truncated
 * @param str - The string to truncate
 * @param num - The maximum length of the string
 * @returns The truncated string
 * @example
 * ```js
 * truncate('Hello world', 5) // 'Hello...'
 * ```
 */
function truncate(str: string, num = 155): string {
  if (typeof str !== 'string') return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num - 3) + '...';
}
