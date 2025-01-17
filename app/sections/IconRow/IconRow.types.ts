import type {ContainerSettings} from '~/settings/container';
import type {ColorHexCode, MediaCms} from '~/lib/types';

interface Icon {
  icon: MediaCms;
  alt?: string;
  label?: string;
}

interface Section {
  fullWidth?: boolean;
  textColor?: ColorHexCode;
  iconColor?: ColorHexCode;
}

export interface IconRowCms {
  heading?: string;
  icons: Icon[];
  section: Section;
  subtext?: string;
  container: ContainerSettings;
}
