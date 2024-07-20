import type {LinkCms} from '~/lib/types';

export interface FooterSettings {
  link: LinkCms;
  subtext: string;
}

export default {
  label: 'Footer',
  name: 'footer',
  component: 'group',
  description: 'Footer link, subtext',
  fields: [
    {
      label: 'Footer Link',
      name: 'link',
      component: 'link',
    },
    {
      label: 'Footer Subtext',
      name: 'subtext',
      component: 'markdown',
    },
  ],
  defaultValue: {
    link: {
      url: '',
      text: 'Shop our main store',
    },
  },
};
