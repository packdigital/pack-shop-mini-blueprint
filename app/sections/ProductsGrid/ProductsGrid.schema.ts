import {containerSettings} from '~/settings/container';

export function Schema() {
  return {
    label: 'Products Grid',
    key: 'products-grid',
    previewSrc: '',
    fields: [
      {
        label: 'Heading',
        name: 'heading',
        component: 'text',
        defaultValue: '',
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
        defaultValue: [],
      },
      {
        label: 'Columns (desktop)',
        name: 'columnsDesktop',
        component: 'select',
        options: [
          {label: '1', value: 'lg:grid-cols-1'},
          {label: '2', value: 'lg:grid-cols-2'},
          {label: '3', value: 'lg:grid-cols-3'},
          {label: '4', value: 'lg:grid-cols-4'},
          {label: '5', value: 'lg:grid-cols-5'},
        ],
        defaultValue: 'lg:grid-cols-4',
      },
      {
        label: 'Columns (tablet)',
        name: 'columnsTablet',
        component: 'select',
        options: [
          {label: '1', value: 'md:grid-cols-1'},
          {label: '2', value: 'md:grid-cols-2'},
          {label: '3', value: 'md:grid-cols-3'},
          {label: '4', value: 'md:grid-cols-4'},
        ],
        defaultValue: 'md:grid-cols-3',
      },
      {
        label: 'Columns (mobile)',
        name: 'columnsMobile',
        component: 'select',
        options: [
          {label: '1', value: 'grid-cols-1'},
          {label: '2', value: 'grid-cols-2'},
          {label: '3', value: 'grid-cols-3'},
        ],
        defaultValue: 'grid-cols-2',
      },
      containerSettings(),
    ],
  };
}
