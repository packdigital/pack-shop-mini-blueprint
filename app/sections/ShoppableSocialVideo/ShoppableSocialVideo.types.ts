import type {Product} from '@shopify/hydrogen/storefront-api-types';

import type {
  AspectRatio,
  AspectRatioType,
  ColorHexCode,
  MediaCms,
  ProductCms,
  Swatches,
} from '~/lib/types';

interface ProductSettings {
  enabledStarRating: boolean;
  enabledQuantitySelector: boolean;
  optionsBtnText: string;
  optionsBtnStyle: string;
  atcBtnText: string;
  atcBtnStyle: string;
  notifyMeText: string;
  viewText: string;
  badgeBgColor: ColorHexCode;
  badgeTextColor: ColorHexCode;
}

interface SliderSettings {
  enabledScrollbar: boolean;
  scrollbarColor: ColorHexCode;
  slideBgColor: ColorHexCode;
  slideBgOpacity: number;
  slideBgBlur: number;
  slideTextColor: ColorHexCode;
}

export interface ShoppableSocialVideoCms {
  video: {
    video: MediaCms;
    poster: MediaCms;
  };
  products: {
    product: ProductCms;
    image: MediaCms;
    badge: string;
    description: string;
  }[];
  product: ProductSettings;
  slider: SliderSettings;
  text: {
    heading: string;
    subtext: string;
    scrollText: string;
    color: ColorHexCode;
  };
  background: {
    colorType: string;
    firstColor: ColorHexCode;
    secondColor: ColorHexCode;
    thirdColor: ColorHexCode;
  };
}

export interface ShoppableSocialVideoProductCardProps {
  product: Product;
  image: MediaCms;
  isActive: boolean;
  badge: string;
  description: string;
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  manualStarRating: string;
  productSettings: ProductSettings;
  sliderSettings: SliderSettings;
  swatches?: Swatches;
}
