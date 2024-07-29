import {useCallback} from 'react';

import {Image, Spinner} from '~/components';
import {PRODUCT_IMAGE_ASPECT_RATIO} from '~/lib/constants';
import {useAddToCart, useProductModal, useVariantPrices} from '~/hooks';

import type {CartUpsellItemProps} from '../Cart.types';

export function CartUpsellItem({
  closeCart,
  isOnlyUpsell,
  product,
}: CartUpsellItemProps) {
  const {openProductModal} = useProductModal();

  const selectedVariant = product.variants?.nodes?.[0];

  const {buttonText, cartIsUpdating, isAdding, isSoldOut, handleAddToCart} =
    useAddToCart({
      selectedVariant,
    });

  const {price, compareAtPrice} = useVariantPrices(selectedVariant);

  const handleClick = useCallback(() => {
    openProductModal(product.handle, selectedVariant?.selectedOptions);
    if (typeof closeCart === 'function') closeCart();
  }, [product.handle, selectedVariant?.id]);

  const image = product.featuredImage;
  const isUpdatingClass = isAdding || cartIsUpdating ? 'cursor-default' : '';

  return (
    <div
      className={`flex items-center justify-center gap-4 ${
        isOnlyUpsell ? 'px-4' : 'px-10'
      }`}
    >
      <button
        aria-label={product.title}
        onClick={handleClick}
        tabIndex={-1}
        type="button"
      >
        <Image
          data={{
            ...image,
            altText: product.title,
          }}
          aspectRatio={
            image?.width && image?.height
              ? `${image.width}/${image.height}`
              : PRODUCT_IMAGE_ASPECT_RATIO
          }
          width="40"
          isStatic
        />
      </button>

      <div className="flex max-w-[25rem] flex-1 flex-col gap-2">
        <button
          aria-label={product.title}
          className="self-start"
          onClick={handleClick}
          type="button"
        >
          <h4 className="theme-heading text-xs">{product.title}</h4>
        </button>

        <div className="flex items-center justify-between gap-4">
          <button
            aria-label={buttonText}
            className={`text-label-sm text-main-underline ${isUpdatingClass}`}
            disabled={!!isSoldOut}
            onClick={handleAddToCart}
            type="button"
          >
            {isAdding ? (
              <div className="flex h-4 items-center justify-center px-6">
                <Spinner width="12" color="gray" />
              </div>
            ) : (
              buttonText
            )}
          </button>

          <div className="flex flex-1 flex-wrap justify-end gap-x-1">
            {compareAtPrice && (
              <p className="theme-text-color-faded text-xs line-through">
                {compareAtPrice}
              </p>
            )}
            <p className="text-xs">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

CartUpsellItem.displayName = 'CartUpsellItem';
