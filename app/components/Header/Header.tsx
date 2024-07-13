import {useEffect, useState} from 'react';

import {usePromobar, useSettings, useTransparentHeader} from '~/hooks';

import {Navigation} from './Navigation';
import {Promobar} from './Promobar';

export function Header() {
  const {headerHeightClass, promobarOpen} = usePromobar();
  const {isTransparentHeader, isDarkHeaderIcons} = useTransparentHeader();
  const {header} = useSettings();

  const [isScrolledHeader, setIsScrolledHeader] = useState(false);

  useEffect(() => {
    const scrolledHeaderListener = () => {
      setIsScrolledHeader(window.scrollY >= 125);
    };

    window.addEventListener('scroll', scrolledHeaderListener);
    return () => {
      window.removeEventListener('scroll', scrolledHeaderListener);
    };
  }, []);

  const {bgColor = '#FFFFFF'} = {...header?.nav};

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex flex-col transition-all duration-300 ease-out ${headerHeightClass}`}
      style={{
        backgroundColor:
          isTransparentHeader && !isScrolledHeader ? 'transparent' : bgColor,
      }}
    >
      <Promobar />

      <Navigation
        isScrolledHeader={isScrolledHeader}
        isTransparentHeader={isTransparentHeader}
        isDarkHeaderIcons={isDarkHeaderIcons}
      />
    </header>
  );
}

Header.displayName = 'Header';
