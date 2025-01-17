import {useMemo} from 'react';
import {useLoaderData} from '@remix-run/react';

import {ProductsGrid} from '~/sections/ProductsGrid';
import {Schema as OriginalSchema} from '~/sections/ProductsGrid/ProductsGrid.schema';
import type {loader} from '~/routes/pages.$handle';
import type {ProductsGridCms} from '~/sections/ProductsGrid/ProductsGrid.types';
import type {ContainerSettings} from '~/settings/container';

let schema = OriginalSchema();
schema = {
  ...schema,
  category: 'Demo Only',
  label: 'Demo Products Grid',
  key: 'demo-products-grid',
  fields: schema.fields.filter(({name}) => name !== 'products'),
};
const Schema = ({handle}: {handle: string}) => {
  if (handle !== 'example-shop-page') return null;
  return schema;
};

export function DemoProductsGrid({cms}: {cms: ProductsGridCms}) {
  const {productsMap} = useLoaderData<typeof loader>();

  const cmsWithProducts = useMemo(() => {
    return {
      ...cms,
      products: Object.values({...productsMap}).map(({handle, id}) => ({
        product: {handle, id},
      })),
    };
  }, [cms, productsMap]);

  return (
    <ProductsGrid
      cms={cmsWithProducts as ProductsGridCms & {container: ContainerSettings}}
    />
  );
}

DemoProductsGrid.displayName = 'DemoProductsGrid';
DemoProductsGrid.Schema = Schema;
