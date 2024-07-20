export function Schema() {
  return {
    category: 'Product',
    label: 'Shoppable Social Video',
    key: 'shoppable-social-video',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/shoppable-social-video-preview.jpg?v=1721419121',
    fields: [
      {
        label: 'Video Settings',
        name: 'video',
        description: 'Video link, poster image',
        component: 'group',
        fields: [
          {
            label: 'Video URL',
            name: 'src',
            component: 'text',
            description: 'Must be a direct link, not a share link',
          },
          {
            label: 'Poster Image',
            name: 'poster',
            component: 'image',
            description: 'First frame of video while video loads',
          },
        ],
      },
      {
        label: 'Product Settings',
        name: 'product',
        description:
          'Product, image, star rating, badge text, card, background color and opacity, and text color',
        component: 'group',
        fields: [
          {
            label: 'Product',
            name: 'product',
            component: 'productSearch',
          },
          {
            label: 'Image',
            name: 'image',
            component: 'image',
            description: 'Overrides product featured image',
          },
          {
            label: 'Enable Star Rating',
            name: 'enabledStarRating',
            component: 'toggle',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Badge Text',
            name: 'badge',
            component: 'text',
          },
          {
            label: 'Badge Background Color',
            name: 'badgeBgColor',
            component: 'color',
          },
          {
            label: 'Badge Text Color',
            name: 'badgeTextColor',
            component: 'color',
          },
          {
            label: 'Card Background Color',
            name: 'bgColor',
            component: 'color',
          },
          {
            label: 'Card Background Opacity',
            name: 'bgOpacity',
            component: 'number',
            description: '0 to 1.0',
          },
          {
            label: 'Card Text Color',
            name: 'textColor',
            component: 'color',
          },
        ],
        defaultValue: {
          enabledStarRating: true,
          badge: '-25%',
          badgeBgColor: '#FCA5A5',
          badgeTextColor: '#000000',
          bgColor: '#FFFFFF',
          bgOpacity: 0.7,
          textColor: '#000000',
        },
      },
      {
        label: 'Call To Action Settings',
        name: 'cta',
        description: 'Call to action type, text, colors',
        component: 'group',
        fields: [
          {
            label: 'CTA Type',
            name: 'ctaType',
            component: 'radio-group',
            direction: 'horizontal',
            variant: 'radio',
            description: 'Add To Cart will add the first variant to the cart',
            options: [
              {label: 'View Product', value: 'view'},
              {label: 'Add To Cart', value: 'atc'},
            ],
          },
          {
            label: 'View Product Text',
            name: 'viewText',
            component: 'text',
          },
          {
            label: 'Add To Cart Text',
            name: 'atcText',
            component: 'text',
          },
          {
            label: 'Button Color',
            name: 'buttonColor',
            component: 'color',
          },
          {
            label: 'Text Color',
            name: 'textColor',
            component: 'color',
          },
        ],
        defaultValue: {
          ctaType: 'view',
          viewText: 'Shop Product',
          atcText: 'Add To Cart',
          buttonColor: '#000000',
          textColor: '#FFFFFF',
        },
      },
      {
        label: 'Background Settings',
        name: 'background',
        description: 'Background color',
        component: 'group',
        fields: [
          {
            label: 'Color Type',
            name: 'colorType',
            component: 'select',
            description: 'Solid color will use the first color',
            options: [
              {label: 'Solid', value: 'solid'},
              {label: 'Gradient (top to bottom)', value: 'to bottom'},
              {
                label: 'Gradient (top left to bottom right)',
                value: 'to bottom right',
              },
              {label: 'Gradient (left to right)', value: 'to right'},
              {
                label: 'Gradient (bottom left to top right)',
                value: 'to top right',
              },
            ],
          },
          {
            label: 'First Color',
            name: 'firstColor',
            component: 'color',
          },
          {
            label: 'Second Color',
            name: 'secondColor',
            component: 'color',
          },
        ],
        defaultValue: {
          colorType: 'to bottom',
          firstColor: '#94A3B8',
          secondColor: '#E2E8F0',
        },
      },
      {
        label: 'Additonal Settings',
        name: 'additional',
        description: 'Profile, subtext, color',
        component: 'group',
        fields: [
          {
            label: 'Enable Profile',
            name: 'enabledProfile',
            component: 'toggle',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
          },
          {
            label: 'Profile Name',
            name: 'profileName',
            component: 'text',
          },
          {
            label: 'Profile Image',
            name: 'profileImage',
            component: 'image',
          },
          {
            label: 'Subtext',
            name: 'subtext',
            component: 'markdown',
          },
          {
            label: 'Text and Icon Color',
            name: 'color',
            component: 'color',
            description: 'Color of any text and icons overlaying the video',
          },
        ],
        defaultValue: {
          enabledProfile: true,
          color: '#FFFFFF',
        },
      },
    ],
  };
}
