// Configuration exports for IFLA theme

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
