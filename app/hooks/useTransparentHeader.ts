import {useMemo} from 'react';
import {useMatches} from '@remix-run/react';

import type {Page} from '~/lib/types';

/* Determines if the first section requires a transparent header */

/* List of templates that require a transparent header when at the top */
const TEMPLATES = ['shoppable-social-video'];

export function useTransparentHeader() {
  const matches = useMatches();
  const page = matches[1]?.data?.page;

  const firstSection = useMemo(() => {
    return page?.sections?.nodes?.find(
      ({data}) => data?.sectionVisibility === 'visible',
    )?.data;
  }, [page?.sections?.nodes]);

  const isTransparentHeader = useMemo(() => {
    return TEMPLATES.includes(firstSection?._template);
  }, [firstSection]);

  const isDarkHeaderIcons = useMemo(() => {
    return firstSection?.video?.contrast === 'light' || false;
  }, [firstSection]);

  return {
    isTransparentHeader,
    isDarkHeaderIcons,
  };
}
