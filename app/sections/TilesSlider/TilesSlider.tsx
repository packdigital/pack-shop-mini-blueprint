import {
  Container,
  Link,
  TilesSlider as TilesSliderComponent,
} from '~/components';

import type {TilesSliderCms} from './TilesSlider.types';
import {Schema} from './TilesSlider.schema';

export function TilesSlider({cms}: {cms: TilesSliderCms}) {
  const {button, header, section, tiles} = cms;
  const {heading, subheading} = {...header};
  const {
    aspectRatio,
    buttonStyle = 'theme-btn-primary',
    fullWidth,
    textColor = '#000000',
    textAlign = 'text-left items-start',
    tileHeadingSize,
    tilesPerViewDesktop,
    tilesPerViewMobile,
    tilesPerViewTablet,
  } = {...section};

  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <Container container={cms.container}>
      <div className="lg:px-contained py-contained flex flex-col items-center overflow-x-clip">
        {(!!heading || !!subheading) && (
          <div
            className={`theme-heading-text-align max-lg:px-contained mb-6 flex w-full flex-col gap-2 md:mb-10 ${maxWidthClass}`}
            style={{color: textColor}}
          >
            {heading && <h2 className="text-h2 theme-heading">{heading}</h2>}
            {subheading && (
              <span className="text-body-lg max-w-[46rem]">{subheading}</span>
            )}
          </div>
        )}

        <TilesSliderComponent
          aspectRatio={aspectRatio}
          maxWidthClass={maxWidthClass}
          textColor={textColor}
          textAlign={textAlign}
          tileHeadingSize={tileHeadingSize}
          tiles={tiles}
          tilesPerViewDesktop={tilesPerViewDesktop}
          tilesPerViewMobile={tilesPerViewMobile}
          tilesPerViewTablet={tilesPerViewTablet}
        />

        {button?.text && (
          <div
            className={`theme-heading-text-align max-lg:px-contained mt-10 flex w-full flex-col ${maxWidthClass}`}
          >
            <Link
              aria-label={button.text}
              className={`${buttonStyle}`}
              to={button.url}
              newTab={button.newTab}
              type={button.type}
            >
              {button.text}
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

TilesSlider.displayName = 'TilesSlider';
TilesSlider.Schema = Schema;
