import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Container, Link, ReviewStars, Svg} from '~/components';

import {Schema} from './TestimonialSlider.schema';
import type {TestimonialSliderCms} from './TestimonialSlider.types';

export function TestimonialSlider({cms}: {cms: TestimonialSliderCms}) {
  const {
    heading,
    link,
    buttonStyle = 'theme-btn-primary',
    section,
    testimonialSlides: blocks,
  } = {...cms};
  const {
    fullWidth,
    reviewStarColor = '#FFFFFF',
    sliderPaginationBulletColor = '#FFFFFF',
    textColor = '#FFFFFF',
  } = {
    ...section,
  };
  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <Container
      container={{
        ...cms.container,
        bgColor: cms.container?.bgColor || '#000000',
      }}
    >
      <div className="md:px-contained flex flex-col items-center py-12 lg:py-16">
        <div
          className={`theme-heading-text-align flex w-full flex-col ${maxWidthClass}`}
        >
          <h2
            className="text-h2 theme-heading max-md:px-contained"
            style={{color: textColor}}
          >
            {heading}
          </h2>
        </div>

        <div
          className={`relative flex w-full flex-col items-center lg:px-14 ${maxWidthClass}`}
        >
          {blocks?.length > 0 && (
            <Swiper
              className="!static mt-10 w-full"
              grabCursor
              loop={blocks.length >= 2}
              pagination={{
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                renderBullet(_, className) {
                  return `<span class="${className}" style="background-color: ${sliderPaginationBulletColor}"></span>`;
                },
              }}
              modules={[Pagination, Navigation]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              slidesPerView={1}
              spaceBetween={16}
              breakpoints={{
                768: {
                  loop: blocks.length >= 4,
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  loop: blocks.length >= 6,
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
              }}
            >
              {blocks.map((item, index) => {
                const rating = item.rating ? parseFloat(item.rating) : 5;
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="mx-auto flex max-w-[18.75rem] flex-col items-center text-center lg:max-w-[15.625rem]"
                      style={{
                        color: textColor,
                      }}
                    >
                      <ReviewStars rating={rating} color={reviewStarColor} />

                      <h3 className="theme-heading my-4 text-2xl">
                        {item.title}
                      </h3>

                      {item.body && <p>{item.body}</p>}

                      {item.author && (
                        <p className="mt-4 text-base">{item.author}</p>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}

              <div className="swiper-pagination !static mt-6 lg:!hidden" />

              <div
                className={`swiper-button-prev left-0 !hidden !h-14 !w-14 rounded-full bg-white after:hidden ${
                  blocks.length > 3 ? 'lg:!flex' : 'lg:!hidden'
                }`}
              >
                <Svg
                  className="max-w-5 text-black"
                  src="/svgs/arrow-left.svg#arrow-left"
                  title="Arrow Left"
                  viewBox="0 0 24 24"
                />
              </div>

              <div
                className={`swiper-button-next right-0 !hidden !h-14 !w-14 rounded-full bg-white after:hidden ${
                  blocks.length > 3 ? 'lg:!flex' : 'lg:!hidden'
                }`}
              >
                <Svg
                  className="max-w-5 text-black"
                  src="/svgs/arrow-right.svg#arrow-right"
                  title="Arrow Right"
                  viewBox="0 0 24 24"
                />
              </div>
            </Swiper>
          )}
        </div>

        {link?.text && (
          <div
            className={`theme-heading-text-align mt-10 flex w-full flex-col ${maxWidthClass}`}
          >
            <Link
              aria-label={link.text}
              className={`${buttonStyle}`}
              to={link.url}
              newTab={link.newTab}
              type={link.type}
            >
              {link.text}
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

TestimonialSlider.displayName = 'TestimonialSlider';
TestimonialSlider.Schema = Schema;
