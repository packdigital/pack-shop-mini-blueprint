import type {Settings} from '~/lib/types';

export type Action = {type: string; payload?: any};

export type Dispatch = ({type, payload}: Action) => void;

export type Modal = {
  children: React.ReactNode | null;
  props?: Record<string, any>;
};

export interface GlobalState {
  cartOpen: boolean;
  modal: Modal;
  promobarOpen: boolean;
  settings: Settings;
  emitter: any;
  isPreviewModeEnabled: boolean;
}

export interface GlobalActions {
  openCart: () => void;
  closeCart: () => void;
  openModal: (children: React.ReactNode, props?: Record<string, any>) => void;
  closeModal: () => void;
  togglePromobar: (isOpen: boolean) => void;
  closeAll: () => void;
}

export interface GlobalContext {
  state: GlobalState;
  actions: GlobalActions;
}
