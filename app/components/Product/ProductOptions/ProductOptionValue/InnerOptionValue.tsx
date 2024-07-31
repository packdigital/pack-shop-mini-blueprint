import type {ProductOptionValue} from '@shopify/hydrogen/storefront-api-types';

interface InnerOptionValueProps {
  isAvailable: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  optionValue: ProductOptionValue;
}

export function InnerOptionValue({
  isAvailable,
  isDisabled,
  isSelected,
  optionValue,
}: InnerOptionValueProps) {
  const validClass = !isDisabled
    ? 'md:hover:border-black'
    : 'cursor-not-allowed';
  const selectedClass = isSelected ? 'theme-option-value-selected' : '';
  const unavailableClass = !isAvailable
    ? 'theme-option-value-unavailable after:h-px after:w-[150%] after:rotate-[135deg] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 overflow-hidden'
    : '';

  return (
    <div
      className={`theme-option-value relative flex items-center justify-center transition ${validClass} ${unavailableClass} ${selectedClass}`}
    >
      {optionValue.name}
    </div>
  );
}

InnerOptionValue.displayName = 'InnerOptionValue';
