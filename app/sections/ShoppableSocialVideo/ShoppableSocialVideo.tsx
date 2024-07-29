import {useMemo, useRef, useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Scrollbar} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import hexToRgba from 'hex-to-rgba';

import {Markdown, Svg} from '~/components';
import {useRootLoaderData} from '~/hooks';
import type {loader} from '~/routes/pages.$handle';

import {ShoppableSocialVideoProductCard} from './ShoppableSocialVideoProductCard';
import {
  Schema,
  sliderSettingsDefaults as sliderDefaults,
  textSettingsDefaults as textDefaults,
  backgroundSettingsDefaults as bgDefaults,
} from './ShoppableSocialVideo.schema';
import type {ShoppableSocialVideoCms} from './ShoppableSocialVideo.types';

export function ShoppableSocialVideo({cms}: {cms: ShoppableSocialVideoCms}) {
  const ref = useRef(null);
  const {isPreviewModeEnabled} = useRootLoaderData();
  const {productsMap} = useLoaderData<typeof loader>();
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    video,
    products,
    product: productSettings,
    slider: sliderSettings,
    text,
    background,
  } = cms;

  const sliderProducts = useMemo(() => {
    return (
      products?.reduce((acc: Record<string, any>[], productItem) => {
        const handle = productItem?.product?.handle;
        if (!handle) return acc;
        const fullProduct = productsMap?.[handle];
        if (!fullProduct && !isPreviewModeEnabled) return acc;
        return [
          ...acc,
          {
            ...productItem,
            product: fullProduct || {handle},
          },
        ];
      }, []) || []
    );
  }, [isPreviewModeEnabled, products, productsMap]);

  const {
    heading = textDefaults.heading,
    subtext = textDefaults.subtext,
    scrollText = textDefaults.scrollText,
    color = textDefaults.color,
  } = {...text};
  const {
    colorType = bgDefaults.colorType,
    firstColor = bgDefaults.firstColor,
    secondColor = bgDefaults.secondColor,
  } = {...background};
  const {
    enabledPaginationBar = sliderDefaults.enabledPaginationBar,
    paginationBarColor = sliderDefaults.paginationBarColor,
    slideBgColor = sliderDefaults.slideBgColor,
    slideBgOpacity = sliderDefaults.slideBgOpacity,
    slideTextColor = sliderDefaults.slideTextColor,
  } = {...sliderSettings};
  const slideTextColorFaded = hexToRgba(slideTextColor, 0.6);
  const slideBorderColor = hexToRgba(slideTextColor, 0.2);

  return (
    <div
      className="video-hero__container relative flex h-screen justify-center overflow-hidden bg-gray-300 after:pointer-events-none after:absolute after:left-1/2 after:top-0 after:z-[-1] after:h-[calc(100%+100px)] after:w-[calc(100%+400px)] after:-translate-x-1/2 after:bg-transparent after:shadow-[inset_0_50px_100px_50px_rgba(0,0,0,0.4)]"
      style={{
        ...(colorType === 'solid'
          ? {backgroundColor: firstColor}
          : {
              backgroundImage: `linear-gradient(${colorType}, ${firstColor}, ${secondColor})`,
            }),
      }}
      ref={ref}
    >
      <div className="video-ratio relative flex items-center justify-center overflow-hidden">
        {/* Video */}
        <video
          src={video?.src}
          className="size-full object-cover"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          poster={video?.poster?.src}
        />

        <div className="absolute flex size-full flex-col justify-end shadow-[inset_0_-120px_200px_30px_rgba(92,92,92,0.65)]">
          <div className="w-full space-y-2" style={{color}}>
            <div className="px-6">
              <h1 className="theme-heading text-h3">{heading}</h1>
            </div>

            <div className="flex w-full items-start gap-2">
              <div className="grow space-y-2 overflow-x-hidden">
                <style>
                  {`.swiper-scrollbar-drag {
                      background-color: ${paginationBarColor};
                    }
                  `}
                </style>
                {/* Products slider */}
                <div
                  className={`relative text-clip px-6 [&_.swiper]:overflow-visible ${
                    sliderProducts.length > 1 && enabledPaginationBar
                      ? '[&_.swiper]:pt-8'
                      : ''
                  }`}
                >
                  <style>
                    {`
                      .theme-product-option {
                        border-color: ${slideBorderColor};
                      }
                      .theme-product-option:first-of-type {
                        border-top: 0;
                      }
                      .theme-product-option-label, .theme-product-option-label > button, .theme-product-card-text-color-faded {
                        color: ${slideTextColorFaded};
                      }
                      .theme-product-option-values {
                        flex-wrap: nowrap;
                        overflow-x: auto;
                        margin: 0 -12px;
                        padding: 0 12px;
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                      }
                      .theme-product-option-values::-webkit-scrollbar {
                        display: none;
                      }
                      .theme-product-card-text-color {
                        color: ${slideTextColor};
                      }
                      .theme-product-card-text-color-faded {
                        color: ${slideTextColorFaded};
                      }
                    `}
                  </style>
                  <Swiper
                    grabCursor
                    onSlideChange={({activeIndex}) =>
                      setActiveIndex(activeIndex)
                    }
                    modules={[Scrollbar]}
                    slidesPerView={1}
                    spaceBetween={12}
                    scrollbar={{
                      enabled: !!enabledPaginationBar,
                      draggable: true,
                      el: '.swiper-scrollbar',
                    }}
                  >
                    {sliderProducts.map(({product, image, badge}, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <SwiperSlide key={index}>
                          <ShoppableSocialVideoProductCard
                            product={product}
                            image={image}
                            isActive={isActive}
                            badge={badge}
                            productSettings={productSettings}
                            sliderSettings={sliderSettings}
                          />
                        </SwiperSlide>
                      );
                    })}

                    <div
                      className="swiper-scrollbar !bottom-auto !left-0 !top-0 !z-0 !h-1.5 !w-full"
                      style={{
                        backgroundColor: hexToRgba(
                          slideBgColor,
                          slideBgOpacity,
                        ),
                      }}
                    />
                  </Swiper>
                </div>

                {/* Subtext */}
                <div className="px-6">
                  <Markdown>{subtext}</Markdown>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center px-6 pb-4">
              <button
                aria-label="Scroll for more"
                className="flex items-center gap-1 p-1 text-sm"
                onClick={() => {
                  if (!ref.current) return;
                  const container = ref.current as HTMLElement;
                  const bottomY = container.getBoundingClientRect()?.bottom;
                  window.scrollTo({
                    top: bottomY - (window.scrollY < 55 ? 55 : 0),
                    behavior: 'smooth',
                  });
                }}
                type="button"
              >
                <Svg
                  className="w-5"
                  src="/svgs/chevron-down.svg#chevron-down"
                  viewBox="0 0 24 24"
                />
                {scrollText}
                <Svg
                  className="w-5"
                  src="/svgs/chevron-down.svg#chevron-down"
                  viewBox="0 0 24 24"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ShoppableSocialVideo.displayName = 'ShoppableSocialVideo';
ShoppableSocialVideo.Schema = Schema;
