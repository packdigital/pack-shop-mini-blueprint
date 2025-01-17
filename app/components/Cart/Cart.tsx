import {memo} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import {Analytics} from '@shopify/hydrogen';
import type {CartLine as CartLineType} from '@shopify/hydrogen/storefront-api-types';

import {Drawer, Svg} from '~/components';
import {useMenu, useSettings, useSwatches} from '~/hooks';

import {CartDiscounts} from './CartDiscounts';
import {CartEmpty} from './CartEmpty';
import {CartLine} from './CartLine';
import {CartTotals} from './CartTotals';
import {CartUpsell} from './CartUpsell/CartUpsell';
import {FreeShippingMeter} from './FreeShippingMeter';

export const Cart = memo(() => {
  const {cart: cartSettings, product: productSettings} = useSettings();
  const cart = useCart();
  const {lines = [], totalQuantity = 0} = cart;
  const {cartOpen, closeCart} = useMenu();
  const swatches = useSwatches();

  const cartLines = lines as CartLineType[];
  const hasCartLines = totalQuantity > 0;
  const enabledUpsell = cartSettings?.upsell?.enabled;
  const enabledDiscounts = cartSettings?.discounts?.enabled ?? true;
  const {aspectRatioType = 'native', manualAspectRatio = '3/4'} = {
    ...productSettings?.media,
  };

  return (
    <Drawer
      ariaName="cart drawer"
      heading={cartSettings?.heading || 'My Cart'}
      onClose={closeCart}
      open={cartOpen}
      openFrom="right"
      secondHeaderElement={
        <Svg
          className="w-6 text-current"
          src="/svgs/bag.svg#bag"
          title="Cart"
          viewBox="0 0 24 24"
        />
      }
    >
      <FreeShippingMeter settings={cartSettings} />

      <ul className="scrollbar-hide relative flex-1 overflow-y-auto">
        {cartLines?.length ? (
          cartLines.map((line) => {
            return (
              <li
                key={line.id}
                className="theme-border-color border-b last:border-none"
              >
                <CartLine
                  aspectRatioType={aspectRatioType}
                  manualAspectRatio={manualAspectRatio}
                  line={line}
                  swatches={swatches}
                />
              </li>
            );
          })
        ) : (
          <CartEmpty closeCart={closeCart} settings={cartSettings} />
        )}
      </ul>

      {hasCartLines && (
        <>
          {enabledUpsell && (
            <CartUpsell
              aspectRatioType={aspectRatioType}
              manualAspectRatio={manualAspectRatio}
              closeCart={closeCart}
              settings={cartSettings}
            />
          )}

          {enabledDiscounts && <CartDiscounts />}

          <CartTotals settings={cartSettings} />
        </>
      )}

      <Analytics.CartView customData={{cart}} />
    </Drawer>
  );
});

Cart.displayName = 'Cart';
