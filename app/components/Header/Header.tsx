import {useEffect, useState} from 'react';

import {usePromobar, useSettings, useTransparentHeader} from '~/hooks';

import {Navigation} from './Navigation';
import {Promobar} from './Promobar';

export function Header() {
  const {headerHeightClass} = usePromobar();
  let isTransparentHeader = useTransparentHeader();
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
  isTransparentHeader = isTransparentHeader && !isScrolledHeader;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex flex-col border-b transition-all duration-300 ease-out ${
        isTransparentHeader
          ? 'border-transparent transition-[background-color]'
          : 'border-neutral-200'
      } ${headerHeightClass}`}
      style={{
        backgroundColor: isTransparentHeader ? 'transparent' : bgColor,
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
