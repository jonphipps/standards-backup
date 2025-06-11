import { createDocusaurusConfig } from '@ifla/theme/config';
import type { Config } from '@docusaurus/types';

// Create the configuration using the new unified approach
// Site is auto-detected from current working directory
const config: Config = createDocusaurusConfig();

// If you need to override anything for a specific deployment or test:
// const config: Config = createDocusaurusConfig({
//   additionalConfig: {
//     // Any overrides go here
//   }
// });

export default config;