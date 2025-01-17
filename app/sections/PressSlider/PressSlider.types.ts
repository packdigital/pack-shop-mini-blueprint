import type {ContainerSettings} from '~/settings/container';
import type {ColorHexCode, MediaCms} from '~/lib/types';

interface Section {
  fullWidth: boolean;
  textColor: ColorHexCode;
}

interface Slide {
  alt: string;
  image: MediaCms;
  quote: string;
}

export interface PressSliderCms {
  section: Section;
  slides: Slide[];
  container: ContainerSettings;
}

export interface PressSliderThumbProps {
  alt?: string;
  image?: MediaCms;
  isActive?: boolean;
  onClick?: () => void;
}
