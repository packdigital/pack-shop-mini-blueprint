import type {Product} from '@shopify/hydrogen/storefront-api-types';

import type {Swatches} from '~/lib/types';

import {ProductOptionValues} from './ProductOptionValues';

interface ProductOptionsProps {
  isShoppableProductCard?: boolean;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (option: string, value: string) => void;
  swatches?: Swatches;
}

export function ProductOptions({
  isShoppableProductCard,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatches,
}: ProductOptionsProps) {
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
