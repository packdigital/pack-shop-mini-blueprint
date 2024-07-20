import {useMemo} from 'react';
import type {
  MediaEdge,
  MediaImage,
  Product,
} from '@shopify/hydrogen/storefront-api-types';

import {COLOR_OPTION_NAME} from '~/lib/constants';
import type {SelectedVariant} from '~/lib/types';

type Media = MediaEdge['node'];

interface UseProductMediaProps {
  product: Product;
  selectedVariant: SelectedVariant;
}

interface UseProductMediaReturn {
  initialIndex: number;
  maybeHasImagesByVariant: boolean;
  media: Media[];
}

export function useProductMedia({
  product,
  selectedVariant,
}: UseProductMediaProps): UseProductMediaReturn {
  const colorOptions = useMemo(() => {
    return product.options?.find((option) => option.name === COLOR_OPTION_NAME)
      ?.optionValues;
  }, [product.id]);

  const hasMultiColors = colorOptions && colorOptions.length > 1;

  // if multi color variants from same product, create table pairing color w/ any media matching alt tag
  const mediaMapByAltText = useMemo((): Record<string, Media[]> | null => {
    if (!hasMultiColors) return null;

    const colorKeys = colorOptions.map((color) => color.name.toLowerCase());

    return colorOptions.reduce((acc, color) => {
      const medias = product.media.nodes as Media[];
      const colorKey = color.name.toLowerCase();
      const colorMedias = medias.filter((item) => {
        const alt = (
          item.alt ||
          (item as MediaImage).image?.altText ||
          item.previewImage?.altText
        )
          ?.trim()
          .toLowerCase();
        return alt === colorKey && colorKeys.includes(alt);
      });
      return {...acc, [color.name]: colorMedias.length ? colorMedias : null};
    }, {});
  }, [product.id]);

  const mediaFromAltText = useMemo((): Media[] | null => {
    if (hasMultiColors && selectedVariant) {
      const color =
        selectedVariant?.selectedOptions?.find(
          (option) => option.name === COLOR_OPTION_NAME,
        )?.value || '';
      if (mediaMapByAltText?.[color]) {
        return mediaMapByAltText[color];
      }
    }
    return null;
  }, [hasMultiColors, mediaMapByAltText, selectedVariant?.id]);

  const media = useMemo(() => {
    return mediaFromAltText || product.media.nodes;
  }, [product.id, mediaFromAltText]);

  const initialIndex = useMemo(() => {
    if (!hasMultiColors || !selectedVariant || mediaFromAltText) return 0;
    const mediaIndex = product.media.nodes.findIndex(
      ({previewImage}) => previewImage?.url === selectedVariant?.image?.url,
    );
    return mediaIndex >= 0 ? mediaIndex : 0;
  }, [hasMultiColors, product.id, mediaFromAltText, selectedVariant?.id]);

  const maybeHasImagesByVariant = !!hasMultiColors && !mediaFromAltText;

  return {initialIndex, maybeHasImagesByVariant, media};
}
