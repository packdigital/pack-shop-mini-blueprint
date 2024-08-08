import type {LinkCms} from '~/lib/types';

export interface HomepageSettings {
  redirect: LinkCms;
}

export default {
  label: 'Homepage',
  name: 'homepage',
  component: 'group',
  description: 'Redirect link',
  fields: [
    {
      label: 'Redirect Link',
      name: 'redirect',
      component: 'link',
      description:
        'The homepage will redirect to this link, e.g. specific shop page or full store url, while in production and outside the customizer. If this is not set, the homepage will instead 404.',
    },
  ],
};
