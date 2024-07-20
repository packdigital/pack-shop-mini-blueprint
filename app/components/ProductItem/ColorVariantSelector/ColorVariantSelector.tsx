import {useEffect, useMemo} from 'react';

import {COLOR_OPTION_NAME} from '~/lib/constants';
import type {SelectedProduct, SelectedVariant, SwatchesMap} from '~/lib/types';

import {ColorVariantOptions} from './ColorVariantOptions';

interface ColorVariantSelectorProps {
  enabledColorNameOnHover?: boolean;
  initialProduct: SelectedProduct;
  selectedVariant: SelectedVariant;
  setProductFromColorSelector: (product: SelectedProduct) => void;
  setVariantFromColorSelector: (variant: SelectedVariant | undefined) => void;
  swatchesMap?: SwatchesMap;
}

export function ColorVariantSelector({
  enabledColorNameOnHover,
  initialProduct,
  selectedVariant,
  setProductFromColorSelector,
  setVariantFromColorSelector,
  swatchesMap,
}: ColorVariantSelectorProps) {
  const initialProductColorOptions = useMemo(() => {
    return (
      initialProduct?.options?.find(
        (option) => option.name === COLOR_OPTION_NAME,
      )?.optionValues || []
    );
  }, [initialProduct]);

  const hasMultipleColors = initialProductColorOptions?.length > 1;

  // sets initial variant from initial color
  useEffect(() => {
    if (!initialProduct || !hasMultipleColors) return;
    setProductFromColorSelector(initialProduct);
    setVariantFromColorSelector(initialProduct.variants?.nodes?.[0]);
  }, [initialProduct?.id, hasMultipleColors]);

  return hasMultipleColors && selectedVariant ? (
    <div className="mt-3.5">
      <ColorVariantOptions
        enabledColorNameOnHover={enabledColorNameOnHover}
        initialProduct={initialProduct}
        initialProductColorOptions={initialProductColorOptions}
        selectedVariant={selectedVariant}
        setProductFromColorSelector={setProductFromColorSelector}
        setVariantFromColorSelector={setVariantFromColorSelector}
        swatchesMap={swatchesMap}
      />
    </div>
  ) : null;
}

ColorVariantSelector.displayName = 'ColorVariantSelector';
