import {useMemo, useState} from 'react';
import type {ProductOptionValue} from '@shopify/hydrogen-react/storefront-api-types';

import type {ColorVariantOptionsProps} from '../ProductItem.types';

import {ColorVariantOption} from './ColorVariantOption';
import {useColorVariantOptions} from './useColorVariantOptions';

export function ColorVariantOptions({
  enabledColorNameOnHover,
  initialProduct,
  initialProductColorOptions,
  selectedVariant,
  setProductFromColorSelector,
  setVariantFromColorSelector,
  swatches,
}: ColorVariantOptionsProps) {
  const {colorOptions, variantMapByColor} = useColorVariantOptions({
    initialProduct,
    initialProductColorOptions,
    swatches,
  });

  const [maxCount, setMaxCount] = useState(7);

  const selectedVariantColor = useMemo(() => {
    return selectedVariant?.selectedOptions.find(
      (option) => option.name === swatches?.swatchOptionName,
    )?.value;
  }, [selectedVariant, swatches?.swatchOptionName]);

  const slicedColorOptions: ProductOptionValue[] = colorOptions.slice(
    0,
    maxCount,
  );
  const remainingColorCount = colorOptions.length - slicedColorOptions.length;

  return (
    <ul className="flex flex-wrap gap-1">
      {slicedColorOptions.map((color, index) => {
        const productForColor = initialProduct;
        const variantForColor = variantMapByColor?.[color.name];

        return productForColor && variantForColor ? (
          <li key={index}>
            <ColorVariantOption
              color={color}
              enabledColorNameOnHover={enabledColorNameOnHover}
              onClick={() => {
                setProductFromColorSelector(productForColor);
                setVariantFromColorSelector(variantForColor);
              }}
              selectedVariantColor={selectedVariantColor}
              swatches={swatches}
            />
          </li>
        ) : null;
      })}

      {remainingColorCount > 0 && (
        <li className="flex">
          <button
            aria-label={`Show ${remainingColorCount} more color options`}
            className="whitespace-nowrap text-2xs"
            onClick={() => setMaxCount(colorOptions.length)}
            type="button"
          >
            + {remainingColorCount} more
          </button>
        </li>
      )}
    </ul>
  );
}

ColorVariantOptions.displayName = 'ColorVariantOptions';
