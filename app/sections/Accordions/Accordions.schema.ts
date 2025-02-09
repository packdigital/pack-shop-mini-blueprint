import {containerSettings} from '~/settings/container';
import {COLOR_PICKER_DEFAULTS} from '~/settings/common';

export function Schema() {
  return {
    category: 'Text',
    label: 'Accordions',
    key: 'accordions',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/accordions-preview.jpg?v=1675730300',
    fields: [
      {
        label: 'Heading',
        name: 'heading',
        component: 'text',
        defaultValue: 'Accordions Heading',
      },
      {
        label: 'Accordions',
        name: 'accordions',
        component: 'group-list',
        itemProps: {
          label: '{{item.header}}',
        },
        fields: [
          {
            label: 'Header',
            name: 'header',
            component: 'text',
          },
          {
            label: 'Body',
            name: 'body',
            component: 'markdown',
          },
          {
            label: 'Default Open',
            name: 'defaultOpen',
            component: 'toggle',
            description: 'Sets accordion to be open by default',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
        ],
        defaultValue: [
          {
            header: 'Excepteur sint occaecat cupidatat non proident?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            defaultOpen: false,
          },
        ],
        defaultItem: {
          header: 'Excepteur sint occaecat cupidatat non proident?',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          defaultOpen: false,
        },
      },
      {
        label: 'Accordion Header Background Color',
        name: 'headerBgColor',
        component: 'color',
        colors: COLOR_PICKER_DEFAULTS,
        defaultValue: '#F9F9F9',
      },
      {
        label: 'Accordion Header Text Color',
        name: 'headerTextColor',
        component: 'color',
        colors: COLOR_PICKER_DEFAULTS,
        defaultValue: '#000000',
      },
      containerSettings(),
    ],
  };
}
