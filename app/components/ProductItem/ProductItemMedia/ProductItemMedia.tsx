import {useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import type {Video} from '@shopify/hydrogen/storefront-api-types';

import {Badges, Image} from '~/components';
import type {AspectRatio} from '~/lib/types';

import type {ProductItemMediaProps} from '../ProductItem.types';

import {ProductItemVideo} from './ProductItemVideo';
import {useProductItemMedia} from './useProductItemMedia';

export function ProductItemMedia({
  aspectRatioType,
  manualAspectRatio,
  selectedProduct,
  selectedVariant,
  swatches,
}: ProductItemMediaProps) {
  const {ref: inViewRef, inView} = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  const {primaryMedia, hoverMedia} = useProductItemMedia({
    selectedProduct,
    selectedVariant,
    swatches,
  });

  const aspectRatio =
    aspectRatioType === 'manual'
      ? manualAspectRatio
      : primaryMedia?.previewImage?.width && primaryMedia?.previewImage?.height
      ? (`${primaryMedia.previewImage.width}/${primaryMedia.previewImage.height}` as AspectRatio)
      : manualAspectRatio;

  return (
    <div
      className="group/media relative overflow-hidden bg-neutral-50 before:via-[black-100/10]"
      style={{aspectRatio}}
      onMouseEnter={() => {
        if (hoverMedia?.mediaContentType !== 'VIDEO') return;
        hoverVideoRef.current?.play();
      }}
      onMouseLeave={() => {
        if (hoverMedia?.mediaContentType !== 'VIDEO') return;
        hoverVideoRef.current?.pause();
      }}
      ref={inViewRef}
    >
      {primaryMedia && (
        <div
          className={`${
            hoverMedia
              ? 'opacity-100 transition duration-300 md:group-hover/media:opacity-0'
              : ''
          }`}
        >
          {primaryMedia.mediaContentType === 'VIDEO' ? (
            <ProductItemVideo autoPlay media={primaryMedia as Video} />
          ) : (
            <Image
              data={{
                ...primaryMedia.previewImage,
                altText: selectedProduct?.title,
              }}
              className="media-fill"
              loading="eager"
              sizes="(min-width: 768px) 30vw, 45vw"
            />
          )}
        </div>
      )}

      {inView && hoverMedia && (
        <div className="hidden opacity-0 transition duration-300 md:block md:group-hover/media:opacity-100">
          {hoverMedia.mediaContentType === 'VIDEO' ? (
            <ProductItemVideo
              autoPlay={false}
              media={hoverMedia as Video}
              ref={hoverVideoRef}
            />
          ) : (
            <Image
              data={{
                ...hoverMedia.previewImage,
                altText: selectedProduct?.title,
              }}
              className="media-fill"
              sizes="(min-width: 768px) 30vw, 45vw"
            />
          )}
        </div>
      )}

      {/* loading shimmer */}
      {!primaryMedia && (
        <div
          className="relative size-full overflow-hidden"
          style={{aspectRatio}}
        >
          <div className="loading-shimmer opacity-60" />
        </div>
      )}

      <div className="pointer-events-none absolute left-0 top-0 z-[1] p-2.5 xs:p-3 xl:p-4">
        <Badges
          className="max-xl:text-label-sm gap-2 xs:gap-2 [&_div]:max-xl:px-1.5 [&_div]:max-xl:py-0.5"
          tags={selectedProduct?.tags || []}
        />
      </div>
    </div>
  );
}

ProductItemMedia.displayName = 'ProductItemMedia';
