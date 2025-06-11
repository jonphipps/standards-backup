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
  // In browser context, we can't determine dev vs prod, so return relative paths
  const siteConfigs = [
    { id: 'portal', ghPath: '/standards-dev/' },
    { id: 'isbdm', ghPath: '/standards-dev/isbdm/' },
    { id: 'lrm', ghPath: '/standards-dev/lrm/' },
    { id: 'fr', ghPath: '/standards-dev/fr/' },
    { id: 'isbd', ghPath: '/standards-dev/isbd/' },
    { id: 'muldicat', ghPath: '/standards-dev/muldicat/' },
    { id: 'unimarc', ghPath: '/standards-dev/unimarc/' },
  ];
  
  const site = siteConfigs.find(s => s.id === siteId);
  if (!site) {
    throw new Error(`No configuration found for site: ${siteId}`);
  }
  
  // In browser, use relative paths
  return `${site.ghPath.replace(/\/$/, '')}${path}`;
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