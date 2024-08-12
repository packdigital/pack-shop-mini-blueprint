import {useMemo} from 'react';
import {useInView} from 'react-intersection-observer';

import {Container, ProductItem} from '~/components';
import type {ContainerSettings} from '~/settings/container';
import {useProductsFromHandles, useSettings, useSwatches} from '~/hooks';

import {Schema} from './ProductsGrid.schema';
import type {ProductsGridCms} from './ProductsGrid.types';

export function ProductsGrid({
  cms,
}: {
  cms: ProductsGridCms & {container: ContainerSettings};
}) {
  const {ref, inView} = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const swatches = useSwatches();
  const {product: productSettings} = useSettings();

  const {heading, products, grid, productItem} = cms;
  const {
    columnsDesktop = 'lg:grid-cols-4',
    columnsTablet = 'md:grid-cols-3',
    columnsMobile = 'grid-cols-2',
  } = {...grid};

  const productHandles = useMemo(() => {
    return (
      products?.reduce((acc: string[], {product}) => {
        if (!product?.handle) return acc;
        return [...acc, product.handle];
      }, []) || []
    );
  }, [products]);

  const placeholderProducts = useMemo(() => {
    return Array.from({length: productHandles.length}).map((_, index) => ({
      id: `${index}`,
      handle: '',
    }));
  }, [productHandles]);

  const fullProducts = useProductsFromHandles(productHandles, inView);

  const {manualStarRating, starColor} = {...productSettings?.reviews};
  const {primaryOptionName, enabledOptionValueInPlpItem} = {
    ...productSettings?.details,
  };
  const {aspectRatioType = 'native', manualAspectRatio = '3/4'} = {
    ...productSettings?.media,
  };

  return (
    <Container container={cms.container}>
      <div className="px-contained py-contained">
        <div className="mx-auto w-full max-w-[var(--content-max-width)]">
          {heading && (
            <h2 className="theme-heading theme-heading-text-align mb-5 md:mb-8">
              {heading}
            </h2>
          )}

          <ul
            className={`grid w-full gap-x-4 gap-y-8 xs:gap-x-5 md:px-0 ${columnsMobile} ${columnsTablet} ${columnsDesktop}`}
            ref={ref}
          >
            {(fullProducts.length ? fullProducts : placeholderProducts).map(
              (product, index) => {
                return (
                  <li key={index}>
                    <ProductItem
                      aspectRatioType={aspectRatioType}
                      manualAspectRatio={manualAspectRatio}
                      enabledOptionValue={enabledOptionValueInPlpItem}
                      enabledStarRating={productItem?.enabledStarRating}
                      handle={product.handle}
                      index={index}
                      manualStarRating={manualStarRating}
                      primaryOptionName={primaryOptionName}
                      product={product}
                      starColor={starColor}
                      swatches={swatches}
                    />
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
}

ProductsGrid.displayName = 'ProductsGrid';
ProductsGrid.Schema = Schema;
