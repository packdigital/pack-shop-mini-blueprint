import type {ReactNode} from 'react';

import {Cart, Footer, Header, Modal, ProductModal} from '~/components';
import {
  useCartAddDiscountUrl,
  usePromobar,
  useSetViewportHeightCssVar,
  useTransparentHeader,
} from '~/hooks';

export function Layout({children}: {children: ReactNode}) {
  const {mainTopPaddingClass} = usePromobar();
  const isTransparentHeader = useTransparentHeader();
  useCartAddDiscountUrl();
  useSetViewportHeightCssVar();

  return (
    <div
      className="flex h-[var(--viewport-height)] flex-col"
      data-comp={Layout.displayName}
    >
      <Header />

      <main
        role="main"
        id="mainContent"
        className={`grow ${isTransparentHeader ? 'pt-0' : mainTopPaddingClass}`}
      >
        {children}
      </main>

      <Footer />

      <ProductModal />

      <Cart />

      <Modal />
    </div>
  );
}

Layout.displayName = 'Layout';
