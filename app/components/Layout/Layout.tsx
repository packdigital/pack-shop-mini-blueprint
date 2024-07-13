import type {ReactNode} from 'react';

import {Cart, Footer, Header, Modal} from '~/components';
import {
  usePromobar,
  useSetViewportHeightCssVar,
  useTransparentHeader,
} from '~/hooks';

export function Layout({children}: {children: ReactNode}) {
  const {mainPaddingTopClass} = usePromobar();
  useSetViewportHeightCssVar();
  const {isTransparentHeader} = useTransparentHeader();

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
    </div>
  );
}

Layout.displayName = 'Layout';
