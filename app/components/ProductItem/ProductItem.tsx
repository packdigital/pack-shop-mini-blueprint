import {useCallback, useMemo, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {useAnalytics} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {useProductByHandle, useProductModal} from '~/hooks';
import {CustomAnalyticsEvent} from '~/components';
import type {
  AspectRatio,
  AspectRatioType,
  SelectedProduct,
  SelectedVariant,
  Swatches,
  ColorHexCode,
} from '~/lib/types';

import {ProductStars} from '../ProductStars';

import {ColorVariantSelector} from './ColorVariantSelector';
import {ProductItemMedia} from './ProductItemMedia/ProductItemMedia';
import {ProductItemPrice} from './ProductItemPrice';

interface ProductItemProps {
  enabledOptionValue?: boolean;
  enabledStarRating?: boolean;
  handle?: string;
  index: number;
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  manualStarRating?: string;
  onClick?: () => void;
  primaryOptionName?: string;
  priority?: boolean;
  product?: Product | null;
  quickShopMobileHidden?: boolean;
  starColor?: ColorHexCode;
  swatches?: Swatches;
}

export function ProductItem({
  enabledOptionValue = true,
  enabledStarRating,
  handle: passedHandle,
  index,
  aspectRatioType,
  manualAspectRatio,
  manualStarRating,
  onClick,
  primaryOptionName = 'Color',
  priority,
  product: passedProduct,
  starColor,
  swatches,
}: ProductItemProps) {
  const {ref: inViewRef, inView} = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const {publish} = useAnalytics();
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

  const primaryOptionValue = useMemo(() => {
    return selectedVariant?.selectedOptions.find(
      (option) => option.name === primaryOptionName?.trim(),
    )?.value;
  }, [primaryOptionName, selectedVariant]);

  const title = selectedProduct?.title;
  const isFullProduct = !!selectedProduct?.variants;

  const handleClick = useCallback(() => {
    if (!selectedProduct) return;
    publish(CustomAnalyticsEvent.PRODUCT_ITEM_CLICKED, {
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
            aspectRatioType={aspectRatioType}
            manualAspectRatio={manualAspectRatio}
            selectedProduct={selectedProduct}
            selectedVariant={selectedVariant}
            swatches={swatches}
          />
        </button>

        {enabledStarRating && isFullProduct && (
          <button
            aria-label={`Reviews for ${title}`}
            className="mb-0.5"
            onClick={handleClick}
            tabIndex={-1}
            type="button"
          >
            <ProductStars
              id={initialProduct?.id}
              color={starColor}
              manualStarRating={manualStarRating}
              underlined={false}
            />
          </button>
        )}

        <button aria-label={title} onClick={handleClick} type="button">
          <h3 className="theme-heading min-h-6 text-base">{title}</h3>
        </button>

        {enabledOptionValue && primaryOptionValue && (
          <p className="theme-text-color-faded text-sm">{primaryOptionValue}</p>
        )}

        <ProductItemPrice selectedVariant={selectedVariant} />

        <ColorVariantSelector
          initialProduct={initialProduct}
          selectedVariant={selectedVariant}
          setProductFromColorSelector={setProductFromColorSelector}
          setVariantFromColorSelector={setVariantFromColorSelector}
          swatches={swatches}
        />
      </div>
    </div>
  );
}

ProductItem.displayName = 'ProductItem';
