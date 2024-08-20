import {createContext, useContext, useEffect, useMemo, useReducer} from 'react';
import {useCart} from '@shopify/hydrogen-react';
import type {ReactNode} from 'react';

import type {Action, Dispatch, GlobalContext, GlobalState} from '~/lib/types';
import {useRootLoaderData} from '~/hooks';

const Context = createContext({state: {}, actions: {}} as GlobalContext);

const globalState = {
  cartOpen: false,
  modal: {children: null, props: {}},
  promobarOpen: true,
};

const reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case 'OPEN_CART':
      return {
        ...state,
        cartOpen: true,
        desktopMenuOpen: false,
        mobileMenuOpen: false,
        modal: {children: null, props: {}},
        searchOpen: false,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        cartOpen: false,
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        cartOpen: false,
        desktopMenuOpen: false,
        mobileMenuOpen: false,
        modal: {
          children: action.payload.children,
          props: {...action.payload.props},
        },
        searchOpen: false,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: {children: null, props: {}},
      };
    case 'TOGGLE_PROMOBAR':
      return {
        ...state,
        promobarOpen: action.payload,
      };
    case 'CLOSE_ALL':
      return {
        ...state,
        cartOpen: false,
        modal: {children: null, props: {}},
      };
    case 'SET_CART_IS_READY':
      return {
        ...state,
        cartIsReady: action.payload,
      };
    default:
      throw new Error(`Invalid Context action of type: ${action.type}`);
  }
};

const actions = (dispatch: Dispatch) => ({
  openCart: () => {
    dispatch({type: 'OPEN_CART'});
  },
  closeCart: () => {
    dispatch({type: 'CLOSE_CART'});
  },
  openModal: (children: ReactNode, props?: Record<string, any>) => {
    dispatch({type: 'OPEN_MODAL', payload: {children, props}});
  },
  closeModal: () => {
    dispatch({type: 'CLOSE_MODAL'});
  },
  togglePromobar: (isOpen: boolean) => {
    dispatch({type: 'TOGGLE_PROMOBAR', payload: isOpen});
  },
  closeAll: () => {
    dispatch({type: 'CLOSE_ALL'});
  },
  setCartIsReady: (isReady: boolean) => {
    dispatch({type: 'SET_CART_IS_READY', payload: isReady});
  },
});

export function GlobalProvider({children}: {children: ReactNode}) {
  const {isPreviewModeEnabled, siteSettings} = useRootLoaderData();
  const cart = useCart();
  const cartIsIdle = cart.status === 'idle';
  const [state, dispatch] = useReducer(reducer, {
    ...globalState,
    settings: siteSettings?.data?.siteSettings?.settings,
    isPreviewModeEnabled,
    cartIsReady: cartIsIdle,
  });

  const value = useMemo(() => ({state, actions: actions(dispatch)}), [state]);

  useEffect(() => {
    if (cartIsIdle && !state.cartIsReady) {
      value.actions.setCartIsReady(true);
    } else {
      // uninitialized cart never becomes idle so instead set cart ready after 1 sec
      setTimeout(() => {
        value.actions.setCartIsReady(true);
      }, 1000);
    }
  }, [cartIsIdle]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useGlobalContext = () => useContext(Context);
