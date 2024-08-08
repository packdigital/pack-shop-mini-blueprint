import {useCallback, useEffect, useState} from 'react';
import {useProduct} from '@shopify/hydrogen-react';
import type {Product as ProductType} from '@shopify/hydrogen/storefront-api-types';

import {AddToCart, QuantitySelector, Svg} from '~/components';
import {useGlobal, useSettings} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

import {Product} from '../Product';
import {ProductReviews} from '../ProductReviews';

interface ProductModalPanelProps {
  closeProductModal: () => void;
  product: ProductType;
}

export function ProductModalPanel({
  closeProductModal,
  product,
}: ProductModalPanelProps) {
  const {product: productSettings} = useSettings();
  const {closeAll} = useGlobal();
  const {selectedVariant} = useProduct() as {
    selectedVariant: SelectedVariant;
  };

  const [quantity, setQuantity] = useState(1);

  const {enabledQuantitySelector = false} = {...productSettings?.addToCart};
  const {enabledReviewsWidget = false} = {
    ...productSettings?.reviews,
  };

  const handleDecrement = useCallback(() => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  }, [quantity]);

  const handleIncrement = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity]);

  useEffect(() => {
    if (!enabledQuantitySelector) return undefined;
    return () => {
      setQuantity(1);
    };
  }, [enabledQuantitySelector]);

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

  /* ensure close modal and cart on mount */
  useEffect(() => {
    closeAll();
  }, []);

  return (
    <section
      data-comp="product"
      className="flex h-full max-h-[calc(var(--viewport-height,100vh)-1rem)] flex-col justify-between"
    >
      <div className="theme-border-color flex justify-end border-b">
        <button
          aria-label="Close modal"
          className="flex items-center gap-1 p-4"
          onClick={closeProductModal}
          type="button"
        >
          <span>Close</span>
          <Svg
            className="theme-text-color w-4"
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

        {enabledReviewsWidget && <ProductReviews product={product} />}
      </div>

      <div className="theme-border-color flex items-center gap-2.5 border-t p-4">
        {enabledQuantitySelector && (
          <QuantitySelector
            disableDecrement={quantity === 1}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            productTitle={product.title}
            quantity={quantity}
          />
        )}

        <AddToCart
          containerClassName="flex-1"
          isPdp
          onAddToCart={closeProductModal}
          quantity={quantity}
          selectedVariant={selectedVariant}
        />
      </div>
    </section>
  );
}

ProductModalPanel.displayName = 'ProductModalPanel';
