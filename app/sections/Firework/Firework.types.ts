import type {ContainerSettings} from '~/settings/container';

interface Section {
  fullWidth: boolean;
  textColor: string;
  bodyTextColor: string;
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
