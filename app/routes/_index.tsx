import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {RenderSections} from '@pack/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {getSiteSettings} from '~/lib/utils';
import {PAGE_QUERY} from '~/data/queries';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront, pack} = context;
  const {data} = await pack.query(PAGE_QUERY, {
    variables: {handle: '/'},
    cache: storefront.CacheLong(),
  });

  if (!data?.page) throw new Response(null, {status: 404});

  const hostname = new URL(request.url).hostname;
  const isPreviewModeEnabled = pack.isPreviewModeEnabled();

  /* If in production and outside of customizer, redirect homepage to link set in site settings */
  if (!isPreviewModeEnabled && hostname !== 'localhost') {
    const siteSettings = await getSiteSettings(context);
    const redirectLink =
      siteSettings?.data?.siteSettings?.settings?.homepage?.redirect;
    if (redirectLink?.url) {
      return redirect(redirectLink.url);
    } else {
      // if no redirect link is set, return 404
      throw new Response(null, {status: 404});
    }
  }

  return json({page: data.page});
}

export default function Index() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex w-full max-w-[600px] flex-col rounded-lg bg-[rgba(0,0,0,0.6)] px-6 py-8 text-center text-white md:px-8 md:py-10">
          <h1 className="text-h3 theme-heading">Welcome to your Pack Shop.</h1>
          <h2 className="text-h5 theme-heading mt-4">
            Get started by creating your first page in the customizer.
          </h2>
          <p className="mt-8 text-sm">
            In production and outside the customizer, the homepage will redirect
            to the link set in homepage site settings, or will 404 if no link is
            set.
          </p>
          <p className="mt-3 text-sm">
            Sections added here will not be public.
          </p>
        </div>
      </div>

      <RenderSections content={page} />
    </>
  );
}
