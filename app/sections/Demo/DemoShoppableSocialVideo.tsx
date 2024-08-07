import {useMemo} from 'react';
import {useLoaderData} from '@remix-run/react';

import {ShoppableSocialVideo} from '~/sections/ShoppableSocialVideo';
import {Schema as OriginalSchema} from '~/sections/ShoppableSocialVideo/ShoppableSocialVideo.schema';
import type {ShoppableSocialVideoCms} from '~/sections/ShoppableSocialVideo/ShoppableSocialVideo.types';
import type {loader} from '~/routes/pages.$handle';

let schema = OriginalSchema();
schema = {
  ...schema,
  category: 'Demo',
  label: 'Demo Shoppable Social Video',
  key: 'demo-shoppable-social-video',
  fields: schema.fields.filter(({name}) => name !== 'products'),
};
const Schema = ({handle}: {handle: string}) => {
  if (handle !== 'example-shop-page') return null;
  return schema;
};

export function DemoShoppableSocialVideo({
  cms,
}: {
  cms: ShoppableSocialVideoCms;
}) {
  const {productsMap} = useLoaderData<typeof loader>();

  const cmsWithProducts = useMemo(() => {
    return {
      ...cms,
      products: Object.values({...productsMap}).map(({handle}) => ({
        product: {handle},
      })),
    };
  }, [cms, productsMap]);

  return (
    <ShoppableSocialVideo cms={cmsWithProducts as ShoppableSocialVideoCms} />
  );
}

DemoShoppableSocialVideo.displayName = 'DemoShoppableSocialVideo';
DemoShoppableSocialVideo.Schema = Schema;
