import {COLOR_PICKER_DEFAULTS} from '~/settings/common';
import type {ColorHexCode, MediaCms, LinkCms} from '~/lib/types';

export interface HeaderSettings {
  nav: {
    heightDesktop: number;
    heightMobile: number;
    logoPercentHeight: number;
    hideLogo: boolean;
    logoLight: MediaCms;
    logoDark: MediaCms;
    bgColor: ColorHexCode;
    borderColor: ColorHexCode;
    iconColorLight: ColorHexCode;
    iconColorDark: ColorHexCode;
  };
  promobar: {
    enabled: boolean;
    messages: {
      message: string;
      link: LinkCms;
    }[];
    sliderHeightDesktop: number;
    paddingDesktop: number;
    fontSizeDesktop: number;
    sliderHeightMobile: number;
    paddingMobile: number;
    fontSizeMobile: number;
    borderRadius: number;
    bgColor: ColorHexCode;
    color: ColorHexCode;
    autohide: boolean;
    effect: string;
    delay: number;
    speed: number;
  };
}

export const navBarDefaults = {
  hideNav: false,
  heightDesktop: 64,
  heightMobile: 64,
  logoPercentHeight: 50,
  hideLogo: false,
  logoLight: {
    src: 'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/pack-logo-light.svg?v=1720754740',
    width: 44,
    height: 34,
    altText: 'Pack logo',
  },
  logoDark: {
    src: 'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/pack-logo-dark.svg?v=1720754738',
    width: 44,
    height: 34,
    altText: 'Pack logo',
  },
  bgColor: '#FFFFFF',
  borderColor: '#E8E8E8',
  iconColorLight: '#FFFFFF',
  iconColorDark: '#000000',
};

export const promobarDefaults = {
  enabled: true,
  sliderHeightDesktop: 28,
  paddingDesktop: 8,
  fontSizeDesktop: 14,
  sliderHeightMobile: 28,
  paddingMobile: 8,
  fontSizeMobile: 12,
  borderRadius: 99,
  bgColor: '#000000',
  color: '#FFFFFF',
  autohide: true,
  effect: 'fade',
  delay: 5000,
  speed: 500,
};

export default {
  label: 'Header',
  name: 'header',
  component: 'group',
  description: 'Navigation bar, promobar',
  fields: [
    {
      label: 'Navigation Bar',
      name: 'nav',
      component: 'group',
      description:
        'Heights, logo height, logos, background color, border color, icon colors',
      fields: [
        {
          label: 'Hide Navigation bar',
          name: 'hideNav',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Height (px) (tablet/desktop)',
          name: 'heightDesktop',
          component: 'number',
        },
        {
          label: 'Height (px) (mobile)',
          name: 'heightMobile',
          component: 'number',
        },
        {
          label: 'Logo Height (%)',
          name: 'logoPercentHeight',
          component: 'number',
          description: 'Height of logo as a percentage of the navbar height',
        },
        {
          label: 'Hide Logo',
          name: 'hideLogo',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Logo (light)',
          name: 'logoLight',
          component: 'image',
          description: 'Light logo for dark backgrounds',
        },
        {
          label: 'Logo (dark)',
          name: 'logoDark',
          component: 'image',
          description: 'Dark logo for light backgrounds',
        },
        {
          label: 'Background Color',
          name: 'bgColor',
          component: 'color',
          colors: COLOR_PICKER_DEFAULTS,
          description: 'Applicable when header is not transparent',
        },
        {
          label: 'Bottom Border Color',
          name: 'borderColor',
          component: 'color',
          colors: COLOR_PICKER_DEFAULTS,
          description: 'Applicable when header is not transparent',
        },
        {
          label: 'Icon Color (light)',
          name: 'iconColorLight',
          component: 'color',
          colors: COLOR_PICKER_DEFAULTS,
          description: 'Color of icons when header background is dark',
        },
        {
          label: 'Icon Color (dark)',
          name: 'iconColorDark',
          component: 'color',
          colors: COLOR_PICKER_DEFAULTS,
          description: 'Color of icons when header background is light',
        },
      ],
      defaultValue: navBarDefaults,
    },
    {
      label: 'Promobar',
      name: 'promobar',
      component: 'group',
      description:
        'Enable, messages, heights, padding, border radius, colors, slider settings',
      fields: [
        {
          label: 'Enabled',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Messages',
          name: 'messages',
          component: 'group-list',
          itemProps: {
            label: '{{item.message}}',
          },
          fields: [
            {
              label: 'Message',
              name: 'message',
              component: 'textarea',
            },
            {
              label: 'Link (optional)',
              name: 'link',
              component: 'link',
              description: `Link wrapping entire message\n\nTo link to a product modal, write out an external url in this format: '?product=<product-handle>', e.g. '?product=basic-tee'. The product must be both active and on the Hydrogen sales channel'`,
            },
          ],
          defaultItem: {
            message: 'Free shipping on orders over $100',
          },
        },
        {
          label: 'Slider Height (px) (tablet/desktop)',
          name: 'sliderHeightDesktop',
          component: 'number',
        },
        {
          label: 'Padding (px) (tablet/desktop)',
          name: 'paddingDesktop',
          component: 'number',
        },
        {
          label: 'Font Size (px) (tablet/desktop)',
          name: 'fontSizeDesktop',
          component: 'number',
        },
        {
          label: 'Slider Height (px) (mobile)',
          name: 'sliderHeightMobile',
          component: 'number',
        },
        {
          label: 'Padding (px) (mobile)',
          name: 'paddingMobile',
          component: 'number',
        },
        {
          label: 'Font Size (px) (mobile)',
          name: 'fontSizeMobile',
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
          colors: COLOR_PICKER_DEFAULTS,
        },
        {
          label: 'Text Color',
          name: 'color',
          component: 'color',
          colors: COLOR_PICKER_DEFAULTS,
        },
        {
          label: 'Autohide',
          name: 'autohide',
          component: 'toggle',
          description:
            'Hides promobar after scrolling away from top of the page',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Effect Between Transitions',
          name: 'effect',
          component: 'select',
          description: 'Save and refresh page to observe change',
          options: [
            {label: 'Fade', value: 'fade'},
            {label: 'Horizontal Slide', value: 'slide-horizontal'},
            {label: 'Vertical Slide', value: 'slide-vertical'},
          ],
        },
        {
          label: 'Autoplay Delay',
          name: 'delay',
          component: 'number',
          description: 'Delay between transitions (in ms)',
        },
        {
          label: 'Speed',
          name: 'speed',
          component: 'number',
          description: 'Duration of transition between slides (in ms)',
        },
      ],
      defaultValue: promobarDefaults,
    },
  ],
};
