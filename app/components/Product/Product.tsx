import {useMemo} from 'react';
import {useProduct} from '@shopify/hydrogen-react';
import type {Product as ProductType} from '@shopify/hydrogen/storefront-api-types';

import {useSettings, usePromobar, useSwatches, useVariantPrices} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

import {ProductDetails} from './ProductDetails';
import {ProductMetafields} from './ProductMetafields';
import {ProductHeader} from './ProductHeader';
import {ProductMedia} from './ProductMedia';

interface ProductProps {
  isModal?: boolean;
  onClose?: () => void;
  product: ProductType;
}

export function Product({isModal, product}: ProductProps) {
  const {selectedVariant} = useProduct() as {
    selectedVariant: SelectedVariant;
  };
  const {product: productSettings} = useSettings();
  const {pdpStickyClass} = usePromobar();
  const swatches = useSwatches();
  const prices = useVariantPrices(selectedVariant);

  const selectedVariantColor = useMemo(() => {
    return selectedVariant?.selectedOptions?.find(
      ({name}) => name === swatches?.swatchOptionName,
    )?.value;
  }, [selectedVariant, swatches?.swatchOptionName]);

  const {aspectRatioType, manualAspectRatio} = {
    ...productSettings?.media,
  };

  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-y-5 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-4">
      {/* mobile header placement */}
      {/* note: remove this component if mobile header shares same placement as desktop */}
      <ProductHeader
        isMobile
        prices={prices}
        product={product}
        selectedVariant={selectedVariant}
        settings={productSettings}
      />

      <div>
        <div
          className={`md:sticky ${
            isModal ? 'md:top-10 lg:top-12' : pdpStickyClass
          }`}
        >
          <ProductMedia
            aspectRatioType={aspectRatioType}
            manualAspectRatio={manualAspectRatio}
            product={product}
            selectedVariant={selectedVariant}
            selectedVariantColor={selectedVariantColor}
            swatches={swatches}
          />
        </div>
      </div>

      <div className="max-md:px-4 md:pl-4 lg:pl-10 xl:pl-16">
        <div
          className={`flex flex-col gap-y-4 md:sticky ${
            isModal ? 'md:top-10 lg:top-12' : pdpStickyClass
          }`}
        >
          {/* desktop header placement */}
          <ProductHeader
            product={product}
            prices={prices}
            selectedVariant={selectedVariant}
            settings={productSettings}
          />

          <ProductDetails
            isModal={isModal}
            prices={prices}
            product={product}
            selectedVariant={selectedVariant}
            swatches={swatches}
          />

          <ProductMetafields product={product} />
        </div>
      </div>
    </div>
  );
}

Product.displayName = 'Product';
