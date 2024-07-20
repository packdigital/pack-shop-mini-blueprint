import {useEffect} from 'react';
import {ProductProvider} from '@shopify/hydrogen-react';
import type {
  Product as ProductType,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';

import {AddToCart, Svg} from '~/components';
import {useDataLayerViewProduct} from '~/hooks';

import {Product} from '../Product';
import {ProductReviews} from '../ProductReviews';

interface ProductModalPanelProps {
  closeProductModal: () => void;
  product: ProductType;
  selectedVariant: ProductVariant;
}

export function ProductModalPanel({
  closeProductModal,
  product,
  selectedVariant,
}: ProductModalPanelProps) {
  /* set variant url param on selected variant change unless has one variant */
  useEffect(() => {
    if (!product || product.variants?.nodes?.length === 1 || !selectedVariant)
      return;

    const {origin, pathname, search} = window.location;

    const params = new URLSearchParams(search);
    const productParam = params.get('product');
    const variantParams = new URLSearchParams(productParam?.split('?')[1]);
    selectedVariant.selectedOptions?.forEach(({name, value}) => {
      variantParams.set(name, value);
    });
    params.set('product', `${product.handle}${`?${variantParams}`}`);

    const updatedUrl = `${origin}${pathname}?${params}`;

    window.history.replaceState(window.history.state, '', updatedUrl);
  }, [product?.handle, selectedVariant?.id]);

  useDataLayerViewProduct({
    product,
    selectedVariant,
  });

  return (
    <ProductProvider
      data={product}
      initialVariantId={selectedVariant?.id || null}
    >
      <section
        data-comp="product"
        className="flex h-full max-h-[calc(var(--viewport-height)-1rem)] flex-col justify-between"
      >
        <div className="flex justify-end border-b border-border">
          <button
            aria-label="Close modal"
            className="flex items-center gap-1 p-4"
            onClick={closeProductModal}
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
            <Product isModal product={product} />
          </div>

          <ProductReviews product={product} />
        </div>

        <div className="border-t border-border p-4">
          <AddToCart isPdp selectedVariant={selectedVariant} />
        </div>
      </section>
    </ProductProvider>
  );
}

ProductModalPanel.displayName = 'ProductModalPanel';
