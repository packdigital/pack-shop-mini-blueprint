import type {ColorHexCode} from '~/lib/types';
import type {ContainerSettings} from '~/settings/container';

interface Content {
  contentAlign?: string;
  textAlign?: string;
}

interface Section {
  hasXPadding?: boolean;
  hasYPadding?: boolean;
  maxWidth?: string;
  textColor?: ColorHexCode;
}

export interface HtmlCms {
  content: Content;
  html: string;
  section: Section;
  container: ContainerSettings;
}
