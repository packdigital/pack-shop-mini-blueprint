import {useMemo} from 'react';
import hexToRgba from 'hex-to-rgba';
import {useLoaderData} from '@remix-run/react';

import {AddToCart, Image, ProductStars} from '~/components';
import {PRODUCT_IMAGE_ASPECT_RATIO} from '~/lib/constants';
import {useProductByHandle, useProductModal, useVariantPrices} from '~/hooks';
import type {loader} from '~/routes/pages.$handle';

import type {ShoppableSocialVideoCms} from './ShoppableSocialVideo.types';

export function ShoppableSocialVideoProductCard({
  cms,
}: {
  cms: ShoppableSocialVideoCms;
}) {
  const {product: productSettings, cta} = cms;
  const {productsMap} = useLoaderData<typeof loader>();
  const cmsProductHandle = productSettings?.product?.handle;
  const loaderProduct = productsMap?.[cmsProductHandle];
  const fetchedProduct = useProductByHandle(
    !loaderProduct ? cmsProductHandle : null,
  );
  const {openProductModal} = useProductModal();

  const product = useMemo(() => {
    return fetchedProduct || loaderProduct;
  }, [fetchedProduct, loaderProduct?.id]);

  const selectedVariant = useMemo(() => {
    return product?.variants?.nodes?.[0];
  }, [product]);

  const {
    image,
    enabledStarRating,
    badge,
    badgeBgColor = '#FCA5A5',
    badgeTextColor = '#000000',
    bgColor = '#FFFFFF',
    bgOpacity = 0.7,
    textColor = '#000000',
  } = {...productSettings};

  const {price, compareAtPrice} = useVariantPrices(selectedVariant);

  const productImage = image || product?.featuredImage;

  const {
    ctaType = 'view',
    viewText = 'View Product',
    atcText = 'Add To Cart',
    buttonColor = 'black',
    textColor: buttonTextColor = 'white',
  } = {...cta};

  return (
    <div
      className="relative space-y-3 overflow-hidden rounded-md p-3"
      style={{backgroundColor: hexToRgba(bgColor, bgOpacity)}}
    >
      <div className="flex items-center gap-3 text-text">
        <Image
          data={{
            altText: product?.title,
            url: productImage?.url || productImage?.src,
            width: productImage?.width,
            height: productImage?.height,
          }}
          aspectRatio={
            productImage?.width && productImage?.height
              ? `${productImage.width}/${productImage.height}`
              : PRODUCT_IMAGE_ASPECT_RATIO
          }
          width="80px"
          sizes="160px"
        />

        <div
          className="flex flex-col gap-1 overflow-hidden"
          style={{color: textColor}}
        >
          <div className="flex min-h-[28px] flex-col gap-2">
            {badge && (
              <div
                className="h-5 w-fit rounded-full px-2 text-sm text-black"
                style={{backgroundColor: badgeBgColor, color: badgeTextColor}}
              >
                {badge}
              </div>
            )}

            <h1 className="text-h4 flex-1 font-normal xl:text-2xl">
              {product?.title}
            </h1>
          </div>

          {enabledStarRating && (
            <ProductStars id={product?.id} size="large" color={textColor} />
          )}

          <div className="min-h-8 space-x-2 truncate">
            <span className="text-2xl">{price}</span>
            <span className="line-through">{compareAtPrice}</span>
          </div>
        </div>
      </div>

      {ctaType === 'atc' ? (
        <AddToCart addToCartText={atcText} selectedVariant={selectedVariant} />
      ) : (
        <button
          aria-label={viewText}
          className="btn w-full"
          type="button"
          onClick={() => {
            if (!product) return;
            openProductModal(product.handle);
          }}
          style={{
            borderColor: buttonColor,
            backgroundColor: buttonColor,
            color: buttonTextColor,
          }}
        >
          {viewText}
        </button>
      )}
    </div>
  );
}

ShoppableSocialVideoProductCard.displayName = 'ShoppableSocialVideoProductCard';
