import {useCallback, useEffect, useMemo, useState} from 'react';
import hexToRgba from 'hex-to-rgba';
import equal from 'fast-deep-equal';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

import {
  AddToCart,
  Image,
  ProductOptions,
  ProductStars,
  QuantitySelector,
  Svg,
} from '~/components';
import {useProductByHandle, useProductModal, useVariantPrices} from '~/hooks';
import type {AspectRatio} from '~/lib/types';

import {
  productSettingsDefaults as productDefaults,
  sliderSettingsDefaults as sliderDefaults,
} from './ShoppableSocialVideo.schema';
import type {ShoppableSocialVideoProductCardProps} from './ShoppableSocialVideo.types';

const generateSelectedOptionsMap = (
  selectedVariant: ProductVariant | undefined,
) => {
  if (!selectedVariant) return {};
  return selectedVariant?.selectedOptions?.reduce((acc, option) => {
    return {...acc, [option.name]: option.value};
  }, {});
};

export function ShoppableSocialVideoProductCard({
  product: passedProduct,
  image,
  isActive,
  badge,
  aspectRatioType,
  manualAspectRatio,
  manualStarRating,
  productSettings,
  sliderSettings,
  swatches,
}: ShoppableSocialVideoProductCardProps) {
  const loaderProduct = passedProduct.id ? passedProduct : null;
  /* While in customizer, fetch the full product if not originally fetched in loader */
  const customizerProduct = useProductByHandle(
    !loaderProduct ? passedProduct.handle : null,
  );
  const {openProductModal} = useProductModal();

  const product = useMemo(() => {
    return customizerProduct || loaderProduct;
  }, [customizerProduct, loaderProduct?.id]);

  const [showOptions, setShowOptions] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product?.variants?.nodes?.[0]);
  const [selectedOptionsMap, setSelectedOptionsMap] = useState<
    Record<string, string>
  >(generateSelectedOptionsMap(selectedVariant));

  const setSelectedOption = useCallback(
    (option: string, value: string) => {
      setSelectedOptionsMap({...selectedOptionsMap, [option]: value});
    },
    [selectedOptionsMap],
  );

  useEffect(() => {
    if (!isActive) setShowOptions(false);
  }, [isActive]);

  useEffect(() => {
    if (product?.handle !== selectedVariant?.product?.handle) {
      setSelectedVariant(product?.variants?.nodes?.[0]);
      setSelectedOptionsMap(
        generateSelectedOptionsMap(product?.variants?.nodes?.[0]),
      );
    }
  }, [product, selectedVariant]);

  useEffect(() => {
    setSelectedVariant(
      product?.variants?.nodes?.find((variant) => {
        return equal(generateSelectedOptionsMap(variant), selectedOptionsMap);
      }),
    );
  }, [selectedOptionsMap]);

  const {
    enabledStarRating = productDefaults.enabledStarRating,
    enabledQuantitySelector = productDefaults.enabledQuantitySelector,
    optionsBtnText = productDefaults.optionsBtnText,
    optionsBtnStyle = productDefaults.optionsBtnStyle,
    atcBtnText = productDefaults.atcBtnText,
    atcBtnStyle = productDefaults.atcBtnStyle,
    notifyMeText = productDefaults.notifyMeText,
    viewText = productDefaults.viewText,
    badgeBgColor = productDefaults.badgeBgColor,
    badgeTextColor = productDefaults.badgeTextColor,
  } = {...productSettings};
  const {
    slideBgColor = sliderDefaults.slideBgColor,
    slideBgOpacity = sliderDefaults.slideBgOpacity,
    slideBgBlur = sliderDefaults.slideBgBlur,
    slideTextColor = sliderDefaults.slideTextColor,
  } = {...sliderSettings};

  const {price, compareAtPrice} = useVariantPrices(selectedVariant);

  const productImage =
    image || selectedVariant?.image || product?.featuredImage;
  const productImageSrc =
    image?.src || selectedVariant?.image?.url || product?.featuredImage?.url;
  const hasOneVariant = product?.variants?.nodes?.length === 1;
  const aspectRatio =
    aspectRatioType === 'manual'
      ? manualAspectRatio
      : productImage?.width && productImage?.height
      ? (`${productImage.width}/${productImage.height}` as AspectRatio)
      : manualAspectRatio;

  return (
    <div
      className="relative overflow-hidden rounded-md p-3"
      style={{
        backgroundColor: hexToRgba(slideBgColor, slideBgOpacity),
        color: slideTextColor,
        backdropFilter: `blur(${slideBgBlur}px)`,
      }}
    >
      <div className="theme-text-color grid grid-cols-[auto_1fr] gap-3">
        <Image
          data={{
            altText: product?.title,
            url: productImageSrc,
            width: productImage?.width,
            height: productImage?.height,
          }}
          aspectRatio={aspectRatio}
          width="100px"
          sizes="200px"
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-2.5">
              <div className="space-y-1">
                {badge && (
                  <div
                    className="flex h-5 w-fit items-center justify-center whitespace-nowrap rounded px-1.5 text-xs uppercase"
                    style={{
                      backgroundColor: badgeBgColor,
                      color: badgeTextColor,
                    }}
                  >
                    {badge}
                  </div>
                )}

                <h1 className="text-h5 theme-product-card-text-color theme-heading flex-1">
                  {product?.title}
                </h1>
              </div>

              {showOptions && (
                <button
                  aria-label="Hide product options"
                  className="theme-product-card-text-color mr-[-4px] mt-[-4px] flex size-5 items-center justify-center"
                  type="button"
                  onClick={() => setShowOptions(false)}
                >
                  <Svg
                    className="w-3"
                    src="/svgs/close.svg#close"
                    title="Close"
                    viewBox="0 0 24 24"
                  />
                </button>
              )}
            </div>

            {enabledStarRating && (
              <div className="theme-product-card-text-color">
                <ProductStars
                  id={product?.id}
                  size="small"
                  color={slideTextColor}
                  manualStarRating={manualStarRating}
                  underlined={false}
                />
              </div>
            )}

            <div className="theme-product-card-text-color space-x-1.5 truncate text-base">
              {compareAtPrice && (
                <span className="line-through opacity-60">
                  {compareAtPrice}
                </span>
              )}
              <span className="">{price}</span>
            </div>
          </div>

          {showOptions && (
            <button
              aria-label={viewText}
              className="text-underline theme-product-card-text-color-faded self-start text-right text-xs"
              type="button"
              onClick={() => {
                if (!product) return;
                openProductModal(
                  product.handle,
                  selectedVariant?.selectedOptions,
                );
                setTimeout(() => setShowOptions(false), 1000);
              }}
            >
              {viewText}
            </button>
          )}

          {!showOptions && !hasOneVariant && (
            <button
              aria-label={optionsBtnText}
              className={`${optionsBtnStyle}`}
              type="button"
              onClick={() => setShowOptions(true)}
            >
              <span>{optionsBtnText}</span>
            </button>
          )}

          {hasOneVariant && (
            <AddToCart
              addToCartText={atcBtnText}
              buttonStyle={atcBtnStyle}
              enabledInlineNotifyMe
              notifyMeText={notifyMeText}
              selectedVariant={selectedVariant}
            />
          )}
        </div>
      </div>

      {showOptions && product && (
        <div>
          <ProductOptions
            isShoppableProductCard
            product={product}
            selectedOptionsMap={selectedOptionsMap}
            setSelectedOption={setSelectedOption}
            swatches={swatches}
          />

          <div className="mt-3 flex gap-2.5">
            {enabledQuantitySelector && (
              <QuantitySelector
                className="bg-white"
                disableDecrement={quantity <= 1}
                handleDecrement={() => setQuantity(quantity - 1)}
                handleIncrement={() => setQuantity(quantity + 1)}
                productTitle={product?.title}
                quantity={quantity}
              />
            )}

            <AddToCart
              addToCartText={atcBtnText}
              buttonStyle={atcBtnStyle}
              containerClassName="flex-1"
              enabledInlineNotifyMe
              onAddToCart={() => setShowOptions(false)}
              quantity={quantity}
              notifyMeText={notifyMeText}
              selectedVariant={selectedVariant}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ShoppableSocialVideoProductCard.displayName = 'ShoppableSocialVideoProductCard';
