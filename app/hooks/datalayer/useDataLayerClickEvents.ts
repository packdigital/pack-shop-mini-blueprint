import {useCallback} from 'react';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';

import {useGlobal} from '~/hooks';

export const useDataLayerClickEvents = () => {
  const {emitter} = useGlobal();

  const sendClickProductItemEvent = useCallback(
    ({
      listIndex,
      product,
      selectedVariant: _selectedVariant,
    }: {
      listIndex?: number;
      product?: Product | null | undefined;
      selectedVariant?: ProductVariant | null | undefined;
    }) => {
      if (!_selectedVariant || typeof listIndex !== 'number') return;

      const selectedVariant = {
        ..._selectedVariant,
        image: _selectedVariant.image || product?.featuredImage || '',
        index: listIndex,
        product: {
          ..._selectedVariant.product,
          vendor: product?.vendor,
          collections: product?.collections,
        },
        list: window.location.pathname.startsWith('/collections')
          ? window.location.pathname
          : '',
      };

      emitter?.emit('CLICK_PRODUCT_ITEM', selectedVariant);
    },
    [emitter?._eventsCount],
  );

  const sendSubscribeEvent = useCallback(
    ({email, phone}: {email?: string | null; phone?: string | null}) => {
      if (email) {
        emitter?.emit('SUBSCRIBE_EMAIL', email);
      }
      if (phone) {
        emitter?.emit('SUBSCRIBE_PHONE', phone);
      }
    },
    [emitter?._eventsCount],
  );

  return {
    sendClickProductItemEvent,
    sendSubscribeEvent,
  };
};
