import {useMemo} from 'react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {ProductStars} from '~/components';
import type {SelectedVariant, Settings} from '~/lib/types';
import {useMatchMedia, useVariantPrices} from '~/hooks';

interface ProductHeaderProps {
  isMobile?: boolean;
  product: Product;
  selectedVariant: SelectedVariant;
  settings: Settings['product'];
}

export function ProductHeader({
  isMobile,
  product,
  selectedVariant,
  settings,
}: ProductHeaderProps) {
  const {price, compareAtPrice} = useVariantPrices(selectedVariant);
  const {
    enabledStarRating = true,
    manualStarRating,
    starColor,
  } = {
    ...settings?.reviews,
  };
  const {primaryOptionName = 'Color', enabledOptionValueInPdpHeader = true} = {
    ...settings?.details,
  };
  const isMobileViewport = useMatchMedia('(max-width: 767px)');
  const isVisibleHeader =
    (isMobile && isMobileViewport) || (!isMobile && !isMobileViewport);

  const primaryOptionValue = useMemo(() => {
    return selectedVariant?.selectedOptions?.find(
      ({name}) => name === primaryOptionName?.trim(),
    )?.value;
  }, [primaryOptionName, selectedVariant]);

  return (
    <div
      className={`max-md:px-4 ${
        // remove if only one header placement is used
        isMobile ? 'md:hidden' : 'max-md:hidden'
      }`}
    >
      {enabledStarRating && (
        <div className="min-h-6">
          <button
            aria-label="Scroll to product reviews"
            onClick={() => {
              const reviews = document.getElementById('product-reviews');
              reviews?.scrollIntoView({behavior: 'smooth'});
            }}
            type="button"
          >
            <ProductStars
              id={product.id}
              color={starColor}
              manualStarRating={manualStarRating}
            />
          </button>
        </div>
      )}

      {/* ensure only one H1 is in the DOM at a time */}
      {/* remove ternary and only use <h1> if only one header placement is used */}
      {isVisibleHeader ? (
        <h1 className="text-h2 theme-heading">{product.title}</h1>
      ) : (
        <h2 className="text-h2 theme-heading">{product.title}</h2>
      )}

      {enabledOptionValueInPdpHeader && primaryOptionValue && (
        <h2 className="theme-heading min-h-6 text-base">
          {primaryOptionValue}
        </h2>
      )}

      <div className="mt-2 flex min-h-6 gap-2">
        {compareAtPrice && (
          <p className="line-through opacity-60">{compareAtPrice}</p>
        )}
        <p>{price}</p>
      </div>
    </div>
  );
}

ProductHeader.displayName = 'ProductHeader';
