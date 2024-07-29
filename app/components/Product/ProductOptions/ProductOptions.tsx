import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {useColorSwatches} from '~/hooks';

import {ProductOptionValues} from './ProductOptionValues';

interface ProductOptionsProps {
  isShoppableProductCard?: boolean;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (option: string, value: string) => void;
}

export function ProductOptions({
  isShoppableProductCard,
  product,
  selectedOptionsMap,
  setSelectedOption,
}: ProductOptionsProps) {
  const swatchesMap = useColorSwatches();

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
              swatchesMap={swatchesMap}
            />
          </div>
        );
      })}
    </div>
  );
}

ProductOptions.displayName = 'ProductOptions';
