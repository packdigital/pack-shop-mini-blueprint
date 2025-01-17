import {useCallback} from 'react';
import {useAnalytics} from '@shopify/hydrogen';

import {AnalyticsEvent} from '~/components/Analytics/constants';

import {ProductOptionValues} from './ProductOptionValues';
import type {OnSelect, ProductOptionsProps} from './ProductOptions.types';

export function ProductOptions({
  isShoppableProductCard,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatches,
}: ProductOptionsProps) {
  const {publish, shop} = useAnalytics();

  const handleSelect: OnSelect = useCallback(
    ({selectedVariant, optionName, optionValue, fromGrouping}) => {
      if (isShoppableProductCard) return;
      publish(AnalyticsEvent.PRODUCT_VARIANT_SELECTED, {
        selectedVariant,
        optionName,
        optionValue,
        fromGrouping,
        fromProductHandle: product.handle,
        shop,
      });
    },
    [isShoppableProductCard, product.handle, publish],
  );

  return (
    <div
      className={`theme-border-color theme-options flex flex-col ${
        isShoppableProductCard ? 'border-t-0' : ''
      }`}
    >
      {product.options?.map((option, index) => {
        return (
          <div
            key={index}
            className={`theme-border-color theme-option ${
              isShoppableProductCard ? 'theme-product-option' : ''
            }`}
          >
            <ProductOptionValues
              isShoppableProductCard={isShoppableProductCard}
              onSelect={handleSelect}
              option={option}
              product={product}
              selectedOptionsMap={selectedOptionsMap}
              setSelectedOption={setSelectedOption}
              swatches={swatches}
            />
          </div>
        );
      })}
    </div>
  );
}

ProductOptions.displayName = 'ProductOptions';
