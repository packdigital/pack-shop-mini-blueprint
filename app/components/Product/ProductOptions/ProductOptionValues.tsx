import type {
  Product,
  ProductOption,
} from '@shopify/hydrogen/storefront-api-types';

import type {SwatchesMap} from '~/lib/types';

import {ProductOptionValuesLabel} from './ProductOptionValuesLabel';
import {ProductOptionValue} from './ProductOptionValue';

interface ProductOptionValueProps {
  option: ProductOption;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (name: string, value: string) => void;
  swatchesMap: SwatchesMap;
}

export function ProductOptionValues({
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
        name={name}
        selectedValue={selectedOptionsMap?.[name]}
      />

      <ul className="flex flex-wrap gap-2">
        {optionValues?.map((optionValue) => {
          return (
            <li key={optionValue.name}>
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
