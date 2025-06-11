// packages/theme/config/withIFLA.ts
import merge from 'lodash.merge';
import type { Config } from '@docusaurus/types';
import type { SiteId } from './sites-meta';
import { resolveSiteUrl } from './resolveSiteUrl';
import { sharedDocs, sharedTheme } from './preset-ifla';

/**
 * Helper for Docusaurus site configs.
 * Combines dynamic url/baseUrl/interSite logic with shared @docusaurus/preset-classic config.
 */
export function withIFLA(siteId: SiteId, local: Partial<Config>): Config {
  const { url, baseUrl, interSite } = resolveSiteUrl(siteId);

  // Use @docusaurus/preset-classic, spreading in the shared config objects.
  const shared: Partial<Config> = {
    url,
    baseUrl,
    presets: [
      [
        '@docusaurus/preset-classic',
        {
          docs: sharedDocs,
          theme: sharedTheme,
        },
      ],
    ],
    customFields: { siteId, interSite },
  };

  return merge({}, shared, local) as Config;
}
