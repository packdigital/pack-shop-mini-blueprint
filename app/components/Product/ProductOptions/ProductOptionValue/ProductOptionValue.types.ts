import type {
  Product,
  ProductOptionValue,
} from '@shopify/hydrogen/storefront-api-types';

import type {SelectedVariant, Swatch, Swatches} from '~/lib/types';

import type {OnSelect} from '../ProductOptions.types';

export interface ProductOptionValueProps {
  name: string;
  onSelect?: OnSelect;
  optionValue: ProductOptionValue;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (name: string, value: string) => void;
  swatches?: Swatches;
}

export interface ProductOptionValueButtonProps {
  isAvailable: boolean;
  isColor: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  name: string;
  onSelect?: OnSelect;
  optionValue: ProductOptionValue;
  selectedVariantFromOptions: SelectedVariant;
  setSelectedOption: (name: string, value: string) => void;
  swatch?: Swatch | null;
}

export interface InnerColorOptionValueProps {
  isAvailable: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  optionValue: ProductOptionValue;
  swatch?: Swatch | null;
}

export interface InnerOptionValueProps {
  isAvailable: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  optionValue: ProductOptionValue;
}
