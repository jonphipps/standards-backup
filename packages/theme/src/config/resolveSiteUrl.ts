// packages/theme/config/resolveSiteUrl.ts
import type { SiteId } from './sites-meta';
import { sites } from './sites-meta';

/**
 * Compute url/baseUrl and absolute links to every other site based on the
 * chosen runtime mode. Mode is picked via DOCS_ENV which may be one of
 * `local` | `preview` | `prod`.
 */
export function resolveSiteUrl(siteId: SiteId) {
  const mode = (process.env.DOCS_ENV ?? 'local') as 'local' | 'preview' | 'prod';
  const { path, port } = sites[siteId];

  // Determine origin for this site in the selected mode
  const origin =
    mode === 'prod'
      ? 'https://iflastandards.info'
      : mode === 'preview'
        ? 'https://iflastandards.github.io/standards-dev'
        : `http://localhost:${port}`;

  // baseUrl must include trailing slash, and be "/" for root (portal) in prod/preview
  const baseUrl = path ? `/${path}/` : '/';

  // Build absolute links to every site so navbars/footers can reference them
  const interSite = Object.fromEntries(
    (Object.entries(sites) as [SiteId, { path: string; port: number }][]).map(
      ([id, { path: p, port: pt }]) => {
        const destOrigin =
          mode === 'prod'
            ? 'https://iflastandards.info'
            : mode === 'preview'
              ? 'https://iflastandards.github.io/standards-dev'
              : `http://localhost:${pt}`;
        const destPath = p ? `/${p}/` : '/';
        return [id, `${destOrigin}${destPath}`];
      },
    ),
  ) as Record<SiteId, string>;

  return {
    /** docusaurus config `url` */
    url: origin,
    /** docusaurus config `baseUrl` */
    baseUrl,
    /** absolute links to every site for navbar/footer generation */
    interSite,
  } as const;
}
