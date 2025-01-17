import {useCallback, useEffect, useState} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import type {
  AttributeInput,
  ProductVariant,
  SellingPlan,
} from '@shopify/hydrogen/storefront-api-types';

import {addToCartDefaults} from '~/settings/product';
import {useMenu, useSettings} from '~/hooks';

/**
 * Add to cart hook
 * @param addToCartTextOverride - Add to cart button text override
 * @param attributes - Array of attributes
 * @param quantity - Quantity
 * @param selectedVariant - Selected variant
 * @param sellingPlanId - Selling plan id
 * @returns Add to cart hook return
 * @example
 * ```tsx
 * const {buttonText, cartIsUpdating, handleAddToCart, isAdded, isAdding, isSoldOut, subtext} = useAddToCart({
 *   addToCartText: 'Add to cart!',
 *   attributes: [{name: 'Color', value: 'Red'}],
 *   quantity: 1,
 *   selectedVariant: product.variants[0],
 * });
 * ```
 */

interface UseAddToCartProps {
  addToCartText?: string;
  attributes?: AttributeInput[];
  enabledInlineNotifyMe?: boolean;
  quantity?: number;
  notifyMeText?: string;
  selectedVariant?: ProductVariant | null;
  sellingPlanId?: SellingPlan['id'];
}

interface UseAddToCartReturn {
  buttonText: string;
  buttonStyle: string;
  cartIsUpdating: boolean;
  enabledInlinePrice: boolean;
  handleAddToCart: () => void;
  isAdded: boolean;
  isAdding: boolean;
  isNotifyMe: boolean;
  isSoldOut: boolean;
  subtext: string;
}

export function useAddToCart({
  addToCartText: addToCartTextOverride = '',
  attributes,
  enabledInlineNotifyMe = false,
  quantity = 1,
  notifyMeText: passedNotifyMeText = '',
  selectedVariant = null,
  sellingPlanId,
}: UseAddToCartProps): UseAddToCartReturn {
  const {error, linesAdd, status} = useCart();
  const {product: productSettings} = useSettings();
  const {openCart} = useMenu();

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const {
    preorderText = addToCartDefaults.preorderText,
    soldOutText = addToCartDefaults.soldOutText,
    addToCartText = addToCartDefaults.addToCartText,
    enabledInlinePrice = addToCartDefaults.enabledInlinePrice,
    buttonStyle = addToCartDefaults.buttonStyle,
    subtext = addToCartDefaults.subtext,
  } = {
    ...productSettings?.addToCart,
  };

  const enabledNotifyMe =
    enabledInlineNotifyMe && (productSettings?.backInStock?.enabled ?? true);
  const variantIsSoldOut = selectedVariant && !selectedVariant.availableForSale;
  const variantIsPreorder = !!selectedVariant?.currentlyNotInStock;
  const isNotifyMe = !!variantIsSoldOut && enabledNotifyMe;
  const isSoldOut = !!variantIsSoldOut;

  let buttonText = '';
  if (variantIsPreorder) {
    buttonText = preorderText || 'Preorder';
  } else if (variantIsSoldOut) {
    buttonText = enabledNotifyMe
      ? passedNotifyMeText ||
        productSettings?.backInStock?.notifyMeText ||
        'Notify Me When Available'
      : soldOutText || 'Sold Out';
  } else {
    buttonText = addToCartTextOverride || addToCartText || 'Add To Cart';
  }

  const cartIsUpdating = status === 'creating' || status === 'updating';

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant?.id || isAdding || cartIsUpdating) return;
    setIsAdding(true);
    linesAdd([
      {
        attributes,
        merchandiseId: selectedVariant.id,
        quantity,
        sellingPlanId,
      },
    ]);
  }, [
    attributes,
    isAdding,
    linesAdd,
    quantity,
    selectedVariant?.id,
    sellingPlanId,
    status,
  ]);

  useEffect(() => {
    if (isAdding && status === 'idle') {
      setIsAdding(false);
      setIsAdded(true);
      openCart();
      setTimeout(() => setIsAdded(false), 1000);
    }
  }, [status, isAdding]);

  useEffect(() => {
    if (!error) return;
    console.error('@shopify/hydrogen-react:useCart', error);
  }, [error]);

  return {
    buttonText,
    buttonStyle: buttonStyle || 'theme-btn-primary',
    cartIsUpdating, // cart is updating
    enabledInlinePrice,
    handleAddToCart,
    isAdded, // line is added (true for only a second)
    isAdding, // line is adding
    isNotifyMe,
    isSoldOut,
    subtext,
  };
}
