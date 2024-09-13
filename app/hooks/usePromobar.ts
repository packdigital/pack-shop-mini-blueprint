import {useMemo} from 'react';

import {navBarDefaults, promobarDefaults} from '~/settings/header';
import {useGlobal, useSettings} from '~/hooks';

export interface UsePromobarReturn {
  headerHeightClass: string;
  mainTopPaddingClass: string;
  headerMobileHeight: number;
  headerDesktopHeight: number;
  pdpStickyClass: string;
  promobarDisabled: boolean;
  promobarOpen: boolean;
  promobarMobileHeight: number;
  promobarDesktopHeight: number;
  togglePromobar: (state: boolean) => void;
}

export function usePromobar(): UsePromobarReturn {
  const {promobarOpen, togglePromobar} = useGlobal();
  const {header} = useSettings();

  return useMemo(() => {
    const {promobar} = {...header};
    const {
      hideNav = navBarDefaults.hideNav,
      heightDesktop = navBarDefaults.heightDesktop,
      heightMobile = navBarDefaults.heightMobile,
    } = {...header?.nav};
    const navDesktopHeight = hideNav ? 0 : heightDesktop;
    const navMobileHeight = hideNav ? 0 : heightMobile;
    const {
      sliderHeightDesktop:
        promobarDesktopSliderHeight = promobarDefaults.sliderHeightDesktop,
      paddingDestkop: promobarDesktopPadding = promobarDefaults.paddingDesktop,
      sliderHeightMobile:
        promobarMobileSliderHeight = promobarDefaults.sliderHeightMobile,
      paddingMobile: promobarMobilePadding = promobarDefaults.paddingMobile,
      enabled = promobarDefaults.enabled,
      messages,
    } = {...promobar};
    const promobarMobileHeight =
      promobarMobileSliderHeight + promobarMobilePadding * 2;
    const promobarDesktopHeight =
      promobarDesktopSliderHeight + promobarDesktopPadding * 2;
    const mobileNavPromobarCombinedHeight =
      navMobileHeight + promobarMobileHeight;
    const desktopNavPromobarCombinedHeight =
      navDesktopHeight + promobarDesktopHeight;

    const promobarDisabled = !!promobar && (!enabled || !messages?.length);
    const headerHeightClass =
      promobarOpen && !promobarDisabled
        ? 'theme-nav-promobar-combined-height'
        : 'theme-nav-height';
    const mainTopPaddingClass =
      promobarOpen && !promobarDisabled
        ? 'theme-main-padding-top-with-nav-promobar-combined'
        : 'theme-main-padding-top-with-nav';
    const headerMobileHeight =
      promobarOpen && !promobarDisabled
        ? mobileNavPromobarCombinedHeight
        : navMobileHeight;
    const headerDesktopHeight =
      promobarOpen && !promobarDisabled
        ? desktopNavPromobarCombinedHeight
        : navDesktopHeight;
    const pdpStickyClass =
      promobarOpen && !promobarDisabled
        ? 'theme-pdp-sticky-with-nav-promobar-combined'
        : 'theme-pdp-sticky-with-nav';

    return {
      headerHeightClass,
      headerMobileHeight,
      headerDesktopHeight,
      mainTopPaddingClass,
      pdpStickyClass,
      promobarDisabled,
      promobarOpen,
      promobarMobileHeight,
      promobarDesktopHeight,
      togglePromobar,
    };
  }, [header, promobarOpen, togglePromobar]);
}
