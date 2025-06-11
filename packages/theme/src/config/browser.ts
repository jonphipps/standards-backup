/**
 * Browser-safe configuration exports
 * Only exports configurations that can be safely used in the browser
 */

// Only export types and browser-safe utilities
export type { IFLAThemeConfig } from '../types';
export type { SiteConfig, CreateConfigOptions, SiteId } from './createDocusaurusConfig';

// Export vocabularyDefaults which is browser-safe
export { vocabularyDefaults } from './baseConfig';

// Export SITE_IDS which is browser-safe
export { SITE_IDS } from './createDocusaurusConfig';

// Browser-safe version of getSiteUrl that doesn't use process.env
export function getSiteUrl(siteId: string, path: string = '/'): string {
  // In browser context, we can determine dev vs prod from the current URL
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  
  const siteConfigs = [
    { id: 'portal', ghPath: '/standards-dev/', port: 3000 },
    { id: 'isbdm', ghPath: '/standards-dev/ISBDM/', port: 3001 },
    { id: 'lrm', ghPath: '/standards-dev/LRM/', port: 3002 },
    { id: 'fr', ghPath: '/standards-dev/fr/', port: 3003 },
    { id: 'isbd', ghPath: '/standards-dev/isbd/', port: 3004 },
    { id: 'muldicat', ghPath: '/standards-dev/muldicat/', port: 3005 },
    { id: 'unimarc', ghPath: '/standards-dev/unimarc/', port: 3006 },
  ];
  
  const site = siteConfigs.find(s => s.id === siteId.toLowerCase());
  if (!site) {
    throw new Error(`No configuration found for site: ${siteId}`);
  }
  
  if (isDev) {
    // In development, extract the site path from ghPath (e.g., '/standards-dev/LRM/' -> '/LRM/')
    const devPath = site.ghPath.replace('/standards-dev', '');
    return `http://localhost:${site.port}${devPath.replace(/\/$/, '')}${path}`;
  } else {
    return `https://iflastandards.github.io${site.ghPath.replace(/\/$/, '')}${path}`;
  }
}

// Helper function to get the root URL for a standard site (for cross-site navigation)
export function getStandardUrl(siteId: string): string {
  return getSiteUrl(siteId, '/');
}

// Re-export sidebar utilities which are browser-safe
export { 
  default as defaultSidebars,
  applySidebarLevels,
  createIFLASidebar,
  mergeSidebars,
  generateElementItems,
  generateRelationshipStructure
} from './sidebars.default';