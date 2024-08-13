import {useCallback, useMemo} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {
  Product,
  ProductVariant,
  SelectedOption,
} from '@shopify/hydrogen-react/storefront-api-types';

export function useProductModal(
  {
    product,
    selectedVariant,
  }: {
    product?: Product | null;
    selectedVariant?: ProductVariant | null;
  } = {product: null, selectedVariant: null},
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const openProductUrl = useMemo(() => {
    if (!product) return '';
    const variantParams = new URLSearchParams();
    if (selectedVariant?.selectedOptions) {
      selectedVariant.selectedOptions.forEach(({name, value}) => {
        variantParams.set(name, value);
      });
    }
    const productParam = `${product.handle}${
      variantParams ? `?${variantParams}` : ''
    }`;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('product', productParam);
    return `?${newSearchParams}`;
  }, [product?.handle, selectedVariant, searchParams]);

  const closeProductUrl = useMemo(() => {
    if (product || !searchParams) return '';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('product');
    newSearchParams.delete('notifyMeFocused');
    return `?${newSearchParams}`;
  }, [searchParams]);

  const openProductModal = useCallback(
    (
      handle: string,
      selectedOptions?: SelectedOption[],
      additionalParams?: Record<string, string>,
    ) => {
      if (!handle) return;
      const variantParams = new URLSearchParams();
      if (selectedOptions) {
        selectedOptions.forEach(({name, value}) => {
          variantParams.set(name, value);
        });
      }
      const productParam = `${handle}${
        variantParams ? `?${variantParams}` : ''
      }`;
      searchParams.set('product', productParam);
      if (additionalParams) {
        Object.entries(additionalParams).forEach(([key, value]) => {
          searchParams.set(key, value);
        });
      }
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const closeProductModal = useCallback(() => {
    searchParams.delete('product');
    searchParams.delete('notifyMeFocused');
    setSearchParams(searchParams);
  }, [searchParams]);

  return {
    openProductUrl,
    closeProductUrl,
    openProductModal,
    closeProductModal,
  };
}
