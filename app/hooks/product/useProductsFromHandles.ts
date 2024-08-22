import {useEffect} from 'react';
import {useFetcher} from '@remix-run/react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

/**
 * Fetch products by handles
 * @param handles - Array of product handles
 * @param fetchOnMount - Determines when to fetch
 * @returns array of product items
 * @example
 * ```js
 * const products = useProductsFromHandles(['product-handle-1', 'product-handle-2']);
 * ```
 */

export function useProductsFromHandles(
  handles: string[] = [],
  fetchOnMount = true,
): Product[] {
  const fetcher = useFetcher<{products: Product[]}>({
    key: `products-from-handles:${handles.join(',')}`,
  });

  useEffect(() => {
    if (!fetchOnMount || !handles?.length || fetcher.data?.products) return;
    const searchParams = new URLSearchParams({handles: handles.join(',')});
    fetcher.load(`/api/products?${searchParams}`);
  }, [fetchOnMount, JSON.stringify(handles)]);

  return fetcher.data?.products?.filter(Boolean) || [];
}
