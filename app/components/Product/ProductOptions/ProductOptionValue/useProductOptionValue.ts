import {useMemo} from 'react';
import equal from 'fast-deep-equal';
import type {
  Product,
  ProductOptionValue,
} from '@shopify/hydrogen/storefront-api-types';

import type {SelectedVariant, Swatches} from '~/lib/types';

interface UseProductOptionValueProps {
  name: string;
  optionValue: ProductOptionValue;
  product: Product;
  selectedOptionsMap: Record<string, string>;
  swatches?: Swatches;
}

interface UseProductOptionValueReturn {
  isAvailable: boolean;
  isColor: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  selectedVariantFromOptions: SelectedVariant;
}

export function useProductOptionValue({
  name,
  optionValue,
  product,
  selectedOptionsMap,
  swatches,
}: UseProductOptionValueProps): UseProductOptionValueReturn {
  const newSelectedOptions = useMemo(() => {
    return selectedOptionsMap
      ? {...selectedOptionsMap, [name]: optionValue.name}
      : null;
  }, [name, selectedOptionsMap, optionValue.name]);

  const selectedVariantFromOptions = useMemo(() => {
    if (!newSelectedOptions) return null;

    return product.variants.nodes.find(({selectedOptions}) => {
      const selectedOptionsMap = selectedOptions.reduce(
        (acc, {name: optionName, value}) => {
          return {...acc, [optionName]: value};
        },
        {},
      );
      return equal(newSelectedOptions, selectedOptionsMap);
    });
  }, [newSelectedOptions, product.id]);

  const isAvailable = !!selectedVariantFromOptions?.availableForSale;
  const isColor = name === swatches?.swatchOptionName;
  const isDisabled = !selectedVariantFromOptions;
  const isSelected = Boolean(selectedOptionsMap?.[name] === optionValue.name);

  return {
    isAvailable,
    isColor,
    isDisabled,
    isSelected,
    selectedVariantFromOptions,
  };
}
