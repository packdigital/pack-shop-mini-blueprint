import {Image, Markdown} from '~/components';

import type {SizeGuideProps} from './Product.types';

export function SizeGuide({
  sizeGuide,
  heading: defaultHeading,
}: SizeGuideProps) {
  const {image, markdown, heading: sizeGuideHeading} = sizeGuide;
  const heading = sizeGuideHeading || defaultHeading;
  return (
    <div>
      {heading && (
        <h2 className="text-h3 theme-heading mb-2 text-center">{heading}</h2>
      )}

      <div className="space-y-3">
        {image && (
          <Image
            data={{
              altText: image.altText || heading || 'Size Guide',
              url: image.url,
              width: image.width,
              height: image.height,
            }}
            aspectRatio={
              image.width && image.height
                ? `${image.width}/${image.height}`
                : '1/1'
            }
            sizes="(min-width: 768px) 768px, 80vw"
          />
        )}

        {markdown && <Markdown>{markdown}</Markdown>}
      </div>
    </div>
  );
}

SizeGuide.displayName = 'SizeGuide';
