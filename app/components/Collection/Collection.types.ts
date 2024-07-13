import type {
  Collection,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';

import type {Settings, SwatchesMap} from '~/lib/types';

export interface CollectionProps {
  collection: Collection;
  title?: string;
}

export interface CollectionGridProps {
  products: ProductConnection;
  settings: Settings['collection'];
  swatchesMap?: SwatchesMap;
}
