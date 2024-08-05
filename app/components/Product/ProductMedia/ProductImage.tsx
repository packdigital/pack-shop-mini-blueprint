import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

import {Image} from '~/components';
import type {AspectRatio} from '~/lib/types';

interface ProductImageProps {
  alt?: string;
  aspectRatio?: AspectRatio;
  image?: ImageType;
  onLoad?: () => void;
  priority?: boolean;
}

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
