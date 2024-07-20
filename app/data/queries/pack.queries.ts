/*
 * BACKPACK API QUERIES -------------------------------------------------------
 */

export const SITE_SETTINGS_QUERY = `#graphql
  query SiteSettings($version: Version) {
    siteSettings(version: $version) {
      id
      status
      settings
      publishedAt
      createdAt
      updatedAt
      favicon
      seo {
        title
        description
        keywords
      }
    }
  }
` as const;

export const SECTION_FRAGMENT = `#graphql
  fragment section on Section {
    id
    title
    status
    data
    publishedAt
    createdAt
    updatedAt
    parentContentType
  }
` as const;
