import {useCallback, useEffect, useMemo, useState} from 'react';
import type {ProductOptionValue} from '@shopify/hydrogen/storefront-api-types';

import {COLOR_OPTION_NAME} from '~/lib/constants';
import type {SelectedProduct, SelectedVariant} from '~/lib/types';

interface UseColorVariantOptionsProps {
  initialProduct: SelectedProduct;
  initialProductColorOptions: ProductOptionValue[];
}

type VariantMapByColor = Record<string, SelectedVariant>;

export function useColorVariantOptions({
  initialProduct,
  initialProductColorOptions,
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
          return option.name === COLOR_OPTION_NAME;
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
  }, [initialProduct]);

  useEffect(() => {
    generateVariantMapByColor();
  }, [initialProduct]);

  return {colorOptions, variantMapByColor};
}
