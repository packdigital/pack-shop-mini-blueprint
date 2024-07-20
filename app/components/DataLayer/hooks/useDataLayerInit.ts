import {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@remix-run/react';

interface LoggedInUserProperties {
  visitor_type: string;
  user_consent: string;
  customer_address_1: string;
  customer_address_2: string;
  customer_city: string;
  customer_country: string;
  customer_country_code: string;
  customer_email: string;
  customer_first_name: string;
  customer_id: string;
  customer_last_name: string;
  customer_order_count: string;
  customer_phone: string;
  customer_province_code: string;
  customer_province: string;
  customer_tags: string;
  customer_total_spent: string;
  customer_zip: string;
}

interface GuestUserProperties {
  visitor_type: string;
  user_consent: string;
}

export type UserProperties =
  | LoggedInUserProperties
  | GuestUserProperties
  | null;

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

export function useDataLayerInit({
  handleDataLayerEvent,
}: {
  handleDataLayerEvent: (event: Record<string, any>) => void;
}) {
  const pathnameRef = useRef<string | undefined>(undefined);
  const location = useLocation();
  const pathname = location.pathname;

  const [userProperties, setUserProperties] = useState<UserProperties>(null);

  const generateUserProperties = useCallback(async () => {
    let _userProperties: UserProperties = null;
    _userProperties = {
      visitor_type: 'guest',
      user_consent: '',
    };
    setUserProperties(_userProperties);
    return _userProperties;
  }, []);

  // Set page view event on path change
  useEffect(() => {
    const pageType = pathname.startsWith('/account/orders/')
      ? PAGE_TYPES['/account/orders/']
      : PAGE_TYPES[pathname] ||
        PAGE_TYPES[pathname.split('/').slice(0, -1).join('/')] ||
        '';
    const event = {
      event: 'dl_route_update',
      page: {
        path: pathname,
        title: document.title,
        type: pageType,
        search: window.location.search,
      },
    };
    handleDataLayerEvent(event);
  }, [pathname]);

  // Set previous paths and current path in session storage
  useEffect(() => {
    const currentPath = sessionStorage.getItem('CURRENT_PATH') || '';
    if (pathname === currentPath) {
      sessionStorage.setItem('PREVIOUS_PATH_INLC_REFRESH', pathname);
      return;
    }
    sessionStorage.setItem('PREVIOUS_PATH', currentPath);
    sessionStorage.setItem('PREVIOUS_PATH_INLC_REFRESH', currentPath);
    sessionStorage.setItem('CURRENT_PATH', pathname);
  }, [pathname]);

  // Generate user properties on customer ready and path change
  useEffect(() => {
    if (pathname === pathnameRef.current) return undefined;
    generateUserProperties();
    pathnameRef.current = pathname;
    return () => {
      pathnameRef.current = undefined;
    };
  }, [pathname]);

  return {
    generateUserProperties,
    userProperties,
  };
}
