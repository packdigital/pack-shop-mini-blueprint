import type {ContainerSettings} from '~/settings/container';
import type {ColorHexCode, LinkCms} from '~/lib/types';

interface Section {
  fullWidth: boolean;
  reviewStarColor: ColorHexCode;
  sliderPaginationBulletColor: ColorHexCode;
  textColor: ColorHexCode;
}

interface Slide {
  title: string;
  body: string;
  author: string;
  rating: string;
}

export interface TestimonialSliderCms {
  heading: string;
  link: LinkCms;
  buttonStyle: string;
  section: Section;
  testimonialSlides: Slide[];
  container: ContainerSettings;
}
