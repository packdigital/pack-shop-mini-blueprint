import {Image, Svg} from '~/components';
import {isLightHexColor} from '~/lib/utils';
import {navBarDefaults} from '~/settings/header';
import {useGlobal, usePromobar, useSettings} from '~/hooks';

export function Navigation({
  isScrolledHeader,
  isTransparentHeader,
}: {
  isScrolledHeader: boolean;
  isTransparentHeader: boolean;
}) {
  const {header} = useSettings();
  const {
    hideLogo = navBarDefaults.hideLogo,
    bgColor = navBarDefaults.bgColor,
    logoLight = navBarDefaults.logoLight,
    logoDark = navBarDefaults.logoDark,
    iconColorLight = navBarDefaults.iconColorLight,
    iconColorDark = navBarDefaults.iconColorDark,
  } = {
    ...header?.nav,
  };
  const {promobarDisabled} = usePromobar();
  const {openCart} = useGlobal();
  const isLightBgColor = isLightHexColor(bgColor);

  const isTransparentBg = !isScrolledHeader && isTransparentHeader;
  const isLightIcons = isTransparentBg || !isLightBgColor;
  const iconColor = isLightIcons ? iconColorLight : iconColorDark;
  const logo = isLightIcons ? logoLight : logoDark;
  const logoSrc = isLightIcons ? logoLight?.src : logoDark?.src;

  return (
    <div
      className={`px-contained relative z-[1] flex flex-1 items-center justify-between gap-4 overflow-hidden bg-transparent transition md:gap-8 ${
        promobarDisabled ? 'pt-2' : ''
      }`}
    >
      <div
        className="theme-nav-logo-height relative"
        style={{
          aspectRatio:
            logo?.width && logo?.height ? logo.width / logo.height : 1,
        }}
      >
        {!hideLogo && (
          <Image
            data={{
              altText: logo?.altText || 'Storefront logo',
              url: logoSrc,
              width: logo?.width,
              height: logo?.height,
            }}
            className="media-fill bg-transparent"
            withLoadingAnimation={false}
            sizes="200px"
          />
        )}
      </div>

      <div className="flex items-center justify-end gap-4 md:gap-5">
        <div className="relative flex items-center">
          <button
            aria-label="Open cart"
            className="w-6"
            onClick={openCart}
            type="button"
          >
            <Svg
              className="w-full"
              src="/svgs/bag.svg#bag"
              title="Cart"
              viewBox="0 0 24 24"
              style={{color: iconColor}}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

Navigation.displayName = 'Navigation';
