import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA FR',
  tagline: 'Functional Requirements',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/FR/',
  organizationName: 'iflastandards',
  projectName: 'FR',
  githubUrl: 'https://github.com/iflastandards/FR',
  vocabularyDefaults: VOCABULARY_DEFAULTS.GENERIC,
});

export default config;
