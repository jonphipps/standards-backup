// Browser-safe configuration exports for IFLA theme
// Server-side configurations that use Node.js modules (like dotenv) should be imported directly
// from './docusaurus' when needed in docusaurus.config.ts files

export { 
  default as createIFLAConfig, 
  VOCABULARY_DEFAULTS 
} from './docusaurus.base';

// Export browser-safe config from the new browser.ts file
export { 
  sharedThemeConfig,
  sharedPlugins,
  sharedThemes,
  commonDefaults
} from './browser';

// Note: siteUrls removed from exports as it uses dotenv (Node.js only)
// Import it directly from './docusaurus' in server-side code when needed

export { 
  default as defaultSidebars,
  applySidebarLevels,
  createIFLASidebar,
  mergeSidebars,
  generateElementItems,
  generateRelationshipStructure
} from './sidebars.default';

export type { IFLAThemeConfig } from '../types';
