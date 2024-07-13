import {Fragment} from 'react';

import {ProductItem} from '~/components';

import type {CollectionGridProps} from './Collection.types';

export function CollectionGrid({
  desktopFiltersOpen,
  products,
  promoTiles,
  settings,
  swatchesMap,
}: CollectionGridProps) {
  const {productItem: itemSettings} = {...settings};

  return (
    <div className="flex flex-col gap-4">
      <ul
        className={`mx-auto grid w-full grid-cols-2 gap-x-4 gap-y-8 px-4 xs:gap-x-5 ${
          desktopFiltersOpen
            ? 'md:grid-cols-2 lg:grid-cols-3'
            : 'md:grid-cols-3 lg:grid-cols-4'
        } md:px-0`}
      >
        {products.nodes.map((product, index) => {
          const promoTile = promoTiles?.find(
            ({position}) => position === index + 1,
          );
          return (
            <Fragment key={product.id}>
              <li>
                <ProductItem
                  enabledColorSelector={itemSettings?.enabledColorSelector}
                  enabledStarRating={itemSettings?.enabledStarRating}
                  handle={product.handle}
                  index={index}
                  product={product}
                  priority={index < 8}
                  swatchesMap={swatchesMap}
                />
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

CollectionGrid.displayName = 'CollectionGrid';
