import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation, useSearchParams} from '@remix-run/react';
import type {ProductVariant} from '@shopify/hydrogen-react/storefront-api-types';

import {useGlobal} from '~/hooks';

import {mapProductPageVariant, mapProductItemVariant} from './utils';
import type {UserProperties} from './useDataLayerInit';

type DlProductVariant = ProductVariant & {index: number; list?: string};

export function useDataLayerProduct({
  cartReady,
  handleDataLayerEvent,
  userDataEvent,
  userDataEventTriggered,
  userProperties,
}: {
  cartReady: boolean;
  handleDataLayerEvent: (event: Record<string, any>) => void;
  userDataEvent: (arg0: any) => void;
  userDataEventTriggered: boolean;
  userProperties: UserProperties;
}) {
  const productHandleRef = useRef<string | null>(null);
  const {emitter} = useGlobal();
  const {pathname} = useLocation();
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product');

  const [viewedProductVariant, setViewedProductVariant] =
    useState<ProductVariant | null>(null);
  const [clickedProductItem, setClickedProductItem] =
    useState<DlProductVariant | null>(null);

  const viewProductEvent = useCallback(
    ({
      variant,
      userProperties: _userProperties,
    }: {
      variant?: ProductVariant;
      userProperties: UserProperties;
    }) => {
      if (!variant) return;
      const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
      const list = previousPath?.startsWith('/collections') ? previousPath : '';
      const event = {
        event: 'dl_view_item',
        user_properties: _userProperties,
        ecommerce: {
          currencyCode: variant.price?.currencyCode,
          detail: {
            actionField: {list, action: 'detail'},
            products: [variant].map(mapProductPageVariant(list)),
          },
        },
      };
      handleDataLayerEvent(event);
    },
    [],
  );

  const clickProductItemEvent = useCallback(
    ({variant}: {variant?: DlProductVariant}) => {
      if (!variant) return;
      const list = variant.list || '';
      const event = {
        event: 'dl_select_item',
        user_properties: userProperties,
        ecommerce: {
          currencyCode: variant.price?.currencyCode,
          click: {
            actionField: {
              list,
              action: 'click',
            },
            products: [variant].map(mapProductItemVariant(list)),
          },
        },
      };
      handleDataLayerEvent(event);
    },
    [userProperties],
  );

  // Subscribe to EventEmitter topic for 'view_item' event
  useEffect(() => {
    emitter?.on('VIEW_PRODUCT_PAGE', (variant: ProductVariant) => {
      setViewedProductVariant(variant);
    });
    emitter?.on('CLICK_PRODUCT_ITEM', (variant: DlProductVariant) => {
      setClickedProductItem(variant);
    });
    return () => {
      emitter?.off('VIEW_PRODUCT_PAGE', (variant: ProductVariant) => {
        setViewedProductVariant(variant);
      });
      emitter?.off('CLICK_PRODUCT_ITEM', (variant: DlProductVariant) => {
        setClickedProductItem(variant);
      });
    };
  }, []);

  // Trigger 'user_data' and 'view_item' events on viewedProductVariant change after base data is ready
  useEffect(() => {
    const productPathname = `${pathname}${
      productParam ? `?product=${productParam}` : ''
    }`;
    if (!productParam) {
      productHandleRef.current = productPathname || null;
      return;
    }
    if (
      !cartReady ||
      !userProperties ||
      !viewedProductVariant ||
      productHandleRef.current === productPathname
    )
      return;
    userDataEvent({userProperties});
    viewProductEvent({variant: viewedProductVariant, userProperties});
    productHandleRef.current = productPathname || null;
  }, [
    cartReady,
    pathname,
    productParam,
    viewedProductVariant?.product?.id,
    !!userProperties,
  ]);

  // Trigger 'select_item' event on clicked collection
  // item and after user event
  useEffect(() => {
    if (!clickedProductItem || !userDataEventTriggered) return;
    clickProductItemEvent({variant: clickedProductItem});
  }, [clickedProductItem, userDataEventTriggered]);
}
