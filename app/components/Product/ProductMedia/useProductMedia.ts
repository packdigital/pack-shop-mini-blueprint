import {useMemo} from 'react';
import type {
  MediaEdge,
  MediaImage,
  Product,
} from '@shopify/hydrogen/storefront-api-types';

import type {SelectedVariant, Swatches} from '~/lib/types';

type Media = MediaEdge['node'];

interface UseProductMediaProps {
  product: Product;
  selectedVariant: SelectedVariant;
  swatches?: Swatches;
}

interface UseProductMediaReturn {
  initialIndex: number;
  maybeHasImagesByVariant: boolean;
  media: Media[];
  mediaIndexByUrl: Record<string, number>;
}

export function useProductMedia({
  product,
  selectedVariant,
  swatches,
}: UseProductMediaProps): UseProductMediaReturn {
  const hasMultiOptions = useMemo(() => {
    return product.options?.some(({optionValues}) => optionValues?.length > 1);
  }, [product.id]);

  const colorOptions = useMemo(() => {
    return product.options?.find(
      (option) => option.name === swatches?.swatchOptionName,
    )?.optionValues;
  }, [product.id, swatches?.swatchOptionName]);

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
          (option) => option.name === swatches?.swatchOptionName,
        )?.value || '';
      if (mediaMapByAltText?.[color]) {
        return mediaMapByAltText[color];
      }
    }
    return null;
  }, [
    hasMultiColors,
    mediaMapByAltText,
    selectedVariant?.id,
    swatches?.swatchOptionName,
  ]);

  const media = useMemo(() => {
    return mediaFromAltText || product.media.nodes;
  }, [product.id, mediaFromAltText]);

  const maybeHasImagesByVariant =
    !!hasMultiOptions && media.length > 1 && !mediaFromAltText;

  const mediaIndexByUrl = useMemo(() => {
    if (!maybeHasImagesByVariant) return {};
    return media.reduce(
      (acc: Record<string, number>, {previewImage}, index) => {
        if (previewImage?.url) {
          acc[previewImage.url] = index;
        }
        return acc;
      },
      {},
    );
  }, [maybeHasImagesByVariant, product.id]);

  const initialIndex = useMemo(() => {
    if (
      (!hasMultiColors && !maybeHasImagesByVariant) ||
      !selectedVariant ||
      mediaFromAltText
    )
      return 0;
    const mediaIndex =
      product.media.nodes.findIndex(
        ({previewImage}) => previewImage?.url === selectedVariant?.image?.url,
      ) || mediaIndexByUrl[selectedVariant?.image?.url || ''];
    return mediaIndex >= 0 ? mediaIndex : 0;
  }, [
    hasMultiColors,
    product.id,
    maybeHasImagesByVariant,
    mediaFromAltText,
    mediaIndexByUrl,
    selectedVariant?.id,
  ]);

  return {initialIndex, maybeHasImagesByVariant, media, mediaIndexByUrl};
}
