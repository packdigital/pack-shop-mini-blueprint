import type {
  AttributeInput,
  SellingPlan,
} from '@shopify/hydrogen/storefront-api-types';

import {LoadingDots} from '~/components';
import {useAddToCart} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

interface AddToCartProps {
  addToCartText?: string;
  attributes?: AttributeInput[];
  className?: string;
  isPdp?: boolean;
  quantity?: number;
  selectedVariant: SelectedVariant;
  sellingPlanId?: SellingPlan['id'];
}

export function AddToCart({
  addToCartText = '',
  attributes,
  className = '',
  isPdp = false,
  quantity = 1,
  selectedVariant,
  sellingPlanId,
}: AddToCartProps) {
  const {
    buttonText,
    cartIsUpdating,
    isAdded,
    isAdding,
    isSoldOut,
    subtext,
    handleAddToCart,
  } = useAddToCart({
    addToCartText,
    attributes,
    quantity,
    selectedVariant,
    sellingPlanId,
  });

  const isUpdatingClass = isAdding || cartIsUpdating ? 'cursor-default' : '';

  return (
    <div>
      <button
        aria-label={buttonText}
        className={`btn-primary relative w-full ${isUpdatingClass} ${className}`}
        disabled={!!isSoldOut}
        onClick={handleAddToCart}
        type="button"
      >
        <span className={`${isAdding || isAdded ? 'invisible' : 'visible'}`}>
          {buttonText}
        </span>

        {isAdding && (
          <LoadingDots
            status="Adding to cart"
            withAbsolutePosition
            withStatusRole
          />
        )}

        {isAdded && (
          <span aria-live="assertive" role="status">
            Added To Cart
          </span>
        )}
      </button>

      {isPdp && subtext && (
        <p className="mt-1 text-center text-xs">{subtext}</p>
      )}
    </div>
  );
}

AddToCart.displayName = 'AddToCart';
