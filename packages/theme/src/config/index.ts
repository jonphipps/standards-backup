// Configuration exports for IFLA theme
// NOTE: This index is for build-time use only (Node.js environment)
// For browser-safe exports, see ./browser.ts

// New unified configuration approach (build-time only)
export { 
  createDocusaurusConfig,
  getSiteUrl,
  SITE_IDS,
  type SiteId,
  type CreateConfigOptions
} from './createDocusaurusConfig';

export {
  baseConfig,
  baseThemeConfig,
  vocabularyDefaults
} from './baseConfig';

export {
  siteConfigs,
  getSiteConfig,
  type SiteConfig
} from './siteConfigs';

// Legacy exports for backward compatibility (to be removed)
// Note: These are commented out to prevent browser bundling issues
// export { 
//   default as createIFLAConfig, 
//   VOCABULARY_DEFAULTS 
// } from './docusaurus.base';

// export {
//   siteURLs,
//   getStandardUrl
// } from './siteURLs';

// export { 
//   sharedThemeConfig,
//   sharedPlugins,
//   sharedThemes,
//   commonDefaults
// } from './docusaurus';

export { 
  default as defaultSidebars,
  applySidebarLevels,
  createIFLASidebar,
  mergeSidebars,
  generateElementItems,
  generateRelationshipStructure
} from './sidebars.default';

export type { IFLAThemeConfig } from '../types';
