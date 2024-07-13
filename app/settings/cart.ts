import type {LinkCms, ProductCms} from '~/lib/types';

import {COLORS} from './common';

export interface CartSettings {
  heading: string;
  discounts: {
    enabled: boolean;
  };
  emptyCart: {
    message: string;
    links: {
      link: LinkCms;
    }[];
  };
  freeShipping: {
    enabled: boolean;
    minCartSpend: number;
    progressMessage: string;
    qualifiedMessage: string;
    progressBarColor: string;
  };
  totals: {
    subtext: string;
    checkoutText: string;
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
            },
          ],
          defaultItem: {
            link: {url: '', text: 'Continue Shopping'},
          },
          defaultValue: [{link: {url: '', text: 'Continue Shopping'}}],
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
          description: `When enabled, free shipping meter is not displayed for international customers by default`,
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
      description: 'Subtext, checkout text',
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
      ],
      defaultValue: {
        subtext: 'Shipping & taxes calculated at checkout',
        checkoutText: 'Checkout',
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
  ],
};
