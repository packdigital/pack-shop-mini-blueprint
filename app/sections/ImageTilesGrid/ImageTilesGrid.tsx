import {Container} from '~/components';

import type {ImageTilesGridCms} from './ImageTilesGrid.types';
import {ImageTilesGridItem} from './ImageTilesGridItem';
import {Schema} from './ImageTilesGrid.schema';

export function ImageTilesGrid({cms}: {cms: ImageTilesGridCms}) {
  const {content, header, section, tiles} = cms;
  const {heading, subheading} = {...header};
  const {
    aspectRatio,
    desktop,
    tablet,
    mobile,
    textColor = 'var(--text)',
    fullWidth,
  } = {
    ...section,
  };

  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';
  const gridColsClasses = `${desktop?.gridCols || 'lg:grid-cols-3'} ${
    tablet?.gridCols || 'max-lg:grid-cols-2'
  } ${mobile?.gridCols || 'max-md:grid-cols-1'}`;
  const gapClasses = `${desktop?.gap || 'lg:gap-2'} ${
    tablet?.gap || 'max-lg:gap-2'
  } ${mobile?.gap || 'max-md:gap-2'}`;
  const fullBleedClasses = `${
    desktop?.fullBleed ? 'lg:px-0' : 'lg:px-contained'
  } ${tablet?.fullBleed ? 'max-lg:px-0' : 'max-lg:px-contained'} ${
    mobile?.fullBleed ? 'max-md:px-0' : 'max-md:px-contained'
  }`;

  return (
    <Container container={cms.container}>
      <div
        className={`flex flex-col items-center py-4 md:py-6 ${fullBleedClasses}`}
      >
        {(!!heading || !!subheading) && (
          <div
            className={`theme-heading-text-align max-lg:px-contained mb-6 flex w-full flex-col gap-2 ${maxWidthClass}`}
            style={{color: textColor}}
          >
            {heading && <h2 className="text-h2 theme-heading">{heading}</h2>}
            {subheading && <span className="text-body-lg">{subheading}</span>}
          </div>
        )}

        <div className={`w-full ${maxWidthClass}`}>
          {tiles?.length > 0 && (
            <div className={`grid ${gridColsClasses} ${gapClasses}`}>
              {tiles.map((tile, index) => {
                return (
                  <div className="relative" key={index}>
                    <ImageTilesGridItem
                      aspectRatio={aspectRatio}
                      content={content}
                      tile={tile}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

ImageTilesGrid.displayName = 'ImageTilesGrid';
ImageTilesGrid.Schema = Schema;
