import type {Settings} from '~/lib/types';

export type Action = {type: string; payload?: any};

export type Dispatch = ({type, payload}: Action) => void;

export type Modal = {
  children: React.ReactNode | null;
  props?: Record<string, any>;
};

/*
 * MENU CONTEXT PROVIDER -----------------------------------------------------
 */

export interface MenuState {
  cartOpen: boolean;
  modal: Modal;
}

export interface MenuActions {
  openCart: () => void;
  closeCart: () => void;
  openModal: (children: React.ReactNode, props?: Record<string, any>) => void;
  closeModal: () => void;
  closeAll: () => void;
}

export interface MenuContext {
  state: MenuState;
  actions: MenuActions;
}

/*
 * PROMOBAR CONTEXT PROVIDER -----------------------------------------------------
 */

export interface PromobarState {
  promobarOpen: boolean;
}

export interface PromobarActions {
  togglePromobar: (isOpen: boolean) => void;
}

export interface PromobarContext {
  state: PromobarState;
  actions: PromobarActions;
}

/*
 * SETTINGS CONTEXT PROVIDER -----------------------------------------------------
 */

export interface SettingsState {
  settings: Settings;
}

export interface SettingsContext {
  state: SettingsState;
}

/*
 * GLOBAL CONTEXT PROVIDER -----------------------------------------------------
 */

export interface GlobalState {
  isCartReady: boolean;
}

export interface GlobalActions {
  setIsCartReady: (isReady: boolean) => void;
}

export interface GlobalContext {
  state: GlobalState;
  actions: GlobalActions;
}
