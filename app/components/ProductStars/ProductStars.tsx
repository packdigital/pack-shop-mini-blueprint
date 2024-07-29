import {useEffect, useState} from 'react';
import {useFetcher} from '@remix-run/react';
import {parseGid} from '@shopify/hydrogen';

import {ReviewStars} from '~/components';
import type {ColorHexCode} from '~/lib/types';

export function ProductStars({
  id,
  size = 'small',
  color,
  underlined = true,
}: {
  id?: string;
  size?: 'small' | 'large';
  color?: string;
  underlined?: boolean;
}) {
  const fetcher = useFetcher<{
    error: string | null;
    rating: string;
    count: number;
  }>({key: `getProductReviewAggregate:${id}`});
  const [reviewAggregate, setReviewAggregate] = useState<{
    rating: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    if (!fetcher.data?.error) return;
    console.error(fetcher.data.error);
  }, [fetcher.data?.error]);

  useEffect(() => {
    if (!id) return;
    // ↓ comment back in once proper third party api call is implemented in `/api/reviews`
    // const {id: productId} = parseGid(id);
    // const searchParams = new URLSearchParams({
    //   productId,
    //   action: 'getProductReviewAggregate',
    // });
    // fetcher.load(`/api/reviews?${searchParams}`);
  }, [id]);

  useEffect(() => {
    // ↓ comment back in once proper third party api call is implemented in `/api/reviews`
    // if (!fetcher.data) return;

    // mock data until proper third party api call is implemented
    // returned data will likely look differently
    const {rating = '4.7', count = 105} = {...fetcher?.data};

    setReviewAggregate({rating: Number(rating), count});
  }, [fetcher.data]);

  return (
    <div className="flex min-h-4 flex-wrap items-center gap-1">
      {reviewAggregate && (
        <>
          <ReviewStars
            rating={reviewAggregate.rating}
            size={size}
            color={color}
          />

          <p
            className={`opacity-60 ${
              underlined ? 'underline underline-offset-[3px]' : ''
            } ${size === 'large' ? 'text-xs' : 'text-2xs'}`}
          >
            ({reviewAggregate.count} Reviews)
          </p>
        </>
      )}
    </div>
  );
}

ProductStars.displayName = 'ProductStars';
