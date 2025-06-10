// Configuration exports for IFLA theme

// New unified configuration approach
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
export { 
  default as createIFLAConfig, 
  VOCABULARY_DEFAULTS 
} from './docusaurus.base';

export {
  siteURLs,
  getStandardUrl
} from './siteURLs';

export { 
  sharedThemeConfig,
  sharedPlugins,
  sharedThemes,
  commonDefaults
} from './docusaurus';

export { 
  default as defaultSidebars,
  applySidebarLevels,
  createIFLASidebar,
  mergeSidebars,
  generateElementItems,
  generateRelationshipStructure
} from './sidebars.default';

export type { IFLAThemeConfig } from '../types';
