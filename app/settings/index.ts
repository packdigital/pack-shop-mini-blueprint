import {registerStorefrontSettingsSchema} from '@pack/react';

import cart from './cart';
import footer from './footer';
import header from './header';
import homepage from './homepage';
import notFound from './not-found';
import product from './product';
import type {CartSettings} from './cart';
import type {FooterSettings} from './footer';
import type {HeaderSettings} from './header';
import type {HomepageSettings} from './homepage';
import type {NotFoundSettings} from './not-found';
import type {ProductSettings} from './product';

export function registerStorefrontSettings() {
  registerStorefrontSettingsSchema([
    cart,
    header,
    footer,
    product,
    homepage,
    notFound,
  ]);
}

export interface Settings {
  cart: CartSettings;
  footer: FooterSettings;
  header: HeaderSettings;
  homepage: HomepageSettings;
  notFound: NotFoundSettings;
  product: ProductSettings;
}
