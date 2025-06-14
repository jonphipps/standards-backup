import { DocsEnv, type SiteKey, sites } from './siteConfigCore';

/**
 * Determines the current deployment environment based on `process.env.DOCS_ENV`,
 * with a fallback to `process.env.NODE_ENV` for local development.
 * This function is intended for server-side use (e.g., in Docusaurus configuration files).
 * It should NOT be imported into any client-side components.
 */
export function getCurrentEnv(): DocsEnv {
  const docsEnv = process.env.DOCS_ENV;

  if (docsEnv && DocsEnv && Object.values(DocsEnv).includes(docsEnv as DocsEnv)) {
    return docsEnv as DocsEnv;
  }

  // Fallback to NODE_ENV if DOCS_ENV is not set or invalid
  const nodeEnv = process.env.NODE_ENV;


  if (nodeEnv === 'development') {
    return DocsEnv?.Localhost as DocsEnv; // Added optional chaining and cast for safety
  }

  return DocsEnv?.Production as DocsEnv; // Added optional chaining and cast for safety
}

/**
 * Retrieves the Docusaurus configuration (url, baseUrl, port) for a given site and the current environment.
 * This is intended for use in `docusaurus.config.js` of each site.
 * @param siteKey The key of the site for which to get the Docusaurus config.
 * @returns An object containing the `url`, `baseUrl`, and `port` for the site in the current environment.
 */
export const getSiteDocusaurusConfigWithOptions = (siteKey: SiteKey): { url: string; baseUrl: string; port?: number } => {
  const currentEnv = getCurrentEnv();
  const site = sites[siteKey]?.[currentEnv];
  if (!site) {
    throw new Error(`Configuration for site '${siteKey}' in environment '${currentEnv}' not found.`);
  }
  return { url: site.url, baseUrl: site.baseUrl, port: site.port };
};
