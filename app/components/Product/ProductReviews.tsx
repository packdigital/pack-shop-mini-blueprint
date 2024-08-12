import {parseGid} from '@shopify/hydrogen';

import {ReviewStars} from '~/components';
import {useLoadScript, useRootLoaderData, useSettings} from '~/hooks';

import type {ProductReviewsProps} from './Product.types';

export function ProductReviews({product}: ProductReviewsProps) {
  const {ENV} = useRootLoaderData();
  const {product: productSettings} = useSettings();
  const {heading} = {...productSettings?.reviews};

  const {id: productId} = parseGid(product?.id);

  /* Example script loading, if applicable */
  // useLoadScript({
  //   id: 'product-reviews-script',
  //   src: 'https://reviews.platform.com/reviews.js',
  // });

  return (
    <div id="product-reviews" className="min-h-[400px]">
      {heading && (
        <h2 className="text-h3 theme-heading theme-heading-text-align mb-5 px-4">
          {heading}
        </h2>
      )}

      {/* Placeholder only */}
      <ul className="mt-5 flex flex-col gap-5">
        {[...Array(3).keys()].map((_, index) => (
          <li
            className="theme-border-color flex flex-col gap-2 border-b p-4"
            key={index}
          >
            <div>
              <ReviewStars rating={5} />
              <h3 className="theme-heading mt-1 text-lg">
                Nulla aliquet porttitor venenatis
              </h3>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus
              rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae
              volutpat.
            </p>

            <div>
              <p>John Doe</p>
              <p className="text-xs">Verified Buyer</p>
            </div>
          </li>
        ))}
      </ul>

      {/*
       * Required html elements from platform for product reviews
       */}
    </div>
  );
}

ProductReviews.displayName = 'ProductReviews';
