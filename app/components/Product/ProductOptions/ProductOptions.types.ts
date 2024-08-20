import type {
  Product,
  ProductOption,
  ProductOptionValue,
} from '@shopify/hydrogen/storefront-api-types';

import type {SelectedVariant, Swatches} from '~/lib/types';

export type OnSelect = ({
  selectedVariant,
  optionName,
  optionValue,
  fromGrouping,
}: {
  selectedVariant: SelectedVariant;
  optionName: string;
  optionValue: Pick<ProductOptionValue, 'name'>;
  fromGrouping?: boolean;
}) => void;

export interface ProductOptionsProps {
  isShoppableProductCard?: boolean;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (option: string, value: string) => void;
  swatches?: Swatches;
}

export interface ProductOptionValuesProps {
  isShoppableProductCard?: boolean;
  onSelect?: OnSelect;
  option: ProductOption;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  setSelectedOption: (name: string, value: string) => void;
  swatches?: Swatches;
}

export interface ProductOptionValuesLabelProps {
  isShoppableProductCard?: boolean;
  name: string;
  product: Product;
  selectedValue: string | null;
}
