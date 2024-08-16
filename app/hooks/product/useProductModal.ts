import {useCallback, useMemo} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';

export function useProductModal(
  {
    product,
    selectedVariant,
    additionalParams,
  }: {
    product?: Product | null;
    selectedVariant?: ProductVariant | null;
    additionalParams?: Record<string, string>;
  } = {product: null, selectedVariant: null},
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const openProductUrl = useMemo(() => {
    const handle = selectedVariant?.product?.handle || product?.handle;
    if (!handle) return '';
    const variantParams = new URLSearchParams();
    if (selectedVariant?.selectedOptions) {
      selectedVariant.selectedOptions.forEach(({name, value}) => {
        variantParams.set(name, value);
      });
    }
    const productParam = `${handle}${variantParams ? `?${variantParams}` : ''}`;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('product', productParam);
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        newSearchParams.set(key, value);
      });
    }
    return `?${newSearchParams}`;
  }, [
    product?.handle,
    selectedVariant?.id,
    searchParams,
    JSON.stringify(additionalParams),
  ]);

  const closeProductUrl = useMemo(() => {
    if (product || !searchParams) return '';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('product');
    newSearchParams.delete('notifyMeFocused');
    return `?${newSearchParams}`;
  }, [searchParams]);

  const closeProductModal = useCallback(() => {
    searchParams.delete('product');
    searchParams.delete('notifyMeFocused');
    setSearchParams(searchParams);
  }, [searchParams]);

  return {
    openProductUrl,
    closeProductUrl,
    closeProductModal,
  };
}
