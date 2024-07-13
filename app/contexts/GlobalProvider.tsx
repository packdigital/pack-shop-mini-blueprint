import type {ReactNode} from 'react';
import {createContext, useContext, useMemo, useReducer, useState} from 'react';
import EventEmitter from 'eventemitter3';
import type {Customer} from '@shopify/hydrogen-react/storefront-api-types';

import type {Action, Dispatch, GlobalContext, GlobalState} from '~/lib/types';
import {useRootLoaderData} from '~/hooks';

const emitter = new EventEmitter();

const Context = createContext({state: {}, actions: {}} as GlobalContext);

const globalState = {
  cartOpen: false,
  modal: {children: null, props: {}},
  promobarOpen: true,
  emitter,
  previewModeCustomer: undefined,
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
    case 'SET_PREVIEW_MODE_CUSTOMER':
      return {
        ...state,
        previewModeCustomer: action.payload,
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
  setPreviewModeCustomer: (customer: Customer | null | undefined) => {
    dispatch({type: 'SET_PREVIEW_MODE_CUSTOMER', payload: customer});
  },
});

export function GlobalProvider({children}: {children: ReactNode}) {
  const {isPreviewModeEnabled, siteSettings} = useRootLoaderData();
  const [state, dispatch] = useReducer(reducer, {
    ...globalState,
    settings: siteSettings?.data?.siteSettings?.settings,
    isPreviewModeEnabled,
  });

  const value = useMemo(() => ({state, actions: actions(dispatch)}), [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useGlobalContext = () => useContext(Context);
