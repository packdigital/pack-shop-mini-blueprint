import type {Product} from '@shopify/hydrogen/storefront-api-types';

import {useSettings} from '~/hooks';
import type {SelectedVariant} from '~/lib/types';

import {BackInStock} from './BackInStock';
import {ProductOptions} from './ProductOptions';

interface ProductDetailsProps {
  enabledQuantitySelector: boolean;
  product: Product;
  selectedVariant: SelectedVariant;
}

export function ProductDetails({
  product,
  selectedVariant,
}: ProductDetailsProps) {
  const {product: productSettings} = useSettings();

  const hideOptions =
    product.variants?.nodes?.length === 1 &&
    product.variants?.nodes?.[0]?.title === 'Default Title';

  const enabledNotifyMe = productSettings?.backInStock?.enabled;

  return (
    <div className="flex flex-col gap-5">
      {!hideOptions && (
        <ProductOptions product={product} selectedVariant={selectedVariant} />
      )}

      {selectedVariant &&
        !selectedVariant.availableForSale &&
        enabledNotifyMe && <BackInStock selectedVariant={selectedVariant} />}

      <div
        dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        className="text-sm [&>:last-child]:mb-0 [&_a]:underline [&_blockquote]:pl-8 [&_h1]:mb-3 [&_h2]:mb-3 [&_h3]:mb-3 [&_h4]:mb-3 [&_h5]:mb-3 [&_h6]:mb-3 [&_li>p]:mb-0 [&_li]:mb-2 [&_ol>li]:list-decimal [&_ol]:mb-3 [&_ol]:pl-8 [&_p]:mb-3 [&_ul>li]:list-disc [&_ul]:mb-3 [&_ul]:pl-8"
      />
    </div>
  );
}

ProductDetails.displayName = 'ProductDetails';
