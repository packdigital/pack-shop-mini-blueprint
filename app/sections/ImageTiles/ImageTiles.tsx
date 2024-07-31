import {useState} from 'react';
import type {SwiperClass} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Container, Spinner} from '~/components';

import type {ImageTilesCms} from './ImageTiles.types';
import {ImageTile} from './ImageTile';
import {Schema} from './ImageTiles.schema';

export function ImageTiles({cms}: {cms: ImageTilesCms}) {
  const {content, header, section, tiles} = cms;
  const {heading, subheading} = {...header};
  const {
    tilesPerViewDesktop = 3,
    tilesPerViewTablet = 2.4,
    tilesPerViewMobile = 1.4,
    aspectRatio = 'aspect-[3/4]',
    textColor = '#000000',
    fullWidth,
  } = {...section};

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';
  const isGridOnDesktop = tiles?.length === tilesPerViewDesktop;

  return (
    <Container container={cms.container}>
      <div className="lg:px-contained flex flex-col items-center overflow-x-clip py-4 md:py-6">
        {(!!heading || !!subheading) && (
          <div
            className={`theme-heading-text-align max-lg:px-contained mb-6 flex w-full flex-col gap-2 ${maxWidthClass}`}
            style={{color: textColor}}
          >
            {heading && <h2 className="text-h2 theme-heading">{heading}</h2>}
            {subheading && (
              <span className="text-body-lg theme-body">{subheading}</span>
            )}
          </div>
        )}

        <div className={`w-full ${maxWidthClass}`}>
          {tiles?.length > 0 && (
            <>
              {/* mobile/tablet/desktop */}
              <div
                className={`relative [&_.swiper]:overflow-visible ${
                  isGridOnDesktop ? 'lg:hidden' : ''
                }`}
              >
                <Swiper
                  grabCursor
                  onSwiper={setSwiper}
                  slidesOffsetAfter={16}
                  slidesOffsetBefore={16}
                  slidesPerView={tilesPerViewMobile}
                  spaceBetween={16}
                  breakpoints={{
                    768: {
                      slidesPerView: tilesPerViewTablet,
                      slidesOffsetBefore: 32,
                      slidesOffsetAfter: 32,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: tilesPerViewDesktop,
                      slidesOffsetBefore: 0,
                      slidesOffsetAfter: 0,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {swiper &&
                    tiles.map((tile, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ImageTile
                            aspectRatio={aspectRatio}
                            content={content}
                            tile={tile}
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>

                {!swiper && (
                  <div className="flex min-h-[25rem] items-center justify-center">
                    <Spinner width="32" />
                  </div>
                )}
              </div>

              {/* desktop */}
              {isGridOnDesktop && (
                <div
                  className="hidden gap-x-5 lg:grid"
                  style={{
                    gridTemplateColumns: `repeat(${tilesPerViewDesktop}, 1fr)`,
                  }}
                >
                  {tiles.map((tile, index) => {
                    return (
                      <div className="relative" key={index}>
                        <ImageTile
                          aspectRatio={aspectRatio}
                          content={content}
                          tile={tile}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

ImageTiles.displayName = 'ImageTiles';
ImageTiles.Schema = Schema;
