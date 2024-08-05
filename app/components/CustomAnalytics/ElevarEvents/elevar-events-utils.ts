import type {
  CartLine,
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';

const STOREFRONT_NAME =
  (typeof document !== 'undefined' && window.ENV?.SITE_TITLE) || 'Storefront';

export const returnKeyValueIfNotUndefined = (key: string, value?: any) => {
  return value ? {[key]: value} : {};
};

export const mapProductItemProduct =
  (list = '') =>
  (product: Product, index = 0) => {
    try {
      if (!product) return null;
      const firstVariant = product.variants?.nodes?.[0];

      return {
        id: firstVariant?.sku || '',
        name: product.title || '',
        brand: product.vendor || STOREFRONT_NAME,
        category: product.productType || '',
        variant: firstVariant?.title || '',
        price: firstVariant?.price?.amount || '',
        list,
        product_id: product.id?.split('/').pop() || '',
        variant_id: firstVariant?.id?.split('/').pop() || '',
        compare_at_price: firstVariant?.compareAtPrice?.amount || 'undefined',
        image: product.featuredImage?.url || '',
        position: index + 1,
        url: `/products/${product.handle}`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      console.error('DataLayer:mapProductItemProduct error', message);
      console.error('DataLayer:mapProductItemProduct product', product);
      return null;
    }
  };

export const mapProductItemVariant =
  (list = '') =>
  (variant: ProductVariant & {index: number}, index = 0) => {
    try {
      if (!variant) return null;

      return {
        id: variant.sku || '',
        name: variant.product.title || '',
        brand: variant.product.vendor || STOREFRONT_NAME,
        category: variant.product.productType || '',
        variant: variant.title || '',
        price: `${variant.price?.amount || ''}`,
        list,
        product_id: variant.product.id?.split('/').pop() || '',
        variant_id: variant.id?.split('/').pop() || '',
        compare_at_price: `${variant.compareAtPrice?.amount || 'undefined'}`,
        image: variant.image?.url || '',
        position: (variant.index ?? index) + 1,
        url: `/products/${variant.product.handle}`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      console.error('DataLayer:mapProductItemVariant error', message);
      console.error('DataLayer:mapProductItemVariant variant', variant);
      return null;
    }
  };

export const mapProductPageVariant =
  (list = '') =>
  (variant: ProductVariant) => {
    try {
      if (!variant) return null;

      const params = new URLSearchParams('');
      variant.selectedOptions?.forEach(({name, value}) => {
        params.set(name, value);
      });

      return {
        id: variant.sku || '',
        name: variant.product.title || '',
        brand: variant.product.vendor || STOREFRONT_NAME,
        category: variant.product.productType || '',
        variant: variant.title || '',
        price: `${variant.price?.amount || ''}`,
        list,
        product_id: variant.product.id?.split('/').pop() || '',
        variant_id: variant.id?.split('/').pop() || '',
        compare_at_price: `${variant.compareAtPrice?.amount || 'undefined'}`,
        image: variant.image?.url || '',
        url: `/products/${variant.product.handle}?${params}`,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      console.error('DataLayer:mapProductPageVariant error', message);
      console.error('DataLayer:mapProductPageVariant variant', variant);
      return null;
    }
  };

export const mapCartLine =
  (list = '') =>
  (line: CartLine & {index?: number}, index = 0) => {
    try {
      const {quantity, merchandise} = {...line};
      if (!merchandise) return null;

      return {
        id: merchandise.sku || '',
        name: merchandise.product?.title || '',
        brand: merchandise.product?.vendor || STOREFRONT_NAME,
        category: merchandise.product?.productType || '',
        variant: merchandise.title || '',
        price: merchandise.price?.amount || '',
        quantity: `${quantity || ''}`,
        list,
        product_id: merchandise.product?.id?.split('/').pop() || '',
        variant_id: merchandise.id?.split('/').pop() || '',
        compare_at_price: merchandise.compareAtPrice?.amount || 'undefined',
        image: merchandise.image?.url || '',
        position: (line.index || index) + 1,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : error;
      console.error('DataLayer:mapCartLine error', message);
      console.error('DataLayer:mapCartLine line', line);
      return null;
    }
  };
