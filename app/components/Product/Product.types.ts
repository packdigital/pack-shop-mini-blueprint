import type {Product} from '@shopify/hydrogen/storefront-api-types';

import type {
  ImageCms,
  SelectedVariant,
  Settings,
  Swatches,
  VariantPrices,
} from '~/lib/types';

export interface ProductProps {
  isModal?: boolean;
  onClose?: () => void;
  product: Product;
}

export interface ProductHeaderProps {
  isMobile?: boolean;
  prices: VariantPrices;
  product: Product;
  selectedVariant: SelectedVariant;
  settings: Settings['product'];
}

export interface ProductDetailsProps {
  isModal?: boolean;
  prices: VariantPrices;
  product: Product;
  selectedVariant: SelectedVariant;
  swatches?: Swatches;
}

export interface ProductReviewsProps {
  product: Product;
}

export interface SizeGuideProps {
  sizeGuide: {
    name: string;
    heading?: string;
    tagName: string;
    image?: ImageCms;
    markdown?: string;
  };
  heading?: string;
}

export interface BackInStockModalProps {
  isFocused?: boolean;
  selectedVariant: SelectedVariant;
}
