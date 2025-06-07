import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA Muldicat',
  tagline: 'Multilingual Dictionary of Cataloguing Terms',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/Muldicat/',
  organizationName: 'iflastandards',
  projectName: 'Muldicat',
  githubUrl: 'https://github.com/iflastandards/Muldicat',
  vocabularyDefaults: VOCABULARY_DEFAULTS.GENERIC,
});

export default config;