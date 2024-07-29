import type {ContainerSettings} from '~/settings/container';
import type {ColorHexCode, LinkCms} from '~/lib/types';

interface Section {
  aboveTheFold: boolean;
  fullWidth: boolean;
  textColor: ColorHexCode;
}

interface Button {
  link: LinkCms;
  style: string;
}

export interface TextBlockCms {
  buttons: Button[];
  heading: string;
  section: Section;
  subtext: string;
  container: ContainerSettings;
}
