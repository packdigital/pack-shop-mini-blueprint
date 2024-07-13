import type {ImageCms, LinkCms} from '~/lib/types';

export interface HeaderSettings {
  nav: {
    hideLogo: boolean;
    logoLight: ImageCms;
    logoDark: ImageCms;
    bgColor: string;
    iconColorLight: string;
    iconColorDark: string;
  };
  promobar: {
    enabled: boolean;
    autohide: boolean;
    effect: string;
    delay: number;
    speed: number;
    bgColor: string;
    color: string;
    messages: {
      message: string;
      link: LinkCms;
    }[];
  };
}

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
      description: 'Logos, background color, icon colors',
      fields: [
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
        iconColorLight: '#FFFFFF',
        iconColorDark: '#000000',
      },
    },
    {
      label: 'Promobar',
      name: 'promobar',
      component: 'group',
      description: 'Enable, messages, colors, slider settings',
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
            message: 'Free shipping on orders over $100. Shop Now',
            link: {url: '/', text: ''},
          },
        },
      ],
      defaultValue: {
        enabled: true,
        autohide: true,
        effect: 'fade',
        delay: 5000,
        speed: 500,
        bgColor: '#000000',
        color: '#FFFFFF',
      },
    },
  ],
};
