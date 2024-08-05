import type {
  Product,
  ProductOptionValue as ProductOptionValueType,
} from '@shopify/hydrogen/storefront-api-types';

import type {Swatches} from '~/lib/types';

import {ProductOptionValueButton} from './ProductOptionValueButton';
import {useProductOptionValue} from './useProductOptionValue';

interface ProductOptionValueProps {
  name: string;
  optionValue: ProductOptionValueType;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (name: string, value: string) => void;
  swatches?: Swatches;
}

export function ProductOptionValue({
  name,
  optionValue,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatches,
}: ProductOptionValueProps) {
  const {isAvailable, isColor, isDisabled, isSelected} = useProductOptionValue({
    name,
    product,
    selectedOptionsMap,
    optionValue,
    swatches,
  });

  const swatch = swatches?.swatchesMap?.[optionValue.name.toLowerCase()];

  return (
    <ProductOptionValueButton
      isAvailable={isAvailable}
      isColor={isColor}
      isDisabled={isDisabled}
      isSelected={isSelected}
      name={name}
      setSelectedOption={setSelectedOption}
      swatch={swatch}
      optionValue={optionValue}
    />
  );
}

ProductOptionValue.displayName = 'ProductOptionValue';
