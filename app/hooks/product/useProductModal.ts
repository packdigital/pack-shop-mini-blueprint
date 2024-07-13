import {useCallback} from 'react';
import {useSearchParams} from '@remix-run/react';

export function useProductModal() {
  const [searchParams, setSearchParams] = useSearchParams();

  const openProductModal = useCallback(
    (handle: string, options?: Record<string, string>) => {
      if (!handle) return;
      const variantParams = new URLSearchParams();
      if (options) {
        Object.entries(options).forEach(([key, value]) => {
          variantParams.set(key, value);
        });
      }
      const productParam = `${handle}${
        variantParams ? `?${variantParams}` : ''
      }`;
      searchParams.set('product', productParam);
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const closeProductModal = useCallback(() => {
    searchParams.delete('product');
    setSearchParams(searchParams);
  }, [searchParams]);

  return {
    openProductModal,
    closeProductModal,
  };
}
