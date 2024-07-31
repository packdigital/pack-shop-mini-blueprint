import type {AspectRatio, I18nLocale} from './types';

/* Ensure updating this ratio as needed.  */
/* Required format is 'width/height' */
export const PRODUCT_IMAGE_ASPECT_RATIO: AspectRatio =
  '3/4'; /* Ensure this is equivalent to product-image-aspect-ratio in app.css */

export const DEFAULT_LOCALE: I18nLocale = Object.freeze({
  label: 'United States (USD $)',
  language: 'EN',
  country: 'US',
  currency: 'USD',
  pathPrefix: '',
});

export const COLOR_OPTION_NAME = 'Color' as const;
