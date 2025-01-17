import {getAspectRatioFromClass} from '~/lib/utils';
import {Container, Image, Link, Svg} from '~/components';

import {Schema} from './TilesStack.schema';
import type {TilesStackCms} from './TilesStack.types';

export function TilesStack({cms}: {cms: TilesStackCms}) {
  const {header, section, tiles} = cms;
  const {heading, subheading} = {...header};
  const {
    aspectRatio = 'aspect-[5/4]',
    textColor = '#000000',
    textAlign = 'text-left items-start',
    tileHeadingSize = 'text-h4',
    fullWidth,
  } = {...section};
  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <Container container={cms.container}>
      <div className="px-contained py-contained flex flex-col items-center">
        {(!!heading || !!subheading) && (
          <div
            className={`theme-heading-text-align mb-6 flex w-full flex-col gap-2 md:mb-10 ${maxWidthClass}`}
            style={{color: textColor}}
          >
            {heading && <h2 className="text-h2 theme-heading">{heading}</h2>}
            {subheading && (
              <span className="text-body-lg max-w-[46rem]">{subheading}</span>
            )}
          </div>
        )}

        {tiles?.length > 0 && (
          <div
            className={`grid w-full gap-5 md:auto-cols-fr md:grid-flow-col lg:gap-x-8 ${maxWidthClass}`}
            style={{color: textColor}}
          >
            {tiles.map((item, index) => {
              return (
                <div key={index} className="flex w-full flex-col gap-4">
                  <Link
                    aria-label={item.heading}
                    to={item.link?.url}
                    newTab={item.link?.newTab}
                    tabIndex={-1}
                    type={item.link?.type}
                  >
                    <Image
                      data={{
                        altText: item.image?.altText || item.alt,
                        url: item.image?.url,
                        width: item.image?.width,
                        height: item.image?.height,
                      }}
                      aspectRatio={getAspectRatioFromClass(aspectRatio)}
                      crop={item.crop}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </Link>

                  <div className={`flex flex-col ${textAlign}`}>
                    <Link
                      aria-label={item.heading}
                      to={item.link?.url}
                      newTab={item.link?.newTab}
                      type={item.link?.type}
                    >
                      <div className="group flex">
                        <h3 className={`theme-heading ${tileHeadingSize}`}>
                          {item.heading}
                        </h3>

                        <span className="ml-3 block max-w-5 transition-transform lg:w-6 lg:group-hover:translate-x-2">
                          <Svg
                            src="/svgs/arrow-right.svg#arrow-right"
                            title="Arrow"
                            viewBox="0 0 24 24"
                          />
                        </span>
                      </div>
                    </Link>

                    {item.description && (
                      <p className="mt-1 text-base">{item.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}

TilesStack.displayName = 'TilesStack';
TilesStack.Schema = Schema;
