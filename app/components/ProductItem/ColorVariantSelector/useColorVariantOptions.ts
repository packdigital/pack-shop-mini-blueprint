import {useCallback, useEffect, useMemo, useState} from 'react';
import type {ProductOptionValue} from '@shopify/hydrogen/storefront-api-types';

import type {SelectedProduct, SelectedVariant, Swatches} from '~/lib/types';

interface UseColorVariantOptionsProps {
  initialProduct: SelectedProduct;
  initialProductColorOptions: ProductOptionValue[];
  swatches?: Swatches;
}

type VariantMapByColor = Record<string, SelectedVariant>;

export function useColorVariantOptions({
  initialProduct,
  initialProductColorOptions,
  swatches,
}: UseColorVariantOptionsProps) {
  const [variantMapByColor, setVariantMapByColor] = useState<
    VariantMapByColor | null | undefined
  >(null);

  const colorOptions = useMemo(() => {
    return initialProductColorOptions;
  }, [initialProductColorOptions]);

  const generateVariantMapByColor = useCallback(() => {
    const _variantMapByColor = initialProduct?.variants?.nodes?.reduce(
      (acc: VariantMapByColor, variant) => {
        const variantColor = variant.selectedOptions.find((option) => {
          return option.name === swatches?.swatchOptionName;
        })?.value;
        if (!variantColor) return acc;
        if (acc[variantColor]) return acc;
        return {
          ...acc,
          [variantColor]: variant,
        };
      },
      {},
    );
    setVariantMapByColor(_variantMapByColor);
  }, [initialProduct, swatches?.swatchOptionName]);

  useEffect(() => {
    generateVariantMapByColor();
  }, [initialProduct]);

  return {colorOptions, variantMapByColor};
}
