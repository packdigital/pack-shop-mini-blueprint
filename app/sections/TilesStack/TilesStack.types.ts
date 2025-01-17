import type {ColorHexCode, Crop, MediaCms, LinkCms} from '~/lib/types';
import type {ContainerSettings} from '~/settings/container';

interface Header {
  heading: string;
  subheading: string;
}

interface Section {
  aspectRatio: string;
  textColor: ColorHexCode;
  textAlign: string;
  tileHeadingSize: string;
  fullWidth: boolean;
}

interface Tile {
  alt: string;
  crop: Crop;
  description: string;
  heading: string;
  image: MediaCms;
  link: LinkCms;
}

export interface TilesStackCms {
  header: Header;
  section: Section;
  tiles: Tile[];
  container: ContainerSettings;
}
