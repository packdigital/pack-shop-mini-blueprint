import {Image} from '~/components';

import type {ColorVariantOptionProps} from '../ProductItem.types';

export function ColorVariantOption({
  color,
  enabledColorNameOnHover,
  onClick,
  selectedVariantColor,
  swatches,
}: ColorVariantOptionProps) {
  const isActive = color.name === selectedVariantColor;

  /* Swatch color/image from Shopify takes priority over CMS */
  const swatchFromCms =
    swatches?.swatchesMap?.[color.name.toLowerCase().trim()];
  const colorFromCms = swatchFromCms?.color;
  const colorFromShopify = color.swatch?.color;
  const optionColor = colorFromShopify || colorFromCms;
  const imageFromCms = swatchFromCms?.image;
  const imageFromShopify = color.swatch?.image?.previewImage;
  const optionImage = imageFromShopify || imageFromCms;
  const optionImageUrl = optionImage?.url;

  return (
    <div className="group/color relative">
      <button
        aria-label={`Select ${color.name} color variant`}
        className={`theme-border-color relative flex size-4 items-center justify-center overflow-hidden rounded-[50%] border transition md:hover:border-black ${
          isActive ? 'border-black' : ''
        }`}
        onClick={onClick}
        style={{backgroundColor: optionColor}}
        type="button"
      >
        {optionImageUrl && (
          <Image
            data={{
              altText: color.name,
              url: optionImageUrl,
              width: optionImage?.width,
              height: optionImage?.height,
            }}
            width="24px"
            aspectRatio="1/1"
            className="media-fill"
          />
        )}

        <div
          className={`media-fill rounded-[50%] border-white transition-[border-width] duration-100 ${
            isActive ? 'border-2' : 'border-0'
          }`}
        />
      </button>

      {enabledColorNameOnHover && (
        <p className="theme-text-color-faded pointer-events-none absolute bottom-[calc(100%+2px)] left-1/4 hidden whitespace-nowrap rounded bg-neutral-50 px-1 text-2xs leading-[14px] opacity-0 transition duration-75 md:block group-hover/color:md:opacity-100">
          {color.name}
        </p>
      )}
    </div>
  );
}

ColorVariantOption.displayName = 'ColorVariantOption';
