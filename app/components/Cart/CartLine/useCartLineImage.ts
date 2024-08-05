import {useMemo} from 'react';
import type {CartLine} from '@shopify/hydrogen/storefront-api-types';

import type {Swatches} from '~/lib/types';

export function useCartLineImage({
  line,
  swatches,
}: {
  line: CartLine;
  swatches?: Swatches;
}) {
  const {merchandise} = {...line};

  return useMemo(() => {
    const hasMultipleColors =
      Number(
        merchandise?.product?.options?.find(({name}) => {
          return name === swatches?.swatchOptionName;
        })?.optionValues?.length,
      ) > 1;
    if (!hasMultipleColors) return merchandise?.image;

    const variantColor = merchandise.selectedOptions
      .find(({name}) => name === swatches?.swatchOptionName)
      ?.value?.toLowerCase();

    return variantColor
      ? merchandise.product.images?.nodes?.find(({altText}) => {
          const imageColor = altText?.toLowerCase().trim();
          return imageColor === variantColor;
        }) || merchandise.image
      : merchandise.image;
  }, [merchandise?.id, swatches?.swatchOptionName]);
}
