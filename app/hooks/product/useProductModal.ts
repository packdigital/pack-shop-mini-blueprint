import {useCallback} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {SelectedOption} from '@shopify/hydrogen-react/storefront-api-types';

export function useProductModal() {
  const [searchParams, setSearchParams] = useSearchParams();

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
    openProductModal,
    closeProductModal,
  };
}
