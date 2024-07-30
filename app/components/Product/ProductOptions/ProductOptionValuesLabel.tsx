import {useCallback, useMemo} from 'react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {useGlobal, useSettings} from '~/hooks';

import {SizeGuide} from '../SizeGuide';

interface ProductOptionValuesLabelProps {
  isShoppableProductCard?: boolean;
  name: string;
  product: Product;
  selectedValue: string | null;
}

export function ProductOptionValuesLabel({
  isShoppableProductCard,
  name,
  product,
  selectedValue,
}: ProductOptionValuesLabelProps) {
  const {openModal} = useGlobal();
  const {product: productSettings} = useSettings();
  const {
    enabled,
    productOption = 'Size',
    tagPrefix,
    buttonText: sizeGuideButtonText = 'Size Guide',
    heading,
    sizeGuides,
  } = {
    ...productSettings?.sizeGuide,
  };

  const isSize = name === productOption;

  const sizeGuide = useMemo(() => {
    if (!isSize || !enabled || !product.tags?.length || !sizeGuides?.length)
      return null;
    const sizeGuideTag = product.tags.find((tag) =>
      tag.toLowerCase().startsWith(tagPrefix?.toLowerCase()),
    );
    if (!sizeGuideTag) return null;
    const sizeGuideTagName = sizeGuideTag
      .toLowerCase()
      .replace(tagPrefix, '')
      .trim();
    return sizeGuides.find((sizeGuide) => {
      return sizeGuide.tagName?.toLowerCase().trim() === sizeGuideTagName;
    });
  }, [enabled, isSize, product.id, tagPrefix, sizeGuides]);

  const handleSizeGuideClick = useCallback(() => {
    if (!sizeGuide) return;
    openModal(<SizeGuide sizeGuide={sizeGuide} heading={heading} />);
  }, [heading, sizeGuide]);

  return (
    <div
      className={`mb-2 flex items-center justify-between gap-2 ${
        isShoppableProductCard ? 'theme-product-option-label' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <h3 className="theme-body text-base font-semibold leading-6">{name}</h3>

        {selectedValue && (
          <span className="theme-selected-option-value theme-text-color-faded text-sm">
            {selectedValue}
          </span>
        )}
      </div>

      {sizeGuide && (
        <button
          className="text-underline theme-text-color-faded text-xs"
          onClick={handleSizeGuideClick}
          type="button"
        >
          {sizeGuideButtonText}
        </button>
      )}
    </div>
  );
}

ProductOptionValuesLabel.displayName = 'ProductOptionValuesLabel';
