import {InnerColorOptionValue} from './InnerColorOptionValue';
import {InnerOptionValue} from './InnerOptionValue';
import type {ProductOptionValueButtonProps} from './ProductOptionValue.types';

export function ProductOptionValueButton({
  isAvailable,
  isColor,
  isDisabled,
  isSelected,
  name,
  onSelect,
  optionValue,
  selectedVariantFromOptions,
  setSelectedOption,
  swatch,
}: ProductOptionValueButtonProps) {
  return (
    <button
      aria-label={optionValue.name}
      className="theme-option-value-button"
      disabled={isDisabled}
      onClick={() => {
        if (isSelected) return;
        setSelectedOption(name, optionValue.name);
        if (typeof onSelect === 'function') {
          onSelect({
            selectedVariant: selectedVariantFromOptions,
            optionName: name,
            optionValue,
          });
        }
      }}
      type="button"
    >
      {isColor ? (
        <InnerColorOptionValue
          isAvailable={isAvailable}
          isDisabled={isDisabled}
          isSelected={isSelected}
          swatch={swatch}
          optionValue={optionValue}
        />
      ) : (
        <InnerOptionValue
          isAvailable={isAvailable}
          isDisabled={isDisabled}
          isSelected={isSelected}
          optionValue={optionValue}
        />
      )}
    </button>
  );
}

ProductOptionValueButton.displayName = 'ProductOptionValueButton';
