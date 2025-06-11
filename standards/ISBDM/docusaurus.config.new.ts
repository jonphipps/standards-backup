import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Create the configuration using the new unified approach
const config: Config = createDocusaurusConfig({
  siteId: 'isbdm',
});

// With additional overrides:
// const config: Config = createDocusaurusConfig({
//   siteId: 'isbdm',
//   additionalConfig: {
//     // Any overrides go here
//   }
// });

export default config;