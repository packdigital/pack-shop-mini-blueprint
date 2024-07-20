import {useMemo} from 'react';
import type {ProductOptionValue} from '@shopify/hydrogen/storefront-api-types';

import {Image} from '~/components';
import {isLightHexColor} from '~/lib/utils';
import type {Swatch} from '~/lib/types';

interface InnerColorOptionValueProps {
  isAvailable: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  optionValue: ProductOptionValue;
  swatch?: Swatch | null;
}

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
    ? 'md:group-hover/color:border-text'
    : 'cursor-not-allowed';
  const selectedClass = isSelected ? 'border-text' : '';
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
  const optionImageUrl = imageFromShopify?.url || imageFromCms?.src;

  return (
    <div
      className={`relative flex size-8 items-center justify-center overflow-hidden rounded-[50%] border border-border transition ${validClass} ${unavailableClass} ${selectedClass}`}
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
          width="32"
          className="media-fill"
          isStatic
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
