import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA ISBD',
  tagline: 'International Standard Bibliographic Description',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/ISBD/',
  organizationName: 'iflastandards',
  projectName: 'ISBD',
  githubUrl: 'https://github.com/iflastandards/ISBD',
  vocabularyDefaults: VOCABULARY_DEFAULTS.ISBD,
});

export default config;