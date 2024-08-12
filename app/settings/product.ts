import {BUTTONS} from '~/settings/common';
import type {
  AspectRatio,
  AspectRatioType,
  ColorHexCode,
  ImageCms,
  Swatch,
} from '~/lib/types';

export interface ProductSettings {
  addToCart: {
    buttonStyle: string;
    addToCartText: string;
    soldOutText: string;
    preorderText: string;
    subtext: string;
    enabledQuantitySelector: boolean;
    enabledInlinePrice: boolean;
  };
  backInStock: {
    enabled: boolean;
    notifyMeText: string;
    heading: string;
    subtext: string;
    submitText: string;
    successText: string;
  };
  swatches: {
    swatchesGroups: {
      name: string;
      swatches: Swatch[];
    }[];
    swatchOptionName: string;
  };
  details: {
    primaryOptionName: string;
    enabledOptionValueInPdpHeader: boolean;
    enabledOptionValueInPlpItem: boolean;
    badgeColors: {
      tag: string;
      bgColor: ColorHexCode;
      textColor: ColorHexCode;
    }[];
  };
  media: {
    aspectRatioType: AspectRatioType;
    manualAspectRatio: AspectRatio;
  };
  reviews: {
    enabledStarRating: boolean;
    manualStarRating: string;
    starColor: ColorHexCode;
    enabledReviewsWidget: boolean;
    heading: string;
  };
  sizeGuide: {
    enabled: boolean;
    productOption: string;
    tagPrefix: string;
    buttonText: string;
    heading: string;
    sizeGuides: {
      name: string;
      heading: string;
      tagName: string;
      image: ImageCms;
      markdown: string;
    }[];
  };
}

export const addToCartDefaults = {
  buttonStyle: 'theme-btn-primary',
  addToCartText: 'Add To Cart',
  soldOutText: 'Sold Out',
  preorderText: 'Preorder',
  subtext: '',
  enabledQuantitySelector: false,
  enabledInlinePrice: true,
};

export const backInStockDefaults = {
  enabled: true,
  heading: 'Notify Me When Available',
  subtext: `Enter your email below and we'll notify you when this product is back in stock.`,
  submitText: 'Submit',
  successText:
    'Thank you! We will notify you when this product is back in stock.',
};

export default {
  label: 'Product',
  name: 'product',
  component: 'group',
  description:
    'Add to cart, back in stock, swatches, details, media, reviews, size guides',
  fields: [
    {
      label: 'Add To Cart',
      name: 'addToCart',
      component: 'group',
      description:
        'Button style, add to cart, sold out, presale text, subtext, enable quantity selector',
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
        {
          label: 'Enable Quantity Selector',
          name: 'enabledQuantitySelector',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Enable Inline Price',
          name: 'enabledInlinePrice',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
      ],
      defaultValue: addToCartDefaults,
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
      defaultValue: backInStockDefaults,
    },
    {
      label: 'Swatches',
      name: 'swatches',
      component: 'group',
      description: 'Swatches, Shopify option name',
      fields: [
        {
          label: 'Swatches Groups',
          name: 'swatchesGroups',
          component: 'group-list',
          itemProps: {
            label: '{{item.name}}',
          },
          defaultItem: {
            name: 'New Swatches Group',
          },
          description: 'Swatch names should be unique across all groups',
          fields: [
            {
              label: 'Group Name',
              name: 'name',
              component: 'text',
            },
            {
              label: 'Swatches',
              name: 'swatches',
              component: 'group-list',
              itemProps: {
                label: '{{item.name}}',
              },
              defaultItem: {
                name: 'New Color',
              },
              description:
                'Any swatch settings set directly in Shopify will take priority',
              fields: [
                {
                  label: 'Swatch Name',
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
        {
          label: 'Shopify Option Name',
          name: 'swatchOptionName',
          component: 'text',
          description: `Name of the option in Shopify that uses swatches, e.g. 'Color', 'Flavor'`,
        },
      ],
      defaultValue: {
        swatchOptionName: 'Color',
      },
    },
    {
      label: 'Details',
      name: 'details',
      component: 'group',
      description:
        'Primary product option name, show primary option value, badge colors',
      fields: [
        {
          label: 'Primary Product Option Name',
          name: 'primaryOptionName',
          component: 'text',
          description: 'Name of the determining product option, e.g. "Color"',
        },
        {
          label: 'Show Primary Option Value in PDP Header',
          name: 'enabledOptionValueInPdpHeader',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Show Primary Option Value in Product Item',
          name: 'enabledOptionValueInPlpItem',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
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
              tag: 'New',
              bgColor: '#000000',
              textColor: '#FFFFFF',
            },
            {
              tag: 'Sale',
              bgColor: '#000000',
              textColor: '#FFFFFF',
            },
          ],
        },
      ],
      defaultValue: {
        primaryOptionName: 'Color',
        enabledOptionValueInPdpHeader: true,
        enabledOptionValueInPlpItem: true,
      },
    },
    {
      label: 'Media',
      name: 'media',
      component: 'group',
      description: 'Media aspect ratio type, manual aspect ratio',
      fields: [
        {
          label: 'Product Media Aspect Ratio Type',
          name: 'aspectRatioType',
          component: 'radio-group',
          direction: 'horizontal',
          variant: 'radio',
          description: `Determine if all Shopify product media uses its native aspect ratio or a manual aspect ratio set below`,
          options: [
            {label: 'Native', value: 'native'},
            {label: 'Manual', value: 'manual'},
          ],
        },
        {
          label: 'Manual Aspect Ratio',
          name: 'manualAspectRatio',
          component: 'text',
          description:
            'Required string format is "width/height", e.g. "3/4" or "1/1"',
        },
      ],
      defaultValue: {
        aspectRatioType: 'native',
        manualAspectRatio: '3/4',
      },
    },
    {
      label: 'Reviews',
      name: 'reviews',
      component: 'group',
      description:
        'Enable star rating, manual rating, star color, enable reviews widget, heading',
      fields: [
        {
          label: 'Enable Product Modal Star Rating',
          name: 'enabledStarRating',
          component: 'toggle',
          description:
            'For the actual star rating, API logic must be first implemented in the ProductStars component. Otherwise the manual rating will be used',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Manual Star Rating',
          name: 'manualStarRating',
          component: 'select',
          options: [
            {label: '1', value: '1'},
            {label: '1.5', value: '1.5'},
            {label: '2', value: '2'},
            {label: '2.5', value: '2.5'},
            {label: '3', value: '3'},
            {label: '3.5', value: '3.5'},
            {label: '4', value: '4'},
            {label: '4.5', value: '4.5'},
            {label: '5', value: '5'},
          ],
        },
        {
          label: 'Star Color',
          name: 'starColor',
          component: 'color',
        },
        {
          label: 'Enable Product Modal Reviews Widget',
          name: 'enabledReviewsWidget',
          component: 'toggle',
          description:
            'The reviews widget must be properly implemented within the ProductReviews component, otherwise a placeholder will be displayed',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Reviews Heading',
          name: 'heading',
          component: 'text',
        },
      ],
      defaultValue: {
        enabledStarRating: true,
        starColor: '#000000',
        enabledReviewsWidget: false,
        manualStarRating: '4.5',
        heading: 'Reviews',
      },
    },
    {
      label: 'Size Guide',
      name: 'sizeGuide',
      component: 'group',
      description: 'Enable, tag prefix, button text, heading, size guides',
      fields: [
        {
          label: 'Enable Size Guide',
          name: 'enabled',
          component: 'toggle',
          toggleLabels: {
            true: 'On',
            false: 'Off',
          },
        },
        {
          label: 'Product Option Name',
          name: 'productOption',
          component: 'text',
          description:
            'Name of product option that corresponds to the size guide',
        },
        {
          label: 'Product Tag Prefix',
          name: 'tagPrefix',
          component: 'text',
          description:
            'Prefix for the product tag used to find the accompanying size guide, if applicable, e.g. "sizeguide::"',
        },
        {
          label: 'Button Text',
          name: 'buttonText',
          component: 'text',
        },
        {
          label: 'Modal Heading (default)',
          name: 'heading',
          component: 'text',
        },
        {
          label: 'Size Guides',
          name: 'sizeGuides',
          component: 'group-list',
          description: 'Tag name, image, markdown',
          itemProps: {
            label: '{{item.name}}',
          },
          fields: [
            {
              label: 'Size Guide Name',
              name: 'name',
              component: 'text',
            },
            {
              label: 'Modal Heading',
              name: 'heading',
              component: 'text',
              description: 'If blank, the default heading will be used',
            },
            {
              label: 'Tag Name',
              name: 'tagName',
              component: 'text',
              description:
                'Tag name after the tag prefix, pairing the product with the size guide, e.g. tag name "pants" from "sizeguide::pants"',
            },
            {
              label: 'Size Guide Image',
              name: 'image',
              component: 'image',
            },
            {
              label: 'Size Guide Markdown',
              name: 'markdown',
              component: 'markdown',
            },
          ],
        },
      ],
      defaultValue: {
        enabled: false,
        productOption: 'Size',
        tagPrefix: 'sizeguide::',
        buttonText: 'Size Guide',
        heading: 'Size Guide',
      },
    },
  ],
};
