import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';

export type SelectedProduct = Product | null | undefined;

export type SelectedVariant = ProductVariant | null | undefined;
