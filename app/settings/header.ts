import type {ColorHexCode, ImageCms, LinkCms} from '~/lib/types';

export interface HeaderSettings {
  nav: {
    height: number;
    logoHeight: number;
    hideLogo: boolean;
    logoLight: ImageCms;
    logoDark: ImageCms;
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
    height: number;
    padding: number;
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
  height: 64,
  logoHeight: 32,
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
  height: 28,
  padding: 8,
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
        'Height, logo height, logos, background color, border color, icon colors',
      fields: [
        {
          label: 'Height (px)',
          name: 'height',
          component: 'number',
        },
        {
          label: 'Logo Height (px)',
          name: 'logoHeight',
          component: 'number',
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
          description: 'Applicable when header is not transparent',
        },
        {
          label: 'Bottom Border Color',
          name: 'borderColor',
          component: 'color',
          description: 'Applicable when header is not transparent',
        },
        {
          label: 'Icon Color (light)',
          name: 'iconColorLight',
          component: 'color',
          description: 'Color of icons when header background is dark',
        },
        {
          label: 'Icon Color (dark)',
          name: 'iconColorDark',
          component: 'color',
          description: 'Color of icons when header background is light',
        },
      ],
      defaultValue: {
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
      },
    },
    {
      label: 'Promobar',
      name: 'promobar',
      component: 'group',
      description:
        'Enable, messages, height, padding, border radius, colors, slider settings',
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
              description: 'Link wrapping entire message',
            },
          ],
          defaultItem: {
            message: 'Free shipping on orders over $100',
          },
        },
        {
          label: 'Height (px)',
          name: 'height',
          component: 'number',
        },
        {
          label: 'Padding (px)',
          name: 'padding',
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
          label: 'Text Color',
          name: 'color',
          component: 'color',
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
          description: 'Refresh page to observe change',
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
