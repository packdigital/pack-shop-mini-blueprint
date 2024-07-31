import {navBarDefaults, promobarDefaults} from '~/settings/header';
import {useGlobal, useSettings} from '~/hooks';

export interface UsePromobarReturn {
  navHeight: number;
  promobarHeight: number;
  promobarPadding: number;
  headerHeight: number;
  promobarDisabled: boolean;
  promobarOpen: boolean;
  togglePromobar: (state: boolean) => void;
}

export function usePromobar(): UsePromobarReturn {
  const {promobarOpen, togglePromobar} = useGlobal();
  const {header} = useSettings();
  const {promobar} = {...header};
  const {height: navHeight = navBarDefaults.height} = {...header?.nav};
  const {
    height: promobarHeight = promobarDefaults.height,
    padding: promobarPadding = promobarDefaults.padding,
    enabled = promobarDefaults.enabled,
    messages,
  } = {...promobar};

  const promobarDisabled = !!promobar && (!enabled || !messages?.length);
  const headerHeight =
    navHeight +
    (promobarOpen && !promobarDisabled ? promobarHeight + promobarPadding : 0);

  return {
    navHeight,
    promobarHeight,
    promobarPadding,
    headerHeight,
    promobarDisabled,
    promobarOpen,
    togglePromobar,
  };
}
