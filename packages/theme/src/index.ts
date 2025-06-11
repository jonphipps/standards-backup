/**
 * IFLA Theme - Comprehensive shared theme system for IFLA standard sites
 * 
 * This package provides:
 * - Reusable React components for IFLA standards documentation
 * - Consistent IFLA branding and styling (SCSS variables, mixins)
 * - Base Docusaurus configuration templates
 * - Shared utilities and React hooks
 * - TypeScript type definitions
 * 
 * @version 1.0.0
 * @author IFLA
 * @license MIT
 */

// Export all components
export * from './components';

// Export browser-safe configuration helpers
export * from './config/browser';

// Export utilities and hooks
export * from './utils';
export * from './hooks';

// Export types
export * from './types';

// Note: Styles are available via the package exports './styles' path
// Import them in your site with: import '@ifla/theme/styles';

// Default export for convenience
import * as Components from './components';
import * as Config from './config/browser';
import * as Utils from './utils';
import * as Hooks from './hooks';
import * as Types from './types';

export default {
  Components,
  Config,
  Utils,
  Hooks,
  Types,
};

// Version information
export const VERSION = '1.0.0';
export const THEME_NAME = 'IFLA Theme';

/**
 * Initialize IFLA theme
 * This function can be called to set up any global theme configuration
 */
export function initializeIFLATheme(options: Partial<Types.IFLAThemeConfig> = {}) {
  // Add any global initialization logic here
  if (typeof window !== 'undefined') {
    // Browser-only initialization
    console.info(`${THEME_NAME} v${VERSION} initialized`);
  }
  
  return options;
}