import type {CartLine, Product} from '@shopify/hydrogen/storefront-api-types';

import type {
  AspectRatio,
  AspectRatioType,
  Settings,
  Swatches,
} from '~/lib/types';

type CloseCart = () => void;

export interface CartProps {
  settings: Settings['cart'];
}

export interface CartEmptyProps {
  closeCart?: CloseCart;
  settings: Settings['cart'];
}

export interface CartHeaderProps {
  closeCart?: CloseCart;
  heading?: string;
}

export interface CartLineProps {
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  closeCart?: CloseCart;
  line: CartLine;
  swatches: Swatches;
}

export interface CartTotalsProps {
  settings: Settings['cart'];
}

export interface CartUpsellProps {
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  closeCart?: CloseCart;
  settings: Settings['cart'];
}

export interface CartUpsellItemProps {
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  closeCart?: CloseCart;
  isOnlyUpsell?: boolean;
  product: Product;
}

export interface FreeShippingMeterProps {
  settings: Settings['cart'];
}
