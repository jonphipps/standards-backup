import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Create the configuration using the new unified approach

// Option 1: Explicit site ID (recommended for reliability)
const config: Config = createDocusaurusConfig({
  siteId: 'isbdm',
});

// Option 2: Auto-detect from directory (works when running from site directory)
// const config: Config = createDocusaurusConfig();

// Option 3: With additional overrides
// const config: Config = createDocusaurusConfig({
//   siteId: 'isbdm',
//   additionalConfig: {
//     // Any overrides go here
//   }
// });

export default config;