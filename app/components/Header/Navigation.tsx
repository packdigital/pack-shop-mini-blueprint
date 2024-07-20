import {Image, Link, Svg} from '~/components';
import {useGlobal, usePromobar, useSettings} from '~/hooks';
import {isLightHexColor} from '~/lib/utils';

const DEFAULT_LOGO_DARK =
  'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/pack-logo-dark.svg?v=1720754738';
const DEFAULT_LOGO_LIGHT =
  'https://cdn.shopify.com/s/files/1/0822/0439/3780/files/pack-logo-light.svg?v=1720754740';

export function Navigation({
  isScrolledHeader,
  isTransparentHeader,
}: {
  isScrolledHeader: boolean;
  isTransparentHeader: boolean;
}) {
  const {header} = useSettings();
  const {
    hideLogo,
    bgColor,
    logoLight,
    logoDark,
    iconColorLight,
    iconColorDark,
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
  const logoSrc = isLightIcons
    ? logoLight?.src || DEFAULT_LOGO_LIGHT
    : logoDark?.src || DEFAULT_LOGO_DARK;

  return (
    <div
      className={`px-contained relative z-[1] flex flex-1 items-center justify-between gap-4 bg-transparent transition md:gap-8 ${
        promobarDisabled ? 'pt-2' : ''
      }`}
    >
      <div
        className="relative h-8"
        style={{
          aspectRatio:
            logo?.width && logo?.height ? logo.width / logo.height : 1,
        }}
      >
        {!hideLogo && (
          <Link aria-label="Go to homepage" to="/" className="size-full">
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
          </Link>
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
