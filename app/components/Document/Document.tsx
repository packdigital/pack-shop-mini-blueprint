import type {ReactNode} from 'react';
import {CartProvider, ShopifyProvider} from '@shopify/hydrogen-react';
import {PreviewProvider} from '@pack/react';

import {GlobalProvider} from '~/contexts';
import {CART_FRAGMENT} from '~/data/queries';
import {useLocale, useRootLoaderData} from '~/hooks';

import {DocumentHtml} from './DocumentHtml';

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

export function Document({children, title}: DocumentProps) {
  const {customizerMeta, ENV, isPreviewModeEnabled, siteSettings} =
    useRootLoaderData();
  const locale = useLocale();

  return (
    <ShopifyProvider
      storeDomain={`https://${ENV.PUBLIC_STORE_DOMAIN}`}
      storefrontToken={ENV.PUBLIC_STOREFRONT_API_TOKEN}
      storefrontApiVersion={ENV.PUBLIC_STOREFRONT_API_VERSION || '2024-07'}
      countryIsoCode={locale.country}
      languageIsoCode={locale.language}
    >
      <CartProvider cartFragment={CART_FRAGMENT}>
        <GlobalProvider>
          {isPreviewModeEnabled ? (
            <PreviewProvider
              customizerMeta={customizerMeta}
              isPreviewModeEnabled={isPreviewModeEnabled}
              siteSettings={siteSettings}
            >
              <DocumentHtml title={title}>{children}</DocumentHtml>
            </PreviewProvider>
          ) : (
            <DocumentHtml title={title}>{children}</DocumentHtml>
          )}
        </GlobalProvider>
      </CartProvider>
    </ShopifyProvider>
  );
}

Document.displayName = 'Document';
