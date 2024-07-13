import type {ImageCms, ProductCms} from '~/lib/types';

export interface ShoppableSocialVideoCms {
  video: {
    src: string;
    poster: {
      src: string;
    };
  };
  product: {
    product: ProductCms;
    image: ImageCms;
    enabledStarRating: boolean;
    badge: string;
    badgeBgColor: string;
    badgeTextColor: string;
    bgColor: string;
    bgOpacity: number;
    textColor: string;
  };
  cta: {
    ctaType: string;
    viewText: string;
    atcText: string;
    buttonColor: string;
    textColor: string;
  };
  background: {
    colorType: string;
    firstColor: string;
    secondColor: string;
  };
  additional: {
    enabledProfile: boolean;
    profileName: string;
    profileImage: ImageCms;
    subtext: string;
    color: string;
  };
}
