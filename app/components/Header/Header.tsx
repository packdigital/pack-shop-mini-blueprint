import {useEffect, useState} from 'react';

import {navBarDefaults} from '~/settings/header';
import {usePromobar, useSettings, useTransparentHeader} from '~/hooks';

import {Navigation} from './Navigation';
import {Promobar} from './Promobar';

export function Header() {
  const {headerHeight} = usePromobar();
  let isTransparentHeader = useTransparentHeader();
  const {header} = useSettings();

  const [isScrolledHeader, setIsScrolledHeader] = useState(false);

  useEffect(() => {
    const scrolledHeaderListener = () => {
      setIsScrolledHeader(window.scrollY >= headerHeight + 25);
    };

    window.addEventListener('scroll', scrolledHeaderListener);
    return () => {
      window.removeEventListener('scroll', scrolledHeaderListener);
    };
  }, []);

  const {
    bgColor = navBarDefaults.bgColor,
    borderColor = navBarDefaults.borderColor,
  } = {...header?.nav};
  isTransparentHeader = isTransparentHeader && !isScrolledHeader;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex flex-col border-b transition-all duration-150 ease-out ${
        isTransparentHeader
          ? 'border-transparent transition-[background-color]'
          : ''
      }`}
      style={{
        height: `${headerHeight}px`,
        backgroundColor: isTransparentHeader ? 'transparent' : bgColor,
        borderColor: isTransparentHeader ? 'transparent' : borderColor,
      }}
    >
      <Promobar />

      <Navigation
        isScrolledHeader={isScrolledHeader}
        isTransparentHeader={isTransparentHeader}
      />
    </header>
  );
}

Header.displayName = 'Header';
