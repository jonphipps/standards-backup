import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA UNIMARC',
  tagline: 'Universal MARC Format',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/UNIMARC/',
  organizationName: 'iflastandards',
  projectName: 'UNIMARC',
  githubUrl: 'https://github.com/iflastandards/UNIMARC',
  vocabularyDefaults: VOCABULARY_DEFAULTS.GENERIC,
});

export default config;