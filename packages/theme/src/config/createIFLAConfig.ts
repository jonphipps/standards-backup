// packages/theme/src/config/createIFLAConfig.ts
import githubTheme from './githubTheme';
import type {Config} from '@docusaurus/types';
import merge          from 'lodash.merge';
import {SITES}        from './sites';

export async function createIFLAConfig(siteId: string): Promise<Config> {
  const site = SITES.find(s => s.id === siteId)!;
  const dev  = process.env.NODE_ENV !== 'production';

  /* ---------- shared defaults (was docusaurus.base.ts) ------------ */
  const base: Config = {
    title:        `IFLA ${siteId.toUpperCase()} documentation`,
    url:          dev ? `http://localhost:${site.port}` : 'https://iflastandards.github.io',
    baseUrl:      dev ? '/' : site.ghPath,               // must keep trailing “/” in prod  [oai_citation:0‡docusaurus.io](https://docusaurus.io/docs/api/docusaurus-config?utm_source=chatgpt.com)
    organizationName: 'iflastandards',
    projectName:      'standards-dev',
    trailingSlash:    false,
    future:           {experimental_faster: true, v4: true},
    presets: [
      ['@docusaurus/preset-classic',
        { blog: false, docs: {showLastUpdateAuthor: true} },
      ],
    ],
    themeConfig: {                                   // shared colours, code theme, etc.
      prism: { theme: githubTheme },
    } as any,
  };

  /* ---------- pull the site-specific override if it exists -------- */
  let extra: Partial<Config> = {};
  try {
    // dynamic import so TS won't complain if the file is absent
    extra = (await import(`../../../../${site.dir}/site.config`)).default;
  } catch {/* site has no override */ }

  return merge(base, extra);                          // deep-merge arrays & objects
}
