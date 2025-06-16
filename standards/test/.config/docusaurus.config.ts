import { createStandardSiteConfig } from '@ifla/theme/config';

const config = createStandardSiteConfig({
  siteKey: 'TEST',
  title: 'Test Standard',
  tagline: 'A test standard for validation',
  projectName: 'TEST',

  // TEST-specific vocabulary configuration
  vocabularyDefaults: {
    prefix: "test",
    numberPrefix: "E",
    profile: "test-values.csv",
    elementDefaults: {
      uri: "https://test.example.com/elements",
      profile: "test-elements.csv",
    }
  },

  // GitHub configuration
  editUrl: 'https://github.com/test/test/tree/main/',

  // Navigation customization
  navigation: {
    hideCurrentSiteFromStandardsDropdown: true,
    standardsDropdownPosition: 'right',
    includeResourcesDropdown: false,
  },

  // Footer customization
  footer: {
    useResourcesInsteadOfSites: true,
    additionalResourceLinks: [],
  },
});

export default config;
