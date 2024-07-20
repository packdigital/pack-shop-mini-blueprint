import {useMemo} from 'react';
import {useMatches} from '@remix-run/react';

import type {Page} from '~/lib/types';

/* Determines if the first section requires a transparent header */

/* List of templates that require a transparent header when at the top */
const TEMPLATES = ['shoppable-social-video'];

export function useTransparentHeader() {
  const matches = useMatches();
  const page = (matches[1]?.data as any)?.page as Page;

  return useMemo(() => {
    const firstSection = page?.sections?.nodes?.find(
      ({data}) => data?.sectionVisibility === 'visible',
    )?.data;
    return TEMPLATES.includes(firstSection?._template);
  }, [page?.sections?.nodes]);
}
