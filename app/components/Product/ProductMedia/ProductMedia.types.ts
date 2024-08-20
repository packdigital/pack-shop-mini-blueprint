import type {SwiperClass} from 'swiper/react';
import type {
  Image,
  MediaEdge,
  MediaImage,
  Product,
} from '@shopify/hydrogen/storefront-api-types';

import type {
  AspectRatio,
  AspectRatioType,
  SelectedVariant,
  Swatches,
} from '~/lib/types';

export interface ProductMediaProps {
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  product: Product;
  selectedVariant: SelectedVariant;
  selectedVariantColor?: string | null;
  swatches?: Swatches;
}

export interface ProductImageProps {
  alt?: string;
  aspectRatio?: AspectRatio;
  image?: Image;
  onLoad?: () => void;
  priority?: boolean;
}

export interface ProductMediaFileProps {
  alt: string;
  aspectRatio: AspectRatio;
  media: MediaEdge['node'];
  onLoad?: () => void;
  priority?: boolean;
}

export interface ProductVideoProps {
  inView: boolean;
  media: MediaEdge['node'];
  onLoad?: () => void;
}

export interface ProductMediaThumbnailsProps {
  activeIndex: number | null;
  initialIndex: number;
  media: MediaEdge['node'][];
  productTitle: string;
  swiper: SwiperClass;
}

export interface ProductMediaThumbnailProps {
  alt: string;
  image: MediaImage['previewImage'];
  index: number;
  isActive: boolean;
  mediaContentType: string;
  swiper?: SwiperClass;
}
