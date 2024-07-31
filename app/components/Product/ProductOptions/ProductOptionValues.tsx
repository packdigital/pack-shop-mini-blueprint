import type {
  Product,
  ProductOption,
} from '@shopify/hydrogen/storefront-api-types';

import {COLOR_OPTION_NAME} from '~/lib/constants';
import type {SwatchesMap} from '~/lib/types';

import {ProductOptionValuesLabel} from './ProductOptionValuesLabel';
import {ProductOptionValue} from './ProductOptionValue';

interface ProductOptionValueProps {
  isShoppableProductCard?: boolean;
  option: ProductOption;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (name: string, value: string) => void;
  swatchesMap: SwatchesMap;
}

export function ProductOptionValues({
  isShoppableProductCard,
  option,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatchesMap,
}: ProductOptionValueProps) {
  const {name = '', optionValues} = {...option};

  return (
    <div>
      <ProductOptionValuesLabel
        isShoppableProductCard={isShoppableProductCard}
        name={name}
        product={product}
        selectedValue={selectedOptionsMap?.[name]}
      />

      <ul
        className={`flex flex-wrap gap-2 ${
          isShoppableProductCard ? 'theme-product-option-values' : ''
        }`}
      >
        {optionValues?.map((optionValue) => {
          const isColor = name === COLOR_OPTION_NAME;
          return (
            <li
              key={optionValue.name}
              className={`${
                isColor ? 'theme-color-option-value-list-item' : ''
              }`}
            >
              <ProductOptionValue
                name={name}
                product={product}
                selectedOptionsMap={selectedOptionsMap}
                setSelectedOption={setSelectedOption}
                swatchesMap={swatchesMap}
                optionValue={optionValue}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ProductOptionValues.displayName = 'ProductOptionValues';
