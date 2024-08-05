import {useEffect, useMemo, useState} from 'react';
import type {ReactNode} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import {Analytics} from '@shopify/hydrogen';

import {
  Cart,
  CustomAnalytics,
  Footer,
  Header,
  Modal,
  ProductModal,
} from '~/components';
import {
  useCartAddDiscountUrl,
  usePromobar,
  useRootLoaderData,
  useSetViewportHeightCssVar,
  useTransparentHeader,
} from '~/hooks';

export function Layout({children}: {children: ReactNode}) {
  const cart = useCart();
  const {consent, shop} = useRootLoaderData();
  const {mainTopPaddingClass} = usePromobar();
  const isTransparentHeader = useTransparentHeader();
  useCartAddDiscountUrl();
  useSetViewportHeightCssVar();

  const cartIsIdle = cart.status === 'idle';
  const [cartReady, setCartReady] = useState(cartIsIdle);

  const cartForAnalytics = useMemo(() => {
    return {...cart, lines: {nodes: cart.lines}};
  }, [cart]);

  useEffect(() => {
    if (cartIsIdle) setCartReady(true);
    // uninitialized cart never becomes idle so instead set cart ready after 1 sec
    else setTimeout(() => setCartReady(true), 1000);
  }, [cartIsIdle]);

  return (
    <Analytics.Provider
      // delay any analytics events until cart is ready
      cart={cartReady ? cartForAnalytics : null}
      shop={cartReady ? shop : null}
      consent={consent}
    >
      <>
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

        <CustomAnalytics />
      </>
    </Analytics.Provider>
  );
}

Layout.displayName = 'Layout';
