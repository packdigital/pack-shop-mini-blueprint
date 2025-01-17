import {useCallback, useMemo, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import {useAnalytics} from '@shopify/hydrogen';

import {Link} from '~/components';
import {useProductByHandle, useProductModal} from '~/hooks';
import type {SelectedProduct, SelectedVariant} from '~/lib/types';
import {AnalyticsEvent} from '~/components/Analytics/constants';

import {ProductStars} from '../ProductStars';

import {ColorVariantSelector} from './ColorVariantSelector';
import {ProductItemMedia} from './ProductItemMedia/ProductItemMedia';
import {ProductItemPrice} from './ProductItemPrice';
import type {ProductItemProps} from './ProductItem.types';

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

  const {openProductUrl} = useProductModal({
    product: selectedProduct,
    selectedVariant,
  });

  const title = selectedProduct?.title;
  const isFullProduct = !!selectedProduct?.variants;

  const handleClick = useCallback(() => {
    if (!selectedProduct) return;
    publish(AnalyticsEvent.PRODUCT_ITEM_CLICKED, {
      listIndex: index,
      product: selectedProduct,
      selectedVariant,
    });
    if (typeof onClick === 'function') onClick();
  }, [index, onClick, selectedProduct?.handle, selectedVariant]);

  return (
    <div className="group flex h-full flex-col justify-between" ref={inViewRef}>
      <div className="flex flex-col items-start">
        <Link
          aria-label={title}
          className="mb-3 w-full"
          onClick={handleClick}
          tabIndex={-1}
          to={openProductUrl}
        >
          <ProductItemMedia
            aspectRatioType={aspectRatioType}
            manualAspectRatio={manualAspectRatio}
            selectedProduct={selectedProduct}
            selectedVariant={selectedVariant}
            swatches={swatches}
          />
        </Link>

        {enabledStarRating && isFullProduct && (
          <Link
            aria-label={`Reviews for ${title}`}
            className="mb-0.5"
            onClick={handleClick}
            tabIndex={-1}
            to={openProductUrl}
          >
            <ProductStars
              id={initialProduct?.id}
              color={starColor}
              manualStarRating={manualStarRating}
              underlined={false}
            />
          </Link>
        )}

        <Link aria-label={title} onClick={handleClick} to={openProductUrl}>
          <h3 className="theme-heading min-h-6 text-left text-base">{title}</h3>
        </Link>

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
