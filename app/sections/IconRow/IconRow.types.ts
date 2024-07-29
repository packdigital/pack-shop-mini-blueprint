import type {ContainerSettings} from '~/settings/container';
import type {ColorHexCode, ImageCms} from '~/lib/types';

interface Icon {
  icon: ImageCms;
  alt?: string;
  label?: string;
}

interface Section {
  fullWidth?: boolean;
  textColor?: ColorHexCode;
}

export interface IconRowCms {
  heading?: string;
  icons: Icon[];
  section: Section;
  subtext?: string;
  container: ContainerSettings;
}
