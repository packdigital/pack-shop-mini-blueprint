import {useMemo} from 'react';
import {useInView} from 'react-intersection-observer';

import {Container, ProductItem, Spinner} from '~/components';
import type {ContainerSettings} from '~/settings/container';
import {useColorSwatches, useProductsFromHandles} from '~/hooks';
import type {ProductCms} from '~/lib/types';

import {Schema} from './ProductsGrid.schema';

export interface ProductsGridCms {
  heading: string;
  products: {
    product: ProductCms;
  }[];
  columnsDesktop: string;
  columnsTablet: string;
  columnsMobile: string;
}

export function ProductsGrid({
  cms,
}: {
  cms: ProductsGridCms & {container: ContainerSettings};
}) {
  const {ref, inView} = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const swatchesMap = useColorSwatches();

  const {
    heading,
    products,
    columnsDesktop = 'lg:grid-cols-4',
    columnsTablet = 'md:grid-cols-3',
    columnsMobile = 'grid-cols-2',
  } = cms;

  const productHandles = useMemo(() => {
    return (
      products?.reduce((acc: string[], {product}) => {
        if (!product?.handle) return acc;
        return [...acc, product.handle];
      }, []) || []
    );
  }, [products]);

  const fullProducts = useProductsFromHandles(productHandles, inView);

  return (
    <Container container={cms.container}>
      <div className="px-contained py-contained">
        {heading && <h2 className="mb-5 text-center md:mb-8">{heading}</h2>}

        <ul
          className={`mx-auto grid w-full gap-x-4 gap-y-8 px-4 xs:gap-x-5 md:px-0 ${columnsMobile} ${columnsTablet} ${columnsDesktop}`}
          ref={ref}
        >
          {fullProducts.map((product, index) => {
            return (
              <li key={product.id}>
                <ProductItem
                  handle={product.handle}
                  index={index}
                  product={product}
                  swatchesMap={swatchesMap}
                />
              </li>
            );
          })}
        </ul>

        {!fullProducts?.length && (
          <div className="flex min-h-80 items-center justify-center">
            <Spinner width="32" />
          </div>
        )}
      </div>
    </Container>
  );
}

ProductsGrid.displayName = 'ProductsGrid';
ProductsGrid.Schema = Schema;
