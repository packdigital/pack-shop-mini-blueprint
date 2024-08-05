import {useMemo} from 'react';

import {useSettings} from '~/hooks';
import type {SwatchesMap} from '~/lib/types';

/**
 * Generate a table of color swatches from the site settings
 * @returns map of color swatches
 * @example
 * ```js
 * const swatchesMap = useSwatches();
 * ```
 */

export function useSwatches(): {
  swatchesMap: SwatchesMap;
  swatchOptionName: string;
} {
  const {product: productSettings} = useSettings();
  const {swatchesGroups, swatchOptionName = 'Color'} = {
    ...productSettings?.swatches,
  };

  const swatchesMap = useMemo(() => {
    if (!swatchesGroups?.length) return {};
    return swatchesGroups.reduce((groupsAcc, group) => {
      const groupSwatches = group.swatches?.reduce((swatchesAcc, swatch) => {
        return {
          ...swatchesAcc,
          [swatch.name?.toLowerCase().trim()]: swatch,
        };
      }, {});
      return {...groupsAcc, ...groupSwatches};
    }, {});
  }, [swatchesGroups]);

  return {swatchesMap, swatchOptionName: swatchOptionName?.trim()};
}
