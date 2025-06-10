// packages/theme/src/config/createIFLAConfig.ts
import type {Config} from '@docusaurus/types';
import {SITES}      from './sites';

export function createIFLAConfig(siteId: string, extra?: Partial<Config>): Config {
  const site = SITES.find(s => s.id === siteId);
  if (!site) throw new Error(`Unknown SITE_ID ${siteId}`);

  const dev      = process.env.NODE_ENV !== 'production';
  const url      = dev ? `http://localhost:${site.port}` : 'https://iflastandards.github.io';
  const baseUrl  = dev ? '/' : site.ghPath;          // must keep trailing slash in prod
  const orgName  = 'iflastandards';
  const projName = 'standards-dev';                  // <— used by GH Pages plugin

  return {
    title: `IFLA ${siteId.toUpperCase()} documentation`,
    url,
    baseUrl,
    organizationName: orgName,
    projectName:      projName,
    trailingSlash: false,
    presets: [['@docusaurus/preset-classic', {/* … */}]],
    ...extra,                                        // site-level overrides
  };
}
