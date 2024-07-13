import {useColorSwatches, useSettings} from '~/hooks';

import {CollectionGrid} from './CollectionGrid';
import type {CollectionProps} from './Collection.types';

export function Collection({collection, title = ''}: CollectionProps) {
  const {handle, products} = collection;
  const swatchesMap = useColorSwatches();
  const {collection: collectionSettings} = useSettings();

  return (
    <div>
      <div className="md:px-contained py-contained mx-auto grid w-full max-w-[var(--content-max-width)] !pt-0">
        <h1 className="text-h2 py-contained mb-4 !pb-0 text-center max-md:px-4 md:mb-2">
          {title}
        </h1>

        <div className={`mt-6 grid gap-x-6`}>
          <CollectionGrid
            products={products}
            settings={collectionSettings}
            swatchesMap={swatchesMap}
          />
        </div>
      </div>
    </div>
  );
}

Collection.displayName = 'Collection';
