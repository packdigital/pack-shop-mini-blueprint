import {v4 as uuidv4} from 'uuid';

import {PackEventName} from '../constants';

import {
  mapCartLine,
  mapProductItemVariant,
  mapProductPageVariant,
} from './utils';

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

const USER_PROPERTIES = {
  visitor_type: 'guest',
  user_consent: '',
};

const logSubscription = ({
  data,
  packEventName,
}: {
  data: Record<string, any>;
  packEventName: string;
}) => {
  console.log(
    `FueledEvents: subscribed to analytics for \`${packEventName}\`:`,
    data,
  );
};

const logError = ({
  packEventName,
  message = 'Unknown error',
}: {
  packEventName: string;
  message?: string | unknown;
}) => {
  console.error(`FueledEvents: error from \`${packEventName}\`: ${message}`);
};

const dispatchEvent = ({
  event,
  debug,
}: {
  event: Record<string, any>;
  debug?: boolean;
}) => {
  try {
    const dispatchedEvent = {
      ...event,
      event_id: uuidv4(),
      event_time: new Date().toISOString(),
    } as Record<string, any>;
    window.dispatchEvent(
      new CustomEvent(dispatchedEvent.event, {
        detail: dispatchedEvent,
      }),
    );
    if (debug)
      console.log(
        `FueledEvents: dispatched event listener for \`${dispatchedEvent.event}\`:`,
        dispatchedEvent,
      );
  } catch (error) {
    logError({
      packEventName: 'dispatchEvent',
      message: error instanceof Error ? error.message : error,
    });
  }
};

const viewPageEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.PAGE_VIEWED;
  try {
    if (debug) logSubscription({data, packEventName});

    const {url} = data;
    if (!url) throw new Error('missing `url` parameter');

    const newUrl = new URL(url);
    const {pathname, search} = newUrl;
    const pageType = pathname.startsWith('/account/orders/')
      ? PAGE_TYPES['/account/orders/']
      : PAGE_TYPES[pathname] ||
        PAGE_TYPES[pathname.split('/').slice(0, -1).join('/')] ||
        '';
    const event = {
      event: 'dl_route_update',
      user_properties: USER_PROPERTIES,
      page: {
        path: pathname,
        title: document.title,
        type: pageType,
        search,
      },
    };
    dispatchEvent({event, debug});
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const viewProductEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.PRODUCT_QUICK_SHOP_VIEWED;
  try {
    if (debug) logSubscription({data, packEventName});

    const {product, selectedVariant} = data;
    if (!product) throw new Error('missing `product` parameter');

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
      user_properties: USER_PROPERTIES,
      ecommerce: {
        currency_code: variant.price?.currencyCode,
        detail: {
          actionField: {list, action: 'detail'},
          products: [variant].map(mapProductPageVariant(list)),
        },
      },
    };
    dispatchEvent({event, debug});
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const viewCartEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.CART_VIEWED;
  try {
    if (debug) logSubscription({data, packEventName});

    const {cart} = data;
    if (!cart) throw new Error('missing `cart` parameter');

    const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
    const list =
      (window.location.pathname.startsWith('/collections') &&
        window.location.pathname) ||
      (previousPath?.startsWith('/collections') && previousPath) ||
      '';
    const event = {
      event: 'dl_view_cart',
      user_properties: USER_PROPERTIES,
      ecommerce: {
        currency_code: cart?.cost?.totalAmount?.currencyCode,
        actionField: {list: 'Shopping Cart'},
        products: cart?.lines?.nodes?.slice(0, 12).map(mapCartLine(list)) || [],
        cart_id: cart.id?.split('/').pop(),
        cart_total: cart.cost?.totalAmount?.amount,
        cart_count: cart.totalQuantity,
      },
    };
    dispatchEvent({event, debug});
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const addToCartEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.PRODUCT_ADD_TO_CART;
  try {
    if (debug) logSubscription({data, packEventName});

    const {cart, currentLine} = data;
    if (!cart || !currentLine)
      throw new Error('missing `cart` and/or `currentLine` parameter');

    const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
    const list =
      (window.location.pathname.startsWith('/collections') &&
        window.location.pathname) ||
      (previousPath?.startsWith('/collections') && previousPath) ||
      '';
    const event = {
      event: 'dl_add_to_cart',
      user_properties: USER_PROPERTIES,
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
    dispatchEvent({event, debug});
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const removeFromCartEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.PRODUCT_REMOVED_FROM_CART;
  try {
    if (debug) logSubscription({data, packEventName});

    const {cart, currentLine} = data;
    if (!cart || !currentLine)
      throw new Error('missing `cart` and/or `currentLine` parameter');

    const previousPath = sessionStorage.getItem('PREVIOUS_PATH');
    const list =
      (window.location.pathname.startsWith('/collections') &&
        window.location.pathname) ||
      (previousPath?.startsWith('/collections') && previousPath) ||
      '';
    const event = {
      event: 'dl_remove_from_cart',
      user_properties: USER_PROPERTIES,
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
    dispatchEvent({event, debug});
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const clickProductItemEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.PRODUCT_ITEM_CLICKED;
  try {
    if (debug) logSubscription({data, packEventName});

    const {selectedVariant, product, listIndex} = data;
    if (!selectedVariant)
      throw new Error('missing `selectedVariant` parameter');

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
      user_properties: USER_PROPERTIES,
      ecommerce: {
        currency_code: variant.price?.currencyCode,
        click: {
          actionField: {list, action: 'click'},
          products: [variant].map(mapProductItemVariant(list)),
        },
      },
    };
    dispatchEvent({event, debug});
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

const customerSubscribeEvent = ({
  debug,
  ...data
}: Record<string, any> & {debug?: boolean}) => {
  const packEventName = PackEventName.CUSTOMER_SUBSCRIBED;
  try {
    if (debug) logSubscription({data, packEventName});

    const {email, phone} = data;
    if (!email && !phone) throw new Error('missing `email` or `phone`');

    if (email) {
      const event = {
        event: 'dl_subscribe',
        lead_type: 'email',
        user_properties: {customer_email: email},
      };
      dispatchEvent({event, debug});
    }
    if (phone) {
      const event = {
        event: 'dl_subscribe',
        lead_type: 'phone',
        user_properties: {customer_phone: phone},
      };
      dispatchEvent({event, debug});
    }
  } catch (error) {
    logError({
      packEventName,
      message: error instanceof Error ? error.message : error,
    });
  }
};

export {
  dispatchEvent,
  viewPageEvent,
  viewProductEvent,
  viewCartEvent,
  addToCartEvent,
  removeFromCartEvent,
  clickProductItemEvent,
  customerSubscribeEvent,
};
