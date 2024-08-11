import {useEffect, useState} from 'react';
import type {SwiperClass} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y} from 'swiper/modules';
import type {Image, Product} from '@shopify/hydrogen/storefront-api-types';

import {Badges} from '~/components';
import type {
  AspectRatio,
  AspectRatioType,
  SelectedVariant,
  Swatches,
} from '~/lib/types';

import {ProductImage} from './ProductImage';
import {ProductMediaFile} from './ProductMediaFile';
import {ProductMediaThumbnails} from './ProductMediaThumbnails';
import {useProductMedia} from './useProductMedia';

interface ProductMediaProps {
  aspectRatioType?: AspectRatioType;
  manualAspectRatio?: AspectRatio;
  product: Product;
  selectedVariant: SelectedVariant;
  selectedVariantColor?: string | null;
  swatches?: Swatches;
}

export function ProductMedia({
  aspectRatioType = 'native',
  manualAspectRatio = '3/4',
  product,
  selectedVariant,
  selectedVariantColor,
  swatches,
}: ProductMediaProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [mounted, setMounted] = useState(false);

  const {initialIndex, maybeHasImagesByVariant, media, mediaIndexByUrl} =
    useProductMedia({
      product,
      selectedVariant,
      swatches,
    });

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  /* Slide to selected variant's image in the slider if it exists */
  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (maybeHasImagesByVariant) {
      if (!selectedVariant?.image?.url) return;
      const mediaIndex = mediaIndexByUrl[selectedVariant.image.url] ?? -1;
      if (mediaIndex < 0) return;
      const index = mediaIndex >= 0 ? mediaIndex : 0;
      swiper.slideTo(index);
      setActiveIndex(index);
      return;
    }
  }, [maybeHasImagesByVariant, mediaIndexByUrl, selectedVariant?.id, swiper]);

  /* Reset the active index when the selected color changes */
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    if (!swiper || swiper.destroyed || !selectedVariantColor) return;
    swiper.slideTo(0);
    setActiveIndex(0);
  }, [selectedVariantColor]);

  const firstMediaImageOnMount = media[initialIndex]?.previewImage as
    | Image
    | undefined;
  const aspectRatio =
    aspectRatioType === 'manual'
      ? manualAspectRatio
      : firstMediaImageOnMount?.width && firstMediaImageOnMount?.height
      ? (`${firstMediaImageOnMount.width}/${firstMediaImageOnMount.height}` as AspectRatio)
      : manualAspectRatio;

  return (
    <div className="grid grid-cols-1 justify-between gap-4 lg:grid-cols-[80px_calc(100%-100px)] xl:gap-5">
      <div className="order-1 lg:order-2">
        <div className="relative md:bg-neutral-50" style={{aspectRatio}}>
          <div className="relative">
            <Swiper
              onSwiper={setSwiper}
              modules={[A11y]}
              onSlideChange={(_swiper) => {
                setActiveIndex(_swiper.realIndex);
              }}
              slidesPerView={1}
              grabCursor
              initialSlide={initialIndex}
              className="max-md:!pb-5 md:pb-0"
            >
              {media.map((media, index) => {
                return (
                  <SwiperSlide key={media.id}>
                    <ProductMediaFile
                      alt={product.title}
                      aspectRatio={aspectRatio}
                      media={media}
                      priority={index === initialIndex}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Pagination dots */}
            {media.length > 1 && (
              <div className="absolute !top-[calc(100%-8px)] left-0 z-[1] flex w-full justify-center gap-4 xs:gap-5 md:hidden">
                {media.map((_, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      aria-label={`Scroll to image ${index + 1}`}
                      key={index}
                      className={`theme-bg-color-as-text-color size-2 shrink-0 rounded-full ${
                        isActive ? 'opacity-100' : 'opacity-20'
                      }`}
                      onClick={() => {
                        swiper?.slideTo(index);
                        setActiveIndex(index);
                      }}
                      tabIndex={-1}
                      type="button"
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* placeholder image while swiper inits */}
          {!swiper && (
            <div className="absolute inset-0 z-[1] size-full max-md:hidden">
              <ProductImage
                alt={product.title}
                aspectRatio={aspectRatio}
                image={firstMediaImageOnMount}
                priority
              />
            </div>
          )}

          <div className="pointer-events-none absolute left-0 top-0 z-[1] p-2.5 xs:p-4 md:p-3 xl:p-4">
            <Badges tags={product.tags} />
          </div>
        </div>
      </div>

      {/*
       * Height classes breakdown for a vertical stack. For horizontal stack, use inverse logic with width instead
       * Example: "h-[calc(90px*4+10px*3)]" (with w-[90px])
       * 90px = height of each thumbnail. In this case, this implies a square aspect ratio because it's the same as the width. For anything else, update px height accordingly in relation to its width
       * 4 = number of thumbnails
       * 10px = gutter between thumbnails
       * 3 = number of gutters between thumbnails
       */}
      <div className="scrollbar-hide relative order-2 hidden w-full overflow-x-auto md:block md:max-lg:pb-[calc((100%-5*8px)/6)] lg:order-1 lg:h-[calc(80px*5+12px*4)] xl:h-[calc(80px*6+12px*5)]">
        {media.length > 0 && (
          <ProductMediaThumbnails
            activeIndex={activeIndex}
            initialIndex={initialIndex}
            media={media}
            productTitle={product.title}
            swiper={swiper}
          />
        )}
      </div>
    </div>
  );
}

ProductMedia.displayName = 'ProductMedia';
