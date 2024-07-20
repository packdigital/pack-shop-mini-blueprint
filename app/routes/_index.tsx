import {json, redirect} from '@shopify/remix-oxygen';
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

  return json({});
}

export default function Index() {
  /*
   * By default the homepage redirects to the link set in site settings, while
   * in production and outside of the customizer, thus no sections are rendered here.
   */
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="flex w-full max-w-[600px] flex-col gap-6 rounded-lg bg-[rgba(0,0,0,0.6)] px-6 py-8 text-center text-white md:px-8 md:py-10">
        <h1 className="text-h3 font-normal">Welcome to your Pack Shop.</h1>
        <h2 className="text-h5 font-normal">
          Get started by creating your first page in the customizer.
        </h2>
      </div>
    </div>
  );
}
