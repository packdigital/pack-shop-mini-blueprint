import {Image} from '~/components';

import type {ProductImageProps} from './ProductMedia.types';

export function ProductImage({
  alt,
  aspectRatio,
  image,
  onLoad,
  priority,
}: ProductImageProps) {
  return (
    <Image
      data={{
        ...image,
        altText: alt || image?.altText,
      }}
      aspectRatio={aspectRatio}
      onLoad={onLoad}
      className="media-fill"
      loading={priority ? 'eager' : 'lazy'}
      sizes="(min-width: 1440px) 900px, (min-width: 768px) 50vw, 100vw"
    />
  );
}

ProductImage.displayName = 'ProductImage';
