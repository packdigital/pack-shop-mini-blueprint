import type {ReactNode} from 'react';

import {Cart, Footer, Header, Modal, ProductModal} from '~/components';
import {
  useCartAddDiscountUrl,
  usePromobar,
  useSetViewportHeightCssVar,
  useTransparentHeader,
} from '~/hooks';

export function Layout({children}: {children: ReactNode}) {
  const {mainPaddingTopClass} = usePromobar();
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
        className={`grow ${isTransparentHeader ? '' : mainPaddingTopClass}`}
      >
        {children}
      </main>

      <Footer />

      <Cart />

      <Modal />

      <ProductModal />
    </div>
  );
}

Layout.displayName = 'Layout';
