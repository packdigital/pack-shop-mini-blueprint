import type {ColorHexCode} from '~/lib/types';
import type {ContainerSettings} from '~/settings/container';

interface Accordion {
  body: string;
  defaultOpen: boolean;
  header: string;
}

export interface AccordionProps {
  accordion: Accordion;
  headerBgColor: ColorHexCode;
  headerTextColor: ColorHexCode;
}

export interface AccordionsCms {
  accordions: Accordion[];
  heading?: string;
  headerBgColor: ColorHexCode;
  headerTextColor: ColorHexCode;
  container: ContainerSettings;
}
