// packages/theme/src/config/siteConfig.ts

export enum DocsEnv {
  Localhost = 'localhost',
  Preview = 'preview', // For GitHub Pages (e.g., iflastandards.github.io/standards-dev/)
  Production = 'production', // For custom domain (e.g., iflastandards.info)
}

export interface SiteEnvSpecificConfig {
  url: string; // The root URL of the deployment, e.g., http://localhost:3000 or https://iflastandards.info
  baseUrl: string; // The base path for the site, e.g., / or /LRM/ or /standards-dev/LRM/
}

export interface SiteConfigData {
  port?: number; // Localhost development port
  localhost: SiteEnvSpecificConfig;
  preview: SiteEnvSpecificConfig;
  production: SiteEnvSpecificConfig;
}

// Site keys should ideally match the directory names used in `docusaurus start [siteName]`
// or be a canonical identifier for the site.
export const sites: Record<string, SiteConfigData> = {
  portal: {
    port: 3000,
    localhost: { url: 'http://localhost:3000', baseUrl: '/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/' },
  },
  ISBDM: {
    port: 3001,
    localhost: { url: 'http://localhost:3001', baseUrl: '/ISBDM/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/ISBDM/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/ISBDM/' },
  },
  LRM: {
    port: 3002,
    localhost: { url: 'http://localhost:3002', baseUrl: '/LRM/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/LRM/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/LRM/' },
  },
  fr: {
    port: 3003,
    localhost: { url: 'http://localhost:3003', baseUrl: '/fr/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/fr/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/fr/' },
  },
  isbd: {
    port: 3004,
    localhost: { url: 'http://localhost:3004', baseUrl: '/isbd/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/isbd/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/isbd/' },
  },
  muldicat: {
    port: 3005,
    localhost: { url: 'http://localhost:3005', baseUrl: '/muldicat/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/muldicat/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/muldicat/' },
  },
  unimarc: {
    port: 3006,
    localhost: { url: 'http://localhost:3006', baseUrl: '/unimarc/' },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/unimarc/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/unimarc/' },
  },
};

export type SiteKey = keyof typeof sites;

export function getCurrentEnv(): DocsEnv {
  const envVar = process.env.DOCS_ENV?.toLowerCase();

  if (envVar === 'localhost' || envVar === 'local') return DocsEnv.Localhost;
  if (envVar === 'preview' || envVar === 'gh-pages' || envVar === 'github') return DocsEnv.Preview;
  if (envVar === 'production' || envVar === 'prod') return DocsEnv.Production;

  // Fallback for local development if DOCS_ENV is not set
  if (process.env.NODE_ENV === 'development' && !envVar) {
    console.warn(
      `DOCS_ENV environment variable is not set. NODE_ENV is 'development'. ` +
      `Defaulting DOCS_ENV to '${DocsEnv.Localhost}'.`
    );
    return DocsEnv.Localhost;
  }

  console.warn(
    `DOCS_ENV environment variable ('${process.env.DOCS_ENV}') is not set or has an invalid value. ` +
    `Valid values are 'localhost' (or 'local'), 'preview' (or 'gh-pages', 'github'), ` +
    `'production' (or 'prod'). Defaulting to '${DocsEnv.Production}'.`
  );
  return DocsEnv.Production; // Default to production if not specified or invalid
}

/**
 * Retrieves the Docusaurus-specific `url` and `baseUrl` for a given site,
 * based on the current environment determined by `DOCS_ENV`.
 * 
 * @param siteKey The key of the site as defined in the `sites` object (e.g., "portal", "ISBDM").
 * @returns An object containing the `url` and `baseUrl` for the Docusaurus config.
 */
export function getSiteDocusaurusConfig(siteKey: SiteKey): SiteEnvSpecificConfig {
  const currentEnv = getCurrentEnv();
  const siteConfig = sites[siteKey];

  if (!siteConfig) {
    throw new Error(
      `[getSiteDocusaurusConfig] Configuration for site "${siteKey}" not found. ` +
      `Ensure the siteKey passed from docusaurus.config.ts is a valid key in siteConfig.ts.`
    );
  }

  let configForEnv = siteConfig[currentEnv];

  // For localhost, ensure the URL explicitly uses the configured port.
  if (currentEnv === DocsEnv.Localhost && siteConfig.port) {
    configForEnv = {
      ...configForEnv, // Retains the baseUrl from the localhost config
      url: `http://localhost:${siteConfig.port}`,
    };
  }
  
  return configForEnv;
}

/**
 * Generates a full, absolute URL to a page on a specific site, considering the target (or current) environment.
 * Useful for inter-site linking.
 * 
 * @param toSiteKey The key of the target site (e.g., 'LRM', 'portal'). Must be a valid SiteKey.
 * @param path Optional. The relative path within the target site (e.g., '/introduction', 'docs/main', or '').
 *             If it starts with '/', it's treated as absolute from the site's baseUrl root.
 *             If empty, links to the site's base (url + baseUrl).
 * @param targetEnv Optional. The environment for which to generate the URL. Defaults to the current environment.
 * @returns The full, absolute URL as a string.
 */
export function getSiteUrl(toSiteKey: SiteKey, path: string = '', targetEnv?: DocsEnv): string {
  const env = targetEnv || getCurrentEnv();
  const siteConfig = sites[toSiteKey];

  if (!siteConfig) {
    console.error(`[getSiteUrl] Configuration for site "${toSiteKey}" not found.`);
    // Return a non-functional link or throw an error, depending on desired strictness
    return `/#error-site-config-not-found-${toSiteKey}`;
  }

  const envSpecificConfig = siteConfig[env];
  let rootUrl = envSpecificConfig.url; // e.g., http://localhost:3000 or https://iflastandards.info

  // For localhost, ensure the URL explicitly uses the configured port.
  if (env === DocsEnv.Localhost && siteConfig.port) {
    rootUrl = `http://localhost:${siteConfig.port}`;
  }

  const siteBasePath = envSpecificConfig.baseUrl; // e.g., /LRM/ or / or /standards-dev/LRM/

  // Normalize rootUrl: remove any trailing slash.
  const normalizedRootUrl = rootUrl.endsWith('/') ? rootUrl.slice(0, -1) : rootUrl;

  // Normalize siteBasePath: ensure it starts with a slash.
  let normalizedSiteBasePath = siteBasePath.startsWith('/') ? siteBasePath : `/${siteBasePath}`;
  // Ensure it ends with a slash if it's not just "/", to correctly join with sub-paths.
  if (normalizedSiteBasePath !== '/' && !normalizedSiteBasePath.endsWith('/')) {
    normalizedSiteBasePath += '/';
  }

  // Normalize the sub-path: remove leading slash if present, as normalizedSiteBasePath will provide it.
  const normalizedSubPath = path.startsWith('/') ? path.substring(1) : path;

  let finalPath = normalizedSiteBasePath;
  if (normalizedSubPath) {
    if (finalPath.endsWith('/')) {
      finalPath += normalizedSubPath;
    } else {
      // This case should be less common if normalizedSiteBasePath is handled correctly
      finalPath += `/${normalizedSubPath}`;
    }
  }
  
  // If the original path was meant to be a directory (empty or ends with /), ensure the final path also ends with /.
  if ((path === '' || path.endsWith('/')) && !finalPath.endsWith('/')) {
    finalPath += '/';
  }

  return `${normalizedRootUrl}${finalPath}`;
}
