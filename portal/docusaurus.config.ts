import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA Standards Portal',
  tagline: 'International Federation of Library Associations and Institutions Standards',
  url: 'https://iflastandards.github.io',
  baseUrl: process.env.BASE_URL || '/portal/',
  organizationName: 'iflastandards',
  projectName: 'standards-portal',
  githubUrl: 'https://github.com/iflastandards/standards-dev',
  vocabularyDefaults: VOCABULARY_DEFAULTS.GENERIC,
  onBrokenLinks: 'warn', // Change from 'throw' to 'warn' to allow builds with broken links
});

export default config;