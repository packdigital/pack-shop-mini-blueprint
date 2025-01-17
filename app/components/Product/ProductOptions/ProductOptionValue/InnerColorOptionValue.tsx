import {useMemo} from 'react';

import {Image} from '~/components';
import {isLightHexColor} from '~/lib/utils';

import type {InnerColorOptionValueProps} from './ProductOptionValue.types';

export function InnerColorOptionValue({
  isAvailable,
  isDisabled,
  isSelected,
  optionValue,
  swatch,
}: InnerColorOptionValueProps) {
  const isLightColor = useMemo(() => {
    return isLightHexColor(swatch?.color);
  }, [swatch?.color]);

  const validClass = !isDisabled
    ? 'theme-color-option-value-valid'
    : 'cursor-not-allowed';
  const selectedClass = isSelected ? 'theme-color-option-value-selected' : '';
  const unavailableClass = !isAvailable
    ? `after:h-px after:w-[150%] after:rotate-[135deg] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 overflow-hidden ${
        isLightColor ? 'after:bg-black' : 'after:bg-white'
      }`
    : '';

  /* Swatch color/image from Shopify takes priority over CMS */
  const colorFromCms = swatch?.color;
  const colorFromShopify = optionValue.swatch?.color;
  const optionColor = colorFromShopify || colorFromCms;
  const imageFromCms = swatch?.image;
  const imageFromShopify = optionValue.swatch?.image?.previewImage;
  const optionImage = imageFromShopify || imageFromCms;
  const optionImageUrl = optionImage?.url;

  return (
    <div
      className={`theme-color-option-value relative flex items-center justify-center overflow-hidden transition ${validClass} ${unavailableClass} ${selectedClass}`}
      style={{backgroundColor: optionColor}}
    >
      {optionImageUrl && (
        <Image
          data={{
            altText: optionValue.name,
            url: optionImageUrl,
            width: optionImage?.width,
            height: optionImage?.height,
          }}
          aspectRatio="1/1"
          width="40px"
          className="media-fill"
        />
      )}

      <div
        className={`media-fill rounded-[50%] border-white transition-[border-width] duration-100 ${
          isSelected ? 'border-[3px]' : 'border-0'
        }`}
      />
    </div>
  );
}

InnerColorOptionValue.displayName = 'InnerColorOptionValue';
