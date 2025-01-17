import {COLOR_PICKER_DEFAULTS} from '~/settings/common';
import {containerSettings} from '~/settings/container';

export function Schema() {
  return {
    category: 'Text',
    label: 'Icon Row',
    key: 'icon-row',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/icon-row-preview.jpg?v=1675730317',
    fields: [
      {
        label: 'Heading',
        name: 'heading',
        component: 'text',
        defaultValue: 'Icon Row Heading',
      },
      {
        label: 'Subtext',
        name: 'subtext',
        component: 'markdown',
        defaultValue:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        label: 'Icons',
        name: 'icons',
        component: 'group-list',
        itemProps: {
          label: '{{item.label}}',
        },
        fields: [
          {
            label: 'Icon',
            name: 'icon',
            component: 'image',
            description: 'Recommended image/svg size under 50kb',
          },
          {
            label: 'Icon Alt',
            name: 'alt',
            component: 'text',
            description:
              'Alt text set in media manager for selected image(s) will take priority. Re-add image(s) if alt text was set in media manager after selection.',
          },
          {
            label: 'Label',
            name: 'label',
            component: 'text',
          },
        ],
        defaultValue: [
          {
            icon: {
              src: 'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/shipping-1.svg?v=1721944763',
              width: 24,
              height: 24,
            },
            label: 'Free Shipping',
          },
          {
            icon: {
              src: 'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/customer-service-1.svg?v=1721944759',
              width: 24,
              height: 24,
            },
            label: 'Top Customer Service',
          },
          {
            icon: {
              src: 'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/warranty-1.svg?v=1721944765',
              width: 24,
              height: 24,
            },
            label: 'Lifetime Warranty',
          },
          {
            icon: {
              src: 'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/innovation-1.svg?v=1721944761',
              width: 24,
              height: 24,
            },
            label: 'Innovative Designs',
          },
        ],
        defaultItem: {label: 'New Icon'},
      },
      {
        label: 'Section Settings',
        name: 'section',
        component: 'group',
        description: 'Text color, icon color, full width',
        fields: [
          {
            label: 'Text Color',
            name: 'textColor',
            component: 'color',
            colors: COLOR_PICKER_DEFAULTS,
          },
          {
            label: 'Icon Color',
            name: 'iconColor',
            component: 'color',
            colors: COLOR_PICKER_DEFAULTS,
          },
          {
            label: 'Full Width',
            name: 'fullWidth',
            component: 'toggle',
            description: 'Removes max width of this section',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
        ],
        defaultValue: {
          textColor: '#000000',
          iconColor: '#000000',
          fullWidth: false,
        },
      },
      containerSettings(),
    ],
  };
}
