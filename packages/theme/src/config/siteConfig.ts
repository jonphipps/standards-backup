// packages/theme/src/config/siteConfig.ts

import { DocsEnv, type SiteKey, sites } from './siteConfigCore';
import { getCurrentEnv } from './siteConfig.server';

/**
 * Generates a full URL to a page on a specified IFLA Docusaurus site, considering the target environment.
 * If `targetEnv` is not provided, it defaults to the current site's environment.
 * If `path` is an empty string, it links to the root of the `toSiteKey`.
 * Ensures that `baseUrl` is correctly handled, avoiding double slashes if `path` starts with one.
 * @param toSiteKey The key of the target site (e.g., 'LRM', 'portal').
 * @param path The path to the page on the target site (e.g., '/introduction', 'docs/main'). Defaults to ''.
 * @param targetEnv The deployment environment for which to generate the URL.
 * @returns The full URL string, or '#' if the configuration for the site/env is not found.
 */
export function getSiteUrl(
  toSiteKey: SiteKey,
  path = '',
  targetEnv: DocsEnv, // targetEnv is required
): string {
  let resolvedEnv = targetEnv;

  if (typeof targetEnv === 'undefined') {
    // Downgrade from critical error/trace to a warning, as fallback is attempted.
    console.warn(
      `[siteConfig.ts] getSiteUrl WARNING: called with undefined targetEnv! toSiteKey: ${toSiteKey}, path: ${path}. Attempting fallback. Stack trace for info:`,
    );
    console.trace(); // Keep trace for informational purposes if needed for future debugging
    
    const fallbackEnv = getCurrentEnv(); 
    console.warn(
      `[siteConfig.ts] getSiteUrl: Using fallback environment '${fallbackEnv}' due to undefined targetEnv.`
    );
    resolvedEnv = fallbackEnv;
  }

  console.log(
    `[siteConfig.ts] getSiteUrl CALLED with toSiteKey: ${toSiteKey}, path: ${path}, original targetEnv: ${targetEnv} (type: ${typeof targetEnv}), resolvedEnv: ${resolvedEnv} (type: ${typeof resolvedEnv})`
  );

  // Validate resolvedEnv (could be original targetEnv or fallbackEnv)
  if (!resolvedEnv || !Object.values(DocsEnv).includes(resolvedEnv)) {
    console.error(
      `[siteConfig.ts] getSiteUrl: Invalid resolvedEnv! Value: ${JSON.stringify(resolvedEnv)}, Type: ${typeof resolvedEnv}. Original targetEnv was ${JSON.stringify(targetEnv)}.`
    );
    // If targetEnv was undefined, we already traced. If it was defined but invalid, trace now.
    if (typeof targetEnv !== 'undefined') {
        console.trace("[siteConfig.ts] Trace for invalid (but defined) targetEnv leading to invalid resolvedEnv.");
    }
    return `#ERROR_INVALID_RESOLVED_ENV_FOR_${toSiteKey}`;
  }

  const siteConfig = sites[toSiteKey]?.[resolvedEnv];

  if (!siteConfig) {
    console.error(
      `[siteConfig.ts] getSiteUrl: URL generation failed: Config for site '${toSiteKey}' in resolvedEnv '${String(resolvedEnv)}' (type: ${typeof resolvedEnv}) not found.`
    );
    if (sites[toSiteKey]) {
      console.error(`[siteConfig.ts] Available envs for ${toSiteKey}: ${Object.keys(sites[toSiteKey]!).join(', ')}`);
    } else {
      console.error(`[siteConfig.ts] SiteKey ${toSiteKey} not found in sites configuration.`);
    }
    return '#ERROR_SITE_CONFIG_NOT_FOUND';
  }

  const LRMPath = path.startsWith('/') ? path.substring(1) : path;
  const fullPath = `${siteConfig.baseUrl}${LRMPath}`;
  return `${siteConfig.url}${fullPath}`;
}

/**
 * Retrieves the Docusaurus configuration (url, baseUrl) for a given site and the current environment.
 * This is intended for use in `docusaurus.config.js` of each site.
 * @param siteKey The key of the site for which to get the Docusaurus config.
 * @returns An object containing the `url` and `baseUrl` for the site in the current environment.
 */
export const getSiteDocusaurusConfig = (siteKey: SiteKey, currentEnv: DocsEnv): { url: string; baseUrl: string } => {
  const site = sites[siteKey]?.[currentEnv];
  if (!site) {
    throw new Error(`Configuration for site '${siteKey}' in environment '${currentEnv}' not found.`);
  }
  return { url: site.url, baseUrl: site.baseUrl };
};
