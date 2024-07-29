import type {Product} from '@shopify/hydrogen/storefront-api-types';

import type {ColorHexCode, ImageCms, ProductCms} from '~/lib/types';

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
  enabledPaginationBar: boolean;
  paginationBarColor: ColorHexCode;
  slideBgColor: ColorHexCode;
  slideBgOpacity: number;
  slideBgBlur: number;
  slideTextColor: ColorHexCode;
}

export interface ShoppableSocialVideoCms {
  video: {
    src: string;
    poster: {
      src: string;
    };
  };
  products: {product: ProductCms; image: ImageCms; badge: string}[];
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
  };
}

export interface ShoppableSocialVideoProductCardProps {
  product: Product;
  image: ImageCms;
  isActive: boolean;
  badge: string;
  productSettings: ProductSettings;
  sliderSettings: SliderSettings;
}
