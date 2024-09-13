import {BUTTONS} from '~/settings/common';
import type {ColorHexCode, LinkCms, ProductCms} from '~/lib/types';

export interface CartSettings {
  heading: string;
  width: number;
  headerHeight: number;
  discounts: {
    enabled: boolean;
  };
  emptyCart: {
    message: string;
    links: {
      link: LinkCms;
      style: string;
    }[];
  };
  freeShipping: {
    enabled: boolean;
    minCartSpend: number;
    progressMessage: string;
    qualifiedMessage: string;
    progressBarColor: ColorHexCode;
  };
  totals: {
    subtext: string;
    checkoutText: string;
    buttonStyle: string;
  };
  upsell: {
    enabled: boolean;
    message: string;
    products: {
      product: ProductCms;
    }[];
  };
}

export default {
  label: 'Cart',
  name: 'cart',
  component: 'group',
  description:
    'Cart upsell, free shipping meter, empty cart, totals, discounts',
  fields: [
    {
      label: 'Heading',
      name: 'heading',
      component: 'text',
      defaultValue: 'My Cart',
    },
    {
      label: 'Width (px) (tablet/desktop)',
      name: 'width',
      component: 'number',
      defaultValue: 384,
    },
    {
      label: 'Header Height (px)',
      name: 'headerHeight',
      component: 'number',
      defaultValue: 56,
    },
    {
      label: 'Empty Cart',
      name: 'emptyCart',
      component: 'group',
      description: 'Message, links',
      fields: [
        {
          label: 'Empty Cart Message',
          name: 'message',
          component: 'text',
          defaultValue: 'Your cart is empty',
        },
        {
          label: 'Links',
          name: 'links',
          component: 'group-list',
          itemProps: {
            label: '{{item.link.text}}',
          },
          fields: [
            {
              label: 'Link',
              name: 'link',
              component: 'link',
              description: `To link to a product modal, write out an external url in this format: '?product=<product-handle>', e.g. '?product=basic-tee'. The product must be both active and on the Hydrogen sales channel'`,
            },
            {
              label: 'Button Style',
              name: 'style',
              component: 'select',
              options: BUTTONS,
            },
          ],
          defaultItem: {
            link: {url: '', text: 'Continue Shopping', type: 'isExternal'},
            style: 'theme-btn-primary',
          },
          defaultValue: [
            {
              link: {url: '', text: 'Continue Shopping', type: 'isExternal'},
              style: 'theme-btn-primary',
            },
          ],
        },
      ],
    },
    {
      label: 'Free Shipping Meter',
      name: 'freeShipping',
      component: 'group',
      description: 'Enable, minimum cart spend, messages',
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
          label: 'Minimum Cart Spend',
          name: 'minCartSpend',
          component: 'number',
          description: 'Minimum cart spend to qualify for free shipping',
        },
        {
          label: 'Progress Message',
          name: 'progressMessage',
          component: 'text',
          description:
            'Message when cart has not yet reached minimum spend. Use {{amount}} to display the remaining amount',
        },
        {
          label: 'Qualified Message',
          name: 'qualifiedMessage',
          component: 'text',
          description: 'Message when cart has qualified',
        },
        {
          label: 'Progress Bar Color',
          name: 'progressBarColor',
          component: 'color',
        },
      ],
      defaultValue: {
        enabled: false,
        minCartSpend: 100,
        progressMessage: `You're only {{amount}} away from free shipping!`,
        qualifiedMessage: `You've qualified for free shipping!`,
        progressBarColor: '#000000',
      },
    },
    {
      label: 'Totals',
      name: 'totals',
      component: 'group',
      description: 'Subtext, checkout text, checkout button style',
      fields: [
        {
          label: 'Subtext',
          name: 'subtext',
          component: 'text',
        },
        {
          label: 'Checkout Text',
          name: 'checkoutText',
          component: 'text',
        },
        {
          label: 'Button Style',
          name: 'buttonStyle',
          component: 'select',
          options: BUTTONS,
        },
      ],
      defaultValue: {
        subtext: 'Shipping & taxes calculated at checkout',
        checkoutText: 'Checkout',
        buttonStyle: 'theme-btn-primary',
      },
    },
    {
      label: 'Upsell',
      name: 'upsell',
      component: 'group',
      description: 'Enable, message, products',
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
          label: 'Message',
          name: 'message',
          component: 'text',
        },
        {
          label: 'Products',
          name: 'products',
          component: 'group-list',
          itemProps: {
            label: '{{item.product.handle}}',
          },
          description:
            'Products must be both active and on the Hydrogen sales channel to display.\n\nOnce a product is in the cart, it will be hidden in the upsell.',
          fields: [
            {
              name: 'product',
              component: 'productSearch',
              label: 'Product',
            },
          ],
        },
      ],
      defaultValue: {
        enabled: false,
        message: `Don't miss out on these items!`,
        products: [{handle: ''}, {handle: ''}],
      },
    },
    {
      label: 'Discounts',
      name: 'discounts',
      component: 'group',
      description: 'Enable discount code field',
      fields: [
        {
          label: 'Enabled',
          name: 'enabled',
          component: 'toggle',
          description: 'Enable discount code field',
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
  ],
};
