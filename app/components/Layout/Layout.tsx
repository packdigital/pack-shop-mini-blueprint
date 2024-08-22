import type {ReactNode} from 'react';
import {useShopifyCookies} from '@shopify/hydrogen-react';
import {Analytics} from '@shopify/hydrogen';

import {
  Cart,
  Footer,
  Header,
  Modal,
  PackAnalytics,
  ProductModal,
} from '~/components';
import {
  useCartAddDiscountUrl,
  useCartForAnalytics,
  usePromobar,
  useRootLoaderData,
  useSetViewportHeightCssVar,
  useTransparentHeader,
} from '~/hooks';

export function Layout({children}: {children: ReactNode}) {
  useShopifyCookies({hasUserConsent: true});
  const {consent, shop} = useRootLoaderData();
  const {mainTopPaddingClass} = usePromobar();
  const cartForAnalytics = useCartForAnalytics();
  const isTransparentHeader = useTransparentHeader();
  useCartAddDiscountUrl();
  useSetViewportHeightCssVar();

  return (
    <Analytics.Provider shop={shop} cart={cartForAnalytics} consent={consent}>
      <>
        <PackAnalytics />

        <div
          className="flex h-[var(--viewport-height,100vh)] flex-col"
          data-comp={Layout.displayName}
        >
          <Header />

          <main
            role="main"
            id="mainContent"
            className={`grow ${
              isTransparentHeader ? 'pt-0' : mainTopPaddingClass
            }`}
          >
            {children}
          </main>

          <Footer />

          <ProductModal />

          <Cart />

          <Modal />
        </div>
      </>
    </Analytics.Provider>
  );
}

Layout.displayName = 'Layout';
