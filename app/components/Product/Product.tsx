import {useEffect, useMemo} from 'react';
import {useProduct} from '@shopify/hydrogen-react';
import type {Product as ProductType} from '@shopify/hydrogen/storefront-api-types';

import {AddToCart, Svg} from '~/components';
import {COLOR_OPTION_NAME} from '~/lib/constants';
import {useLocale, useSettings} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

import {ProductDetails} from './ProductDetails';
import {ProductMetafields} from './ProductMetafields';
import {ProductHeader} from './ProductHeader';
import {ProductMedia} from './ProductMedia';
import {ProductReviews} from './ProductReviews';

interface ProductProps {
  onClose: () => void;
  product: ProductType;
}

export function Product({onClose, product}: ProductProps) {
  const {selectedVariant} = useProduct() as {
    selectedVariant: SelectedVariant;
  };
  const {pathPrefix} = useLocale();
  const {header, product: productSettings} = useSettings();

  const selectedVariantColor = useMemo(() => {
    return selectedVariant?.selectedOptions?.find(
      ({name}) => name === COLOR_OPTION_NAME,
    )?.value;
  }, [selectedVariant]);

  /* set variant url param on selected variant change unless has one variant */
  useEffect(() => {
    if (product.variants.nodes.length === 1 || !selectedVariant) return;

    const {origin, pathname, search} = window.location;

    const params = new URLSearchParams(search);
    const productParam = params.get('product');
    const variantParams = new URLSearchParams(productParam?.split('?')[1]);
    selectedVariant.selectedOptions?.forEach(({name, value}) => {
      variantParams.set(name, value);
    });
    params.set('product', `${product.handle}${`?${variantParams}`}`);

    const updatedUrl = `${origin}${pathPrefix}${pathname}?${params}`;

    window.history.replaceState(window.history.state, '', updatedUrl);
  }, [product.handle, selectedVariant?.id]);

  const stickyPromobar =
    header?.promobar?.enabled && !header?.promobar?.autohide;
  const stickyTopClass = stickyPromobar
    ? 'md:top-[calc(var(--header-height-desktop)+var(--promobar-height-desktop)+2.5rem)] xl:top-[calc(var(--header-height-desktop)+var(--promobar-height-desktop)+3rem)]'
    : 'md:top-[calc(var(--header-height-desktop)+2.5rem)] xl:top-[calc(var(--header-height-desktop)+3rem)]';

  return (
    <section
      data-comp="product"
      className="flex h-full max-h-[calc(var(--viewport-height)-1rem)] flex-col justify-between"
    >
      <div className="flex justify-end border-b border-border">
        <button
          aria-label="Close modal"
          className="flex items-center gap-1 p-4"
          onClick={onClose}
          type="button"
        >
          <span>Close</span>
          <Svg
            className="w-4 text-text"
            src="/svgs/close.svg#close"
            title="Close"
            viewBox="0 0 24 24"
          />
        </button>
      </div>

      <div className="scrollbar-hide relative flex-1 overflow-y-auto">
        <div className="md:px-contained py-6 md:py-10 lg:py-12">
          <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-y-5 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-y-4">
            {/* mobile header placement */}
            {/* note: remove this component if mobile header shares same placement as desktop */}
            <ProductHeader
              isMobile
              product={product}
              selectedVariant={selectedVariant}
              selectedVariantColor={selectedVariantColor}
              settings={productSettings}
            />

            <div>
              <div className={`md:sticky ${stickyTopClass}`}>
                <ProductMedia
                  product={product}
                  selectedVariant={selectedVariant}
                  selectedVariantColor={selectedVariantColor}
                />
              </div>
            </div>

            <div className="max-md:px-4 md:pl-4 lg:pl-10 xl:pl-16">
              <div
                className={`flex flex-col gap-y-4 md:sticky ${stickyTopClass}`}
              >
                {/* desktop header placement */}
                <ProductHeader
                  product={product}
                  selectedVariant={selectedVariant}
                  selectedVariantColor={selectedVariantColor}
                  settings={productSettings}
                />

                <ProductDetails
                  enabledQuantitySelector={
                    productSettings?.quantitySelector?.enabled
                  }
                  product={product}
                  selectedVariant={selectedVariant}
                />

                <ProductMetafields product={product} />
              </div>
            </div>
          </div>
        </div>

        <ProductReviews product={product} />
      </div>

      <div className="border-t border-border p-4">
        <AddToCart isPdp selectedVariant={selectedVariant} />
      </div>
    </section>
  );
}

Product.displayName = 'Product';
