import {ProductOptionValueButton} from './ProductOptionValueButton';
import {useProductOptionValue} from './useProductOptionValue';
import type {ProductOptionValueProps} from './ProductOptionValue.types';

export function ProductOptionValue({
  name,
  onSelect,
  optionValue,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatches,
}: ProductOptionValueProps) {
  const {
    isAvailable,
    isColor,
    isDisabled,
    isSelected,
    selectedVariantFromOptions,
  } = useProductOptionValue({
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
      onSelect={onSelect}
      selectedVariantFromOptions={selectedVariantFromOptions}
      setSelectedOption={setSelectedOption}
      swatch={swatch}
      optionValue={optionValue}
    />
  );
}

ProductOptionValue.displayName = 'ProductOptionValue';
