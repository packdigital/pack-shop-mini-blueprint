import {useEffect} from 'react';
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
  buttonStyle?: string;
  containerClassName?: string;
  className?: string;
  enabledInlineNotifyMe?: boolean;
  isPdp?: boolean;
  quantity?: number;
  onAddToCart?: () => void;
  price?: string;
  notifyMeText?: string;
  selectedVariant: SelectedVariant;
  sellingPlanId?: SellingPlan['id'];
}

export function AddToCart({
  addToCartText = '',
  attributes,
  buttonStyle: passedButtonStyle,
  containerClassName = '',
  className = '',
  enabledInlineNotifyMe = false,
  isPdp = false,
  quantity = 1,
  onAddToCart,
  price,
  notifyMeText,
  selectedVariant,
  sellingPlanId,
}: AddToCartProps) {
  const {
    buttonText,
    buttonStyle,
    cartIsUpdating,
    enabledInlinePrice,
    isAdded,
    isAdding,
    isNotifyMe,
    isSoldOut,
    subtext,
    handleAddToCart,
    handleNotifyMe,
  } = useAddToCart({
    addToCartText,
    attributes,
    enabledInlineNotifyMe,
    quantity,
    notifyMeText,
    selectedVariant,
    sellingPlanId,
  });

  const isUpdatingClass = isAdding || cartIsUpdating ? 'cursor-default' : '';
  const isNotifyMeClass = isNotifyMe ? 'theme-btn-disabled' : '';

  useEffect(() => {
    if (isAdded && onAddToCart) {
      onAddToCart();
    }
  }, [isAdded, onAddToCart]);

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <button
        aria-label={buttonText}
        className={`relative w-full ${isUpdatingClass} ${
          passedButtonStyle || buttonStyle
        } ${isNotifyMeClass} ${className}`}
        disabled={!!isSoldOut && !isNotifyMe}
        onClick={() => {
          if (isNotifyMe) {
            handleNotifyMe();
          } else {
            handleAddToCart();
          }
        }}
        type="button"
      >
        <span className={`${isAdding || isAdded ? 'invisible' : 'visible'}`}>
          {buttonText}
          <span className="font-normal">
            {enabledInlinePrice && price ? ` - ${price}` : ''}
          </span>
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
