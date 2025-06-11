import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Create the configuration using the new unified approach
// Site can be auto-detected or explicitly specified
const config: Config = createDocusaurusConfig({
  siteId: 'portal', // Explicitly specify to avoid auto-detection issues
});

export default config;
