import {BUTTONS} from '~/settings/common';
import type {ColorHexCode, Swatch} from '~/lib/types';

export interface ProductSettings {
  addToCart: {
    buttonStyle: string;
    addToCartText: string;
    soldOutText: string;
    preorderText: string;
    subtext: string;
  };
  backInStock: {
    enabled: boolean;
    notifyMeText: string;
    heading: string;
    subtext: string;
    submitText: string;
    successText: string;
  };
  badges: {
    badgeColors: {
      tag: string;
      bgColor: ColorHexCode;
      textColor: ColorHexCode;
    }[];
  };
  colors: {
    swatchesGroups: {
      name: string;
      swatches: Swatch[];
    }[];
  };
  quantitySelector: {
    enabled: boolean;
  };
  reviews: {
    enabledStarRating: boolean;
    starColor: ColorHexCode;
  };
}

export default {
  label: 'Product',
  name: 'product',
  component: 'group',
  description:
    'Add to cart, back in stock, badges, color swatches, quantity selector, reviews',
  fields: [
    {
      label: 'Add To Cart',
      name: 'addToCart',
      component: 'group',
      description: 'Button style, add to cart, sold out, presale text, subtext',
      fields: [
        {
          label: 'Button Style',
          name: 'buttonStyle',
          component: 'select',
          options: BUTTONS,
        },
        {
          label: 'Add To Cart Text',
          name: 'addToCartText',
          component: 'text',
        },
        {
          label: 'Sold Out Text',
          name: 'soldOutText',
          component: 'text',
        },
        {
          label: 'Preorder Text',
          name: 'preorderText',
          component: 'text',
        },
        {
          label: 'Subtext',
          name: 'subtext',
          component: 'text',
          description: 'Text below the Add To Cart button',
        },
      ],
      defaultValue: {
        buttonStyle: 'theme-btn-primary',
        addToCartText: 'Add To Cart',
        soldOutText: 'Sold Out',
        preorderText: 'Preorder',
        subtext: '',
      },
    },
    {
      label: 'Back In Stock',
      name: 'backInStock',
      component: 'group',
      description: 'Enable back in stock sign up, texts',
      fields: [
        {
          label: 'Enable Back In Stock Sign Up',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Heading',
          name: 'heading',
          component: 'text',
        },
        {
          label: 'Subtext',
          name: 'subtext',
          component: 'text',
        },
        {
          label: 'Submit Text',
          name: 'submitText',
          component: 'text',
        },
        {
          label: 'Success Message',
          name: 'successText',
          component: 'text',
        },
      ],
      defaultValue: {
        enabled: true,
        heading: 'Notify Me When Available',
        subtext: `Enter your email below and we'll notify you when this product is back in stock.`,
        submitText: 'Submit',
        successText:
          'Thank you! We will notify you when this product is back in stock.',
      },
    },
    {
      label: 'Badges',
      name: 'badges',
      component: 'group',
      description: 'Badge colors',
      fields: [
        {
          label: 'Badge Colors',
          name: 'badgeColors',
          component: 'group-list',
          description:
            'Note: product badges are set up via Shopify tags using the format "badge::Some Value"',
          itemProps: {
            label: '{{item.tag}}',
          },
          fields: [
            {
              label: 'Tag Value',
              name: 'tag',
              component: 'text',
              description:
                'Letter casing must be same as tag value in Shopify, e.g. "New", "Sale"',
            },
            {
              label: 'Background Color',
              name: 'bgColor',
              component: 'color',
            },
            {
              label: 'Text Color',
              name: 'textColor',
              component: 'color',
            },
          ],
          defaultItem: {
            bgColor: '#000000',
            textColor: '#FFFFFF',
          },
          defaultValue: [
            {
              tag: 'Draft',
              bgColor: '#C0C0C0',
              textColor: '#FFFFFF',
            },
            {
              tag: 'Best Seller',
              bgColor: '#000000',
              textColor: '#FFFFFF',
            },
            {
              tag: 'New',
              bgColor: '#000000',
              textColor: '#FFFFFF',
            },
            {
              tag: 'Sale',
              bgColor: '#008464',
              textColor: '#FFFFFF',
            },
          ],
        },
      ],
    },
    {
      label: 'Colors',
      name: 'colors',
      component: 'group',
      description: 'Color swatches',
      fields: [
        {
          label: 'Color Swatches Groups',
          name: 'swatchesGroups',
          component: 'group-list',
          itemProps: {
            label: '{{item.name}}',
          },
          defaultItem: {
            name: 'New Swatches Group',
          },
          description: 'Color names should be unique across all groups',
          fields: [
            {
              label: 'Group Name',
              name: 'name',
              component: 'text',
            },
            {
              label: 'Color Swatches',
              name: 'swatches',
              component: 'group-list',
              itemProps: {
                label: '{{item.name}}',
              },
              defaultItem: {
                name: 'New Color',
              },
              fields: [
                {
                  label: 'Color Name',
                  name: 'name',
                  component: 'text',
                },
                {
                  label: 'Color',
                  name: 'color',
                  component: 'color',
                },
                {
                  name: 'image',
                  label: 'Image',
                  component: 'image',
                  description:
                    'If provided, image will overlay the color.\nEnsure image is no more than 2KB in size',
                },
              ],
            },
          ],
          defaultValue: [
            {
              name: 'Primary Colors',
              swatches: [
                {
                  name: 'Black',
                  color: '#000000',
                },
                {
                  name: 'White',
                  color: '#FFFFFF',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Quantity Selector',
      name: 'quantitySelector',
      component: 'group',
      description: 'Enable',
      fields: [
        {
          label: 'Enable Quantity Selector',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
      ],
      defaultValue: {
        enabled: false,
      },
    },
    {
      label: 'Reviews',
      name: 'reviews',
      component: 'group',
      description: 'Enable star rating',
      fields: [
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
          label: 'Star Color',
          name: 'starColor',
          component: 'color',
        },
      ],
      defaultValue: {
        enabledStarRating: true,
        starColor: '#000000',
      },
    },
  ],
};
