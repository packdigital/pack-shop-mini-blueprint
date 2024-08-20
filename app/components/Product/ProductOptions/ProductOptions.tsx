import {useCallback} from 'react';
import {useAnalytics} from '@shopify/hydrogen';

import {PackEventName} from '~/components/PackAnalytics/constants';

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
      publish(PackEventName.PRODUCT_VARIANT_SELECTED, {
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
    <div className="flex flex-col">
      {product.options?.map((option, index) => {
        return (
          <div
            key={index}
            className={`theme-border-color border-b py-4 first:border-t ${
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
