import {containerSettings} from '~/settings/container';
import {COLOR_PICKER_DEFAULTS} from '~/settings/common';

export function Schema() {
  return {
    category: 'Social',
    label: 'Firework',
    key: 'firework',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/firework-widget-preview.jpg?v=1721419116',
    fields: [
      {
        label: 'Heading',
        name: 'heading',
        component: 'text',
        defaultValue: 'Live Shopping',
      },
      {
        label: 'Subheading',
        name: 'subheading',
        component: 'textarea',
        defaultValue:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu cursus lectus, at blandit magna. Donec varius pretium interdum. Proin vel dui venenatis, vulputate sem nec, tincidunt nibh.',
      },
      {
        label: 'Component Type',
        name: 'type',
        component: 'select',
        options: [
          {value: 'carousel', label: 'Carousel'},
          {value: 'storyblock', label: 'Storyblock'},
        ],
        defaultValue: 'carousel',
      },
      {
        label: 'Channel',
        name: 'channel',
        component: 'text',
      },
      {
        label: 'Playlist Id',
        name: 'playlistId',
        component: 'text',
      },
      {
        label: 'Show Captions',
        name: 'showCaptions',
        component: 'toggle',
        toggleLabels: {
          true: 'On',
          false: 'Off',
        },
        defaultValue: false,
      },
      {
        label: 'Section Settings',
        name: 'section',
        component: 'group',
        description: 'text color, full width',
        fields: [
          {
            label: 'Heading Text Color',
            name: 'textColor',
            component: 'color',
            colors: COLOR_PICKER_DEFAULTS,
          },
          {
            label: 'Body Text Color',
            name: 'bodyTextColor',
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
          bodyTextColor: '#484848',
          buttonStyle: 'primary',
          fullWidth: true,
        },
      },
      containerSettings(),
    ],
  };
}
