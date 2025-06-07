import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA LRM',
  tagline: 'Library Reference Model',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/LRM/',
  organizationName: 'iflastandards',
  projectName: 'LRM',
  githubUrl: 'https://github.com/iflastandards/LRM',
  vocabularyDefaults: VOCABULARY_DEFAULTS.LRM,
});

export default config;
