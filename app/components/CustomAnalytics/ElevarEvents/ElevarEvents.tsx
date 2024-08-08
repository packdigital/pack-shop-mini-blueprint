import {useEffect} from 'react';
import {Script, useAnalytics} from '@shopify/hydrogen';
import type {CartLineUpdatePayload, PageViewPayload} from '@shopify/hydrogen';
import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen-react/storefront-api-types';

import {CustomAnalyticsEvent} from '~/components';
import {usePathStorage} from '~/hooks';

import {
  mapCartLine,
  mapProductItemVariant,
  mapProductPageVariant,
} from './elevar-events-utils';

/*
 * Env to set:
 * PUBLIC_ELEVAR_SIGNING_KEY // enables Elevar data layer, e.g. 1234567890
 * --> from the url within the `fetch()` call in the script, take the unique string of characters in between `/configs/` and `/config.json`
 */

const DEBUG = false;

const PAGE_TYPES: Record<string, string> = {
  '/': 'home',
  '/account': 'customersAccount',
  '/account/activate': 'customersActivateAccount',
  '/account/addresses': 'customersAddresses',
  '/account/login': 'customersLogin',
  '/account/orders/': 'customersOrders',
  '/account/register': 'customersRegister',
  '/account/reset': 'customersResetPassword',
  '/articles': 'article',
  '/blogs': 'blog',
  '/cart': 'cart',
  '/collections': 'collection',
  '/not-found': 'notFound',
  '/pages': 'page',
  '/404': 'notFound',
  '/pages/privacy-policy': 'policy',
  '/pages/search': 'search',
  '/products': 'product',
  '/search': 'search',
};

const emitEvent = (event: any) => {
  if (event.event === 'dl_route_update') {
    if (!window.ElevarInvalidateContext) return;
    window.ElevarInvalidateContext();
    if (DEBUG) console.log('DataLayer:elevar:pushContext');
    return;
  }
  window.ElevarDataLayer = window.ElevarDataLayer ?? [];
  window.ElevarDataLayer.push(event);
  if (DEBUG) console.log(`elevar : event emitted : ${event.event}`, event);
};

const viewPageEvent = ({url}: PageViewPayload) => {
  const newUrl = new URL(url);
  const {pathname, search} = newUrl;
  const pageType = pathname.startsWith('/account/orders/')
    ? PAGE_TYPES['/account/orders/']
    : PAGE_TYPES[pathname] ||
      PAGE_TYPES[pathname.split('/').slice(0, -1).join('/')] ||
      '';
  const event = {
    event: 'dl_route_update',
    user_properties: {
      visitor_type: 'guest',
      user_consent: '',
    },
    page: {
      path: pathname,
      title: document.title,
      type: pageType,
      search,
    },
  };
  emitEvent(event);
};

const viewProductEvent = ({
  product,
  selectedVariant,
}: {
  product: Product;
  selectedVariant: ProductVariant;
}) => {
  if (!product) return;
  let variant = selectedVariant;
  if (!variant) variant = product.variants?.nodes?.[0];
  if (!variant) return;
  variant = {
    ...variant,
    image: variant.image || product.featuredImage,
    product: {
      ...variant.product,
      vendor: product.vendor,
      collections: product.collections,
    },
  };
  const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
  const list = previousPath?.startsWith('/collections') ? previousPath : '';
  const event = {
    event: 'dl_view_item',
    user_properties: {
      visitor_type: 'guest',
      user_consent: '',
    },
    ecommerce: {
      currency_code: variant.price?.currencyCode,
      detail: {
        actionField: {list, action: 'detail'},
        products: [variant].map(mapProductPageVariant(list)),
      },
    },
  };
  emitEvent(event);
};

const viewCartEvent = ({cart}: CartLineUpdatePayload) => {
  if (!cart) return;
  const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
  const list =
    (window.location.pathname.startsWith('/collections') &&
      window.location.pathname) ||
    (previousPath?.startsWith('/collections') && previousPath) ||
    '';
  const event = {
    event: 'dl_view_cart',
    user_properties: {
      visitor_type: 'guest',
      user_consent: '',
    },
    ecommerce: {
      currency_code: cart?.cost?.totalAmount?.currencyCode,
      actionField: {list: 'Shopping Cart'},
      products: cart?.lines?.nodes?.slice(0, 12).map(mapCartLine(list)) || [],
      cart_id: cart.id?.split('/').pop(),
      cart_total: cart.cost?.totalAmount?.amount,
      cart_count: cart.totalQuantity,
    },
  };
  emitEvent(event);
};

const addToCartEvent = ({cart, currentLine}: CartLineUpdatePayload) => {
  if (!cart || !currentLine) return;
  const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
  const list =
    (window.location.pathname.startsWith('/collections') &&
      window.location.pathname) ||
    (previousPath?.startsWith('/collections') && previousPath) ||
    '';
  const event = {
    event: 'dl_add_to_cart',
    user_properties: {
      visitor_type: 'guest',
      user_consent: '',
    },
    ecommerce: {
      currency_code: cart.cost?.totalAmount?.currencyCode,
      add: {
        actionField: {list},
        products: [currentLine].map(mapCartLine(list)),
      },
      cart_id: cart.id?.split('/').pop(),
      cart_total: cart.cost?.totalAmount?.amount,
      cart_count: cart.totalQuantity,
    },
  };
  emitEvent(event);
};

const removeFromCartEvent = ({cart, currentLine}: CartLineUpdatePayload) => {
  if (!cart || !currentLine) return;
  const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
  const list =
    (window.location.pathname.startsWith('/collections') &&
      window.location.pathname) ||
    (previousPath?.startsWith('/collections') && previousPath) ||
    '';
  const event = {
    event: 'dl_remove_from_cart',
    user_properties: {
      visitor_type: 'guest',
      user_consent: '',
    },
    ecommerce: {
      currency_code: cart.cost?.totalAmount?.currencyCode,
      add: {
        actionField: {list},
        products: [currentLine].map(mapCartLine(list)),
      },
      cart_id: cart.id?.split('/').pop(),
      cart_total: cart.cost?.totalAmount?.amount,
      cart_count: cart.totalQuantity,
    },
  };
  emitEvent(event);
};

const clickProductItemEvent = ({
  selectedVariant,
  product,
  listIndex,
}: {
  selectedVariant: ProductVariant;
  product?: Product;
  listIndex?: number;
}) => {
  if (!selectedVariant) return;
  const list = window.location.pathname.startsWith('/collections')
    ? window.location.pathname
    : '';

  const variant = {
    ...selectedVariant,
    image: selectedVariant.image || product?.featuredImage || '',
    index: listIndex,
    product: {
      ...selectedVariant.product,
      vendor: product?.vendor,
      collections: product?.collections,
    },
    list,
  };

  const event = {
    event: 'dl_select_item',
    user_properties: {
      visitor_type: 'guest',
      user_consent: '',
    },
    ecommerce: {
      currency_code: variant.price?.currencyCode,
      click: {
        actionField: {list, action: 'click'},
        products: [variant].map(mapProductItemVariant(list)),
      },
    },
  };
  emitEvent(event);
};

const customerSubscribeEvent = ({
  email,
  phone,
}: {
  email?: string | null;
  phone?: string | null;
}) => {
  if (email) {
    const event = {
      event: 'dl_subscribe',
      lead_type: 'email',
      user_properties: {customer_email: email},
    };
    emitEvent(event);
  }
  if (phone) {
    const event = {
      event: 'dl_subscribe',
      lead_type: 'phone',
      user_properties: {customer_phone: phone},
    };
    emitEvent(event);
  }
};

export function ElevarEvents({elevarSigningKey}: {elevarSigningKey: string}) {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('ElevarEvents');
  usePathStorage();

  useEffect(() => {
    subscribe(CustomAnalyticsEvent.PAGE_VIEWED, (data) => {
      if (DEBUG)
        console.log('elevar : analytics subscribed : PAGE_VIEWED:', data);
      viewPageEvent(data);
    });
    subscribe(CustomAnalyticsEvent.PRODUCT_QUICK_SHOP_VIEWED, (data) => {
      if (DEBUG)
        console.log(
          'elevar : analytics subscribed : PRODUCT_QUICK_SHOP_VIEWED:',
          data,
        );
      viewProductEvent(data);
    });
    subscribe(CustomAnalyticsEvent.CART_VIEWED, (data) => {
      if (DEBUG)
        console.log('elevar : analytics subscribed : CART_VIEWED:', data);
      viewCartEvent(data);
    });
    subscribe(CustomAnalyticsEvent.PRODUCT_ADD_TO_CART, (data) => {
      if (DEBUG)
        console.log(
          'elevar : analytics subscribed : PRODUCT_ADD_TO_CART:',
          data,
        );
      addToCartEvent(data);
    });
    subscribe(CustomAnalyticsEvent.PRODUCT_REMOVED_FROM_CART, (data) => {
      if (DEBUG)
        console.log(
          'elevar : analytics subscribed : PRODUCT_REMOVED_FROM_CART:',
          data,
        );
      removeFromCartEvent(data);
    });
    subscribe(CustomAnalyticsEvent.PRODUCT_ITEM_CLICKED, (data) => {
      if (DEBUG)
        console.log(
          'elevar : analytics subscribed : PRODUCT_ITEM_CLICKED:',
          data,
        );
      clickProductItemEvent(data);
    });
    subscribe(CustomAnalyticsEvent.CUSTOMER_SUBSCRIBED, (data) => {
      if (DEBUG)
        console.log(
          'elevar : analytics subscribed : CUSTOMER_SUBSCRIBED:',
          data,
        );
      customerSubscribeEvent(data);
    });
    ready();
  }, []);

  return (
    <Script
      type="module"
      id="elevar-script"
      dangerouslySetInnerHTML={{
        __html: `try {
            const settings = {};
            const config = (await import("https://shopify-gtm-suite.getelevar.com/configs/${elevarSigningKey}/config.js")).default;
            const scriptUrl = settings.proxyPath
              ? settings.proxyPath + config.script_src_custom_pages_proxied
              : config.script_src_custom_pages;

            if (scriptUrl) {
              const { handler } = await import(scriptUrl);
              await handler(config, settings);
            }
          } catch (error) {
            console.error("Elevar Error:", error);
          }`,
      }}
    />
  );
}
