import type {ReactNode} from 'react';

import type {ContainerSettings} from '~/settings/container';
import type {ColorHexCode, MediaCms, LinkCms} from '~/lib/types';

export interface BannerCms {
  image: {
    alt: string;
    imageDesktop: MediaCms;
    positionDesktop: string;
    imageMobile: MediaCms;
    positionMobile: string;
  };
  text: {
    heading: string;
    subheading: string;
    color: ColorHexCode;
    buttons: {
      link: LinkCms;
      style: string;
    }[];
  };
  video: {
    videoDesktop: MediaCms;
    posterDesktop: MediaCms;
    videoMobile: MediaCms;
    posterMobile: MediaCms;
  };
  content: {
    darkOverlay: boolean;
    positionDesktop: string;
    alignmentDesktop: string;
    maxWidthDesktop: string;
    positionMobile: string;
    alignmentMobile: string;
    maxWidthMobile: string;
  };
  section: {
    bgColor?: ColorHexCode;
    aboveTheFold?: boolean;
    fullWidth: boolean;
    fullBleed: boolean;
    desktop: {
      heightType: string;
      staticHeight: string;
      aspectRatio: string;
      minHeight: string;
      maxHeight: string;
    };
    mobile: {
      heightType: string;
      staticHeight: string;
      aspectRatio: string;
      minHeight: string;
      maxHeight: string;
    };
  };
  container: ContainerSettings;
  id: string;
  clientId: string;
}

export interface BannerContentProps {
  aboveTheFold: boolean | undefined;
  content: BannerCms['content'];
  text: BannerCms['text'];
}

export interface BannerVideoProps {
  aboveTheFold: boolean | undefined;
  posterUrl?: string;
  video: MediaCms;
}

export interface BannerContainerProps {
  children: ReactNode;
  cms: BannerCms;
}
