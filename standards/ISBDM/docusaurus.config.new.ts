import '@ifla/theme/config/envLoader'; // Loads .env.local from root
import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Create the configuration using the new unified approach
const config: Config = createDocusaurusConfig({
  siteId: 'isbdm',
  // All ISBDM-specific configuration is already in siteConfigs.ts
  // If you need to override anything for a specific deployment or test, you can do it here:
  // additionalConfig: {
  //   // Any overrides go here
  // }
});

export default config;