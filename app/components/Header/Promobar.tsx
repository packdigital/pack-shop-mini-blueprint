import {useEffect} from 'react';
import type {SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, EffectFade, Autoplay, Navigation} from 'swiper/modules';

import {promobarDefaults} from '~/settings/header';
import {Link} from '~/components';
import {useGlobal, useMatchMedia, usePromobar, useSettings} from '~/hooks';

export function Promobar() {
  const {
    promobarDisabled,
    promobarOpen,
    promobarMobileHeight,
    promobarDesktopHeight,
    togglePromobar,
  } = usePromobar();
  const {closeAll} = useGlobal();
  const {header} = useSettings();
  const {promobar} = {...header};
  const {
    autohide = promobarDefaults.autohide,
    bgColor = promobarDefaults.bgColor,
    borderRadius = promobarDefaults.borderRadius,
    color = promobarDefaults.color,
    delay = promobarDefaults.delay,
    effect = promobarDefaults.effect,
    enabled = promobarDefaults.enabled,
    messages,
    speed = promobarDefaults.speed,
  } = {
    ...promobar,
  };

  const isMobileViewport = useMatchMedia(
    // no need to check if mobile view if both heights are the same
    promobarMobileHeight !== promobarDesktopHeight ? '(max-width: 767px)' : '',
  );
  const promobarHeight = isMobileViewport
    ? promobarMobileHeight
    : promobarDesktopHeight;

  const swiperParams = {
    autoplay: {
      delay,
      disableOnInteraction: false,
    },
    direction: effect === 'slide-vertical' ? 'vertical' : 'horizontal',
    effect: effect?.split('-')[0] || 'fade',
    fadeEffect: {
      crossFade: true,
    },
    loop: messages?.length > 1,
    modules: [A11y, Autoplay, EffectFade, Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed,
    style: {
      '--swiper-navigation-color': color,
      '--swiper-navigation-size': '12px',
    },
  } as SwiperProps;

  useEffect(() => {
    const setPromobarVisibility = () => {
      if (document.body.style.position === 'fixed') return;
      togglePromobar(window.scrollY <= promobarHeight);
    };

    if (!autohide) {
      togglePromobar(true);
      window.removeEventListener('scroll', setPromobarVisibility);
      return undefined;
    }

    window.addEventListener('scroll', setPromobarVisibility);
    return () => {
      window.removeEventListener('scroll', setPromobarVisibility);
    };
  }, [autohide, promobarHeight]);

  return !promobarDisabled ? (
    <div
      className={`overflow-hidden transition-[height] ease-out will-change-transform ${
        promobarOpen && !promobarDisabled
          ? 'theme-promobar-height duration-300'
          : 'h-0 duration-[50ms]'
      }`}
    >
      <div className="theme-promobar-padding">
        {enabled && messages?.length ? (
          <Swiper
            {...swiperParams}
            className="swiper-wrapper-center relative flex h-full items-center"
            style={{
              backgroundColor: bgColor,
              borderRadius: `${borderRadius}px`,
            }}
          >
            {messages.map(({message, link}, index) => {
              return (
                <SwiperSlide key={index} className="px-4">
                  <div
                    className={`px-contained flex min-h-full items-center justify-center text-center text-xs font-light tracking-[0.04em] sm:text-sm ${
                      promobarOpen ? 'theme-promobar-slider-height' : 'h-0'
                    }`}
                    style={{color}}
                  >
                    <Link
                      aria-label={message}
                      className="select-none"
                      draggable={false}
                      to={link.url}
                      onClick={closeAll}
                      newTab={link.newTab}
                      type={link.type}
                    >
                      {message}
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}

            {messages.length > 1 && (
              <>
                <button
                  aria-label="See previous slide"
                  className="swiper-button-prev !left-4 md:!left-8 xl:!left-12"
                  type="button"
                />

                <button
                  aria-label="See next slide"
                  className="swiper-button-next !right-4 md:!right-8 xl:!right-12"
                  type="button"
                />
              </>
            )}
          </Swiper>
        ) : null}
      </div>
    </div>
  ) : null;
}

Promobar.displayName = 'Promobar';
