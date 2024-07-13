import type {LinkCms} from '~/lib/types';

export interface FooterSettings {
  link: LinkCms;
}

export default {
  label: 'Footer',
  name: 'footer',
  component: 'group',
  description: 'Footer link',
  fields: [
    {
      label: 'Footer Link',
      name: 'link',
      component: 'link',
    },
  ],
  defaultValue: {
    link: {
      url: '',
      text: 'Shop our main store',
    },
  },
};
