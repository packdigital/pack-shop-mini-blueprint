import {useEffect, useMemo} from 'react';

import type {SelectedProduct, SelectedVariant, Swatches} from '~/lib/types';

import {ColorVariantOptions} from './ColorVariantOptions';

interface ColorVariantSelectorProps {
  enabledColorNameOnHover?: boolean;
  initialProduct: SelectedProduct;
  selectedVariant: SelectedVariant;
  setProductFromColorSelector: (product: SelectedProduct) => void;
  setVariantFromColorSelector: (variant: SelectedVariant | undefined) => void;
  swatches?: Swatches;
}

export function ColorVariantSelector({
  enabledColorNameOnHover,
  initialProduct,
  selectedVariant,
  setProductFromColorSelector,
  setVariantFromColorSelector,
  swatches,
}: ColorVariantSelectorProps) {
  const initialProductColorOptions = useMemo(() => {
    return (
      initialProduct?.options?.find(
        (option) => option.name === swatches?.swatchOptionName,
      )?.optionValues || []
    );
  }, [initialProduct, swatches?.swatchOptionName]);

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
        swatches={swatches}
      />
    </div>
  ) : null;
}

ColorVariantSelector.displayName = 'ColorVariantSelector';
