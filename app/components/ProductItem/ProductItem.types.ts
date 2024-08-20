import type {
  Product,
  ProductOptionValue,
  Video,
} from '@shopify/hydrogen/storefront-api-types';

import type {
  AspectRatio,
  AspectRatioType,
  ColorHexCode,
  SelectedProduct,
  SelectedVariant,
  Swatches,
} from '~/lib/types';

export interface ProductItemProps {
  enabledOptionValue?: boolean;
  enabledStarRating?: boolean;
  handle?: string;
  index: number;
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  manualStarRating?: string;
  onClick?: () => void;
  primaryOptionName?: string;
  priority?: boolean;
  product?: Product | null;
  quickShopMobileHidden?: boolean;
  starColor?: ColorHexCode;
  swatches?: Swatches;
}

export interface ProductItemPriceProps {
  selectedVariant: SelectedVariant;
}

export interface ProductItemMediaProps {
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  selectedProduct: SelectedProduct;
  selectedVariant: SelectedVariant;
  swatches?: Swatches;
}

export interface ProductItemVideoProps {
  autoPlay?: boolean;
  media: Video;
}

export interface ColorVariantSelectorProps {
  enabledColorNameOnHover?: boolean;
  initialProduct: SelectedProduct;
  selectedVariant: SelectedVariant;
  setProductFromColorSelector: (product: SelectedProduct) => void;
  setVariantFromColorSelector: (variant: SelectedVariant | undefined) => void;
  swatches?: Swatches;
}

export interface ColorVariantOptionsProps {
  enabledColorNameOnHover?: boolean;
  initialProduct: SelectedProduct;
  initialProductColorOptions: ProductOptionValue[];
  selectedVariant: SelectedVariant;
  setProductFromColorSelector: (product: SelectedProduct) => void;
  setVariantFromColorSelector: (variant: SelectedVariant) => void;
  swatches?: Swatches;
}

export interface ColorVariantOptionProps {
  color: ProductOptionValue;
  enabledColorNameOnHover?: boolean;
  onClick: () => void;
  selectedVariantColor: string | undefined;
  swatches?: Swatches;
}
