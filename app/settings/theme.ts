import type {ColorHexCode} from '~/lib/types';

import {FONT_FAMILIES, FONT_WEIGHTS, FONT_CASINGS} from './common';

export interface ButtonColorFields {
  bgColor: ColorHexCode;
  borderColor: ColorHexCode;
  textColor: ColorHexCode;
  hoverBgColor: ColorHexCode;
  hoverBorderColor: ColorHexCode;
  hoverTextColor: ColorHexCode;
}

export interface ThemeSettings {
  colors: {
    bgColor: ColorHexCode;
    textColor: ColorHexCode;
    borderColor: ColorHexCode;
  };
  buttons: {
    button: {
      fontSize: number;
      letterSpacing: number;
      fontFamily: string;
      fontWeight: string;
      fontCasing: string;
      height: number;
      xPadding: number;
      yPadding: number;
      borderWidth: number;
      borderRadius: number;
    };
    primary: ButtonColorFields;
    secondary: ButtonColorFields;
    inverseLight: ButtonColorFields;
    inverseDark: ButtonColorFields;
    disabled: {
      bgColor: ColorHexCode;
      borderColor: ColorHexCode;
      textColor: ColorHexCode;
    };
  };
  fonts: {
    headingFontFamily: string;
    headingFontWeight: string;
    headingFontCasing: string;
    bodyFontFamily: string;
    bodyFontWeight: string;
  };
  productOptionValues: {
    colorOptionValues: {
      height: number;
      borderColor: ColorHexCode;
      borderWidth: number;
    };
    optionValues: {
      fontSize: number;
      fontWeight: string;
      fontCasing: string;
      height: number;
      minWidth: number;
      xPadding: number;
      borderWidth: number;
      borderRadius: number;
      bgColor: ColorHexCode;
      borderColor: ColorHexCode;
      textColor: ColorHexCode;
      unavailBgColor: ColorHexCode;
      unavailBorderColor: ColorHexCode;
      unavailTextColor: ColorHexCode;
      unavailStyle: string;
      unavailStyleColor: ColorHexCode;
    };
  };
  inputs: {
    bgColor: ColorHexCode;
    borderColor: ColorHexCode;
    textColor: ColorHexCode;
    textFontWeight: string;
    height: number;
    xPadding: number;
    yPadding: number;
    borderWidth: number;
    borderRadius: number;
    labelFontSize: number;
    labelFontWeight: string;
    labelFontCasing: string;
  };
}

const buttonColorFields = [
  {
    label: 'Background Color',
    name: 'bgColor',
    component: 'color',
  },
  {
    label: 'Border Color',
    name: 'borderColor',
    component: 'color',
  },
  {
    label: 'Text Color',
    name: 'textColor',
    component: 'color',
  },
  {
    label: 'Hover Background Color',
    name: 'hoverBgColor',
    component: 'color',
    description: 'Hover state is disabled on mobile',
  },
  {
    label: 'Hover Border Color',
    name: 'hoverBorderColor',
    component: 'color',
    description: 'Hover state is disabled on mobile',
  },
  {
    label: 'Hover Text Color',
    name: 'hoverTextColor',
    component: 'color',
    description: 'Hover state is disabled on mobile',
  },
];

export const fontsDefaults = {
  headingFontFamily: 'Roboto',
  headingFontWeight: '600',
  headingFontCasing: 'none',
  bodyFontFamily: 'Roboto',
  bodyFontWeight: '400',
};

export const colorsDefaults = {
  bgColor: '#FFFFFF',
  textColor: '#000000',
  borderColor: '#E8E8E8',
};

export const buttonDefaults = {
  fontSize: 16,
  letterSpacing: 0.5,
  fontFamily: 'Roboto',
  fontWeight: '700',
  fontCasing: 'uppercase',
  height: 48,
  xPadding: 16,
  yPadding: 8,
  borderWidth: 1,
  borderRadius: 4,
};

export const primaryButtonColorDefaults = {
  bgColor: '#000000',
  borderColor: '#000000',
  textColor: '#FFFFFF',
  hoverBgColor: '#FFFFFF',
  hoverBorderColor: '#000000',
  hoverTextColor: '#000000',
};

export const secondaryButtonColorDefaults = {
  bgColor: '#008464',
  borderColor: '#008464',
  textColor: '#FFFFFF',
  hoverBgColor: '#00694f',
  hoverBorderColor: '#00694f',
  hoverTextColor: '#FFFFFF',
};

export const inverseLightButtonColorDefaults = {
  bgColor: '',
  borderColor: '#FFFFFF',
  textColor: '#FFFFFF',
  hoverBgColor: '#FFFFFF',
  hoverBorderColor: '#FFFFFF',
  hoverTextColor: '#000000',
};

export const inverseDarkButtonColorDefaults = {
  bgColor: '',
  borderColor: '#000000',
  textColor: '#000000',
  hoverBgColor: '#000000',
  hoverBorderColor: '#000000',
  hoverTextColor: '#FFFFFF',
};

export const disabledButtonColorDefaults = {
  bgColor: '#E8E8E8',
  borderColor: '#E8E8E8',
  textColor: '#707070',
};

export const productOptionValueDefaults = {
  colorOptionValues: {
    height: 40,
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  optionValues: {
    fontSize: 16,
    fontWeight: '400',
    fontCasing: 'none',
    height: 40,
    minWidth: 56,
    xPadding: 12,
    borderWidth: 1,
    borderRadius: 4,
    bgColor: '#FFFFFF',
    borderColor: '#E8E8E8',
    textColor: '#000000',
    unavailBgColor: '#FFFFFF',
    unavailBorderColor: '#E8E8E8',
    unavailTextColor: '#707070',
    unavailStyle: 'slash',
    unavailStyleColor: '#707070',
  },
};

export const inputDefaults = {
  bgColor: '#FFFFFF',
  borderColor: '#E8E8E8',
  textColor: '#000000',
  textFontWeight: '400',
  height: 48,
  xPadding: 16,
  yPadding: 8,
  borderWidth: 1,
  borderRadius: 4,
  labelFontSize: 14,
  labelFontWeight: '600',
  labelFontCasing: 'none',
};

export default {
  label: 'Theme',
  name: 'theme',
  component: 'group',
  description:
    'Fonts, colors, button styles, option value styles, input styles',
  fields: [
    {
      label: 'Fonts',
      name: 'fonts',
      component: 'group',
      description: 'Heading font, heading casing, body font',
      fields: [
        {
          label: 'Heading Font Family',
          name: 'headingFontFamily',
          component: 'select',
          options: FONT_FAMILIES,
        },
        {
          label: 'Heading Font Weight',
          name: 'headingFontWeight',
          component: 'select',
          options: FONT_WEIGHTS,
        },
        {
          label: 'Heading Casing',
          name: 'headingFontCasing',
          component: 'radio-group',
          direction: 'horizontal',
          variant: 'radio',
          options: FONT_CASINGS,
        },
        {
          label: 'Body Font Family',
          name: 'bodyFontFamily',
          component: 'select',
          options: FONT_FAMILIES,
        },
        {
          label: 'Body Font Weight',
          name: 'bodyFontWeight',
          component: 'select',
          options: FONT_WEIGHTS,
        },
      ],
      defaultValue: fontsDefaults,
    },
    {
      label: 'Colors',
      name: 'colors',
      component: 'group',
      description: 'Background, text, and border colors',
      fields: [
        {
          label: 'Background Color',
          name: 'bgColor',
          component: 'color',
          description:
            'Background color set at the section level takes priority',
        },
        {
          label: 'Text Color',
          name: 'textColor',
          component: 'color',
          description: 'Text color set at the section level takes priority',
        },
        {
          label: 'Border Color',
          name: 'borderColor',
          component: 'color',
        },
      ],
      defaultValue: colorsDefaults,
    },
    {
      label: 'Buttons',
      name: 'buttons',
      component: 'group',
      description:
        'Button styles, primary colors, secondary colors, inverse colors, disabled colors',
      fields: [
        {
          label: 'Button Settings',
          name: 'button',
          component: 'group',
          description:
            'Font size, letter spacing, font family, font weight, font casing, height, padding, border width, border radius',
          fields: [
            {
              label: 'Font Size (px)',
              name: 'fontSize',
              component: 'number',
            },
            {
              label: 'Letter Spacing (px)',
              name: 'letterSpacing',
              component: 'number',
            },
            {
              label: 'Font Family',
              name: 'fontFamily',
              component: 'select',
              options: FONT_FAMILIES,
            },
            {
              label: 'Font Weight',
              name: 'fontWeight',
              component: 'select',
              options: FONT_WEIGHTS,
            },
            {
              label: 'Font Casing',
              name: 'fontCasing',
              component: 'radio-group',
              direction: 'horizontal',
              variant: 'radio',
              options: FONT_CASINGS,
            },
            {
              label: 'Height (px)',
              name: 'height',
              component: 'number',
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
            {
              label: 'Border Width (px)',
              name: 'borderWidth',
              component: 'number',
            },
            {
              label: 'Border Radius (px)',
              name: 'borderRadius',
              component: 'number',
            },
          ],
          defaultValue: buttonDefaults,
        },
        {
          label: 'Primary Button Colors',
          name: 'primary',
          component: 'group',
          fields: buttonColorFields,
          defaultValue: primaryButtonColorDefaults,
        },
        {
          label: 'Secondary Button Colors',
          name: 'secondary',
          component: 'group',
          fields: buttonColorFields,
          defaultValue: secondaryButtonColorDefaults,
        },
        {
          label: 'Inverse Light Button Colors',
          name: 'inverseLight',
          component: 'group',
          fields: buttonColorFields,
          defaultValue: inverseLightButtonColorDefaults,
        },
        {
          label: 'Inverse Dark Button Colors',
          name: 'inverseDark',
          component: 'group',
          fields: buttonColorFields,
          defaultValue: inverseDarkButtonColorDefaults,
        },
        {
          label: 'Disabled Button Colors',
          name: 'disabled',
          component: 'group',
          description: 'Style all buttons render as when disabled',
          fields: [
            {
              label: 'Background Color',
              name: 'bgColor',
              component: 'color',
            },
            {
              label: 'Border Color',
              name: 'borderColor',
              component: 'color',
            },
            {
              label: 'Text Color',
              name: 'textColor',
              component: 'color',
            },
          ],
          defaultValue: disabledButtonColorDefaults,
        },
      ],
    },
    {
      label: 'Product Option Values',
      name: 'productOptionValues',
      component: 'group',
      description: 'Option value colors, heights, styles',
      fields: [
        {
          label: 'Color Option Values',
          name: 'colorOptionValues',
          component: 'group',
          description: 'Height, border color, border width',
          fields: [
            {
              label: 'Height (px)',
              name: 'height',
              component: 'number',
              description: 'Color option values are circles',
            },
            {
              label: 'Border Color',
              name: 'borderColor',
              component: 'color',
              description:
                'Note: color option values will use the swatch value set either in the customizer or Shopify as the background',
            },
            {
              label: 'Border Width (px)',
              name: 'borderWidth',
              component: 'number',
            },
          ],
        },
        {
          label: 'Non-Color Option Values',
          name: 'optionValues',
          component: 'group',
          description:
            'Font size, font weight, font casing, height, min width, padding, border width, border radius, background color, border color, text color, unavailable styles and colors',
          fields: [
            {
              label: 'Font Size (px)',
              name: 'fontSize',
              component: 'number',
            },
            {
              label: 'Font Weight',
              name: 'fontWeight',
              component: 'select',
              options: FONT_WEIGHTS,
            },
            {
              label: 'Font Casing',
              name: 'fontCasing',
              component: 'radio-group',
              direction: 'horizontal',
              variant: 'radio',
              options: FONT_CASINGS,
            },
            {
              label: 'Height (px)',
              name: 'height',
              component: 'number',
            },
            {
              label: 'Minimum Width (px)',
              name: 'minWidth',
              component: 'number',
            },
            {
              label: 'Horizozntal Padding (px)',
              name: 'xPadding',
              component: 'number',
            },
            {
              label: 'Border Width (px)',
              name: 'borderWidth',
              component: 'number',
            },
            {
              label: 'Border Radius (px)',
              name: 'borderRadius',
              component: 'number',
            },
            {
              label: 'Background Color',
              name: 'bgColor',
              component: 'color',
            },
            {
              label: 'Border Color',
              name: 'borderColor',
              component: 'color',
            },
            {
              label: 'Text Color',
              name: 'textColor',
              component: 'color',
            },
            {
              label: 'Unavailable Background Color',
              name: 'unavailBgColor',
              component: 'color',
            },
            {
              label: 'Unavailable Border Color',
              name: 'unavailBorderColor',
              component: 'color',
            },
            {
              label: 'Unavailable Text Color',
              name: 'unavailTextColor',
              component: 'color',
            },
            {
              label: 'Unavailable Style',
              name: 'unavailStyle',
              component: 'select',
              options: [
                {label: 'Diagonal Slash', value: 'slash'},
                {label: 'Strikethrough', value: 'strikethrough'},
                {label: 'None', value: 'none'},
              ],
            },
            {
              label: 'Unavailable Style Color',
              name: 'unavailStyleColor',
              component: 'color',
            },
          ],
        },
      ],
      defaultValue: productOptionValueDefaults,
    },
    {
      label: 'Inputs',
      name: 'inputs',
      component: 'group',
      description:
        'Background color, border color, text color, height, padding, border width, border radius',
      fields: [
        {
          label: 'Background Color',
          name: 'bgColor',
          component: 'color',
        },
        {
          label: 'Border Color',
          name: 'borderColor',
          component: 'color',
        },
        {
          label: 'Text Color',
          name: 'textColor',
          component: 'color',
        },
        {
          label: 'Text Font Weight',
          name: 'textFontWeight',
          component: 'select',
          options: FONT_WEIGHTS,
        },
        {
          label: 'Height (px)',
          name: 'height',
          component: 'number',
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
        {
          label: 'Border Width (px)',
          name: 'borderWidth',
          component: 'number',
        },
        {
          label: 'Border Radius (px)',
          name: 'borderRadius',
          component: 'number',
        },
        {
          label: 'Label Font Size (px)',
          name: 'labelFontSize',
          component: 'number',
        },
        {
          label: 'Label Font Weight',
          name: 'labelFontWeight',
          component: 'select',
          options: FONT_WEIGHTS,
        },
        {
          label: 'Label Font Casing',
          name: 'labelFontCasing',
          component: 'radio-group',
          direction: 'horizontal',
          variant: 'radio',
          options: FONT_CASINGS,
        },
      ],
      defaultValue: inputDefaults,
    },
  ],
};
