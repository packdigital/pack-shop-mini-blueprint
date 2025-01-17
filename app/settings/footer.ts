import {COLOR_PICKER_DEFAULTS} from '~/settings/common';
import type {ColorHexCode} from '~/lib/types';

export interface FooterSettings {
  bgColor: ColorHexCode;
  textColor: ColorHexCode;
  subtext: string;
  subtextFontSize: number;
  textAlignment: 'left' | 'center';
  xPadding: number;
  yPadding: number;
}

export const footerDefaults = {
  bgColor: undefined,
  textColor: undefined,
  subtextFontSize: 14,
  textAlignment: 'center',
  xPadding: 24,
  yPadding: 24,
};

export default {
  label: 'Footer',
  name: 'footer',
  component: 'group',
  description: 'Background color, text color, subtext, padding',
  fields: [
    {
      label: 'Background Color',
      name: 'bgColor',
      component: 'color',
      colors: COLOR_PICKER_DEFAULTS,
    },
    {
      label: 'Text Color',
      name: 'textColor',
      component: 'color',
      colors: COLOR_PICKER_DEFAULTS,
    },
    {
      label: 'Subtext',
      name: 'subtext',
      component: 'markdown',
    },
    {
      label: 'Subtext Font Size',
      name: 'subtextFontSize',
      component: 'number',
    },
    {
      label: 'Text Alignment',
      name: 'textAlignment',
      component: 'radio-group',
      direction: 'horizontal',
      variant: 'radio',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
      ],
    },
    {
      label: 'Horizozntal Padding (px)',
      name: 'xPadding',
      component: 'number',
    },
    {
      label: 'Vertical Padding (px)',
      name: 'yPadding',
      component: 'number',
    },
  ],
  defaultValue: footerDefaults,
};
