export interface FooterSettings {
  subtext: string;
}

export default {
  label: 'Footer',
  name: 'footer',
  component: 'group',
  description: 'Subtext',
  fields: [
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
