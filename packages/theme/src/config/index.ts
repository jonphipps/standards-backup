// Configuration exports for IFLA theme

export { 
  default as createIFLAConfig, 
  VOCABULARY_DEFAULTS 
} from './docusaurus.base';

export { 
  sharedThemeConfig,
  sharedPlugins,
  sharedThemes,
  commonDefaults,
  siteUrls
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
