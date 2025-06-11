import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Create the configuration using the new unified approach
const config: Config = createDocusaurusConfig({
  siteId: 'isbd',
});

export default config;
