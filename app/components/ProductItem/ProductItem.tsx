import {useCallback, useMemo, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {COLOR_OPTION_NAME} from '~/lib/constants';
import type {SelectedProduct, SelectedVariant, SwatchesMap} from '~/lib/types';
import {
  useDataLayerClickEvents,
  useProductByHandle,
  useProductModal,
} from '~/hooks';

import {ProductStars} from '../ProductStars';

import {ColorVariantSelector} from './ColorVariantSelector';
import {ProductItemMedia} from './ProductItemMedia/ProductItemMedia';
import {ProductItemPrice} from './ProductItemPrice';

interface ProductItemProps {
  enabledStarRating?: boolean;
  handle?: string;
  index: number;
  onClick?: () => void;
  priority?: boolean;
  product?: Product | null;
  quickShopMobileHidden?: boolean;
  swatchesMap?: SwatchesMap;
}

export function ProductItem({
  enabledStarRating,
  handle: passedHandle,
  index,
  onClick,
  priority,
  product: passedProduct,
  swatchesMap,
}: ProductItemProps) {
  const {ref: inViewRef, inView} = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const {sendClickProductItemEvent} = useDataLayerClickEvents();
  // if full product passed, don't query for it; only query when in view unless priority
  const queriedProduct = useProductByHandle(
    passedProduct ? null : priority || inView ? passedHandle : null,
  );
  const {openProductModal} = useProductModal();

  const [productFromColorSelector, setProductFromColorSelector] =
    useState<SelectedProduct>(null);
  const [variantFromColorSelector, setVariantFromColorSelector] =
    useState<SelectedVariant>(null);

  const initialProduct = useMemo((): SelectedProduct => {
    return passedProduct || queriedProduct;
  }, [passedProduct, queriedProduct]);

  const selectedProduct = useMemo((): SelectedProduct => {
    return productFromColorSelector || initialProduct;
  }, [productFromColorSelector, initialProduct]);

  const selectedVariant = useMemo((): SelectedVariant => {
    return variantFromColorSelector || selectedProduct?.variants?.nodes?.[0];
  }, [variantFromColorSelector, selectedProduct]);

  const color = useMemo(() => {
    return selectedVariant?.selectedOptions.find(
      (option) => option.name === COLOR_OPTION_NAME,
    )?.value;
  }, [selectedVariant]);

  const title = selectedProduct?.title;

  const handleClick = useCallback(() => {
    if (!selectedProduct) return;
    sendClickProductItemEvent({
      listIndex: index,
      product: selectedProduct,
      selectedVariant,
    });
    openProductModal(selectedProduct.handle, selectedVariant?.selectedOptions);
    if (typeof onClick === 'function') onClick();
  }, [index, onClick, selectedProduct?.handle, selectedVariant]);

  return (
    <div className="group flex h-full flex-col justify-between" ref={inViewRef}>
      <div className="flex flex-col items-start">
        <button
          aria-label={title}
          className="mb-3 w-full"
          onClick={handleClick}
          tabIndex={-1}
          type="button"
        >
          <ProductItemMedia
            selectedProduct={selectedProduct}
            selectedVariant={selectedVariant}
          />
        </button>

        {enabledStarRating && initialProduct?.id && (
          <div className="mb-1.5">
            <button
              aria-label={`Reviews for ${title}`}
              onClick={handleClick}
              tabIndex={-1}
              type="button"
            >
              <ProductStars id={initialProduct.id} />
            </button>
          </div>
        )}

        <button aria-label={title} onClick={handleClick} type="button">
          <h3 className="min-h-6 text-base">{title}</h3>
        </button>

        {color && <p className="text-sm text-mediumDarkGray">{color}</p>}

        <ProductItemPrice selectedVariant={selectedVariant} />

        <ColorVariantSelector
          initialProduct={initialProduct}
          selectedVariant={selectedVariant}
          setProductFromColorSelector={setProductFromColorSelector}
          setVariantFromColorSelector={setVariantFromColorSelector}
          swatchesMap={swatchesMap}
        />
      </div>
    </div>
  );
}

ProductItem.displayName = 'ProductItem';
