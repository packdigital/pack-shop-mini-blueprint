import type {ColorHexCode} from '~/lib/types';
import type {ContainerSettings} from '~/settings/container';

interface Section {
  fullWidth: boolean;
  textColor: ColorHexCode;
  bodyTextColor: ColorHexCode;
}

export interface FireworkCms {
  heading: string;
  subheading: string;
  playlistId: string;
  showCaptions: boolean;
  type: string;
  container: ContainerSettings;
  section: Section;
}
