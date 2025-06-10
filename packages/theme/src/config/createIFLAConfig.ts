// packages/theme/src/config/createIFLAConfig.ts
import type {Config}   from '@docusaurus/types';
import {SITES}         from './sites';

export function createIFLAConfig(siteId: string, extra?: Partial<Config>): Config {
  const site   = SITES.find(s => s.id === siteId)!;
  const dev    = process.env.NODE_ENV !== 'production';
  const url    = dev ? `http://localhost:${site.port}` : 'https://iflastandards.github.io';
  const baseUrl= dev ? '/' : site.ghPath;          // prod needs the trailing slash
  const common = {
    organizationName: 'iflastandards',
    projectName:      'standards-dev',             // GH Pages project
    trailingSlash:    false,
  };
  return {                                 //  <— the old docusaurus.base defaults here
    title:   `IFLA ${siteId.toUpperCase()} documentation`,
    url,
    baseUrl,
    ...common,
    ...extra,                              // per-site overrides if you need them
  };
}
