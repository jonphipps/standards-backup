import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

// Shared theme configuration - only truly global items
export const sharedThemeConfig = {
  // Global prism themes for code highlighting
  prism: {
    theme: prismThemes.github,
    darkTheme: prismThemes.dracula,
  },
  // Common table of contents settings
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 5,
  },
  // Standard color mode configuration
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: true,
  },
  // Standard social card
  image: 'img/docusaurus-social-card.jpg',
  // Common announcement bar
  announcementBar: {
    id: 'support_us',
    content: '⭐️ This is an active development site for IFLA standards ⭐️',
    backgroundColor: '#fafbfc',
    textColor: '#091E42',
    isCloseable: false,
  },
};

// Shared plugins - only truly universal ones
export const sharedPlugins = [
  'docusaurus-plugin-sass',
  [
    '@docusaurus/plugin-ideal-image',
    {
      quality: 70,
      max: 1030,
      min: 640,
      steps: 2,
      disableInDev: false,
    },
  ],
];

// Shared themes - only search which all sites use
export const sharedThemes = [
  '@docusaurus/theme-live-codeblock',
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      indexBlog: false,
    },
  ],
];

// Common defaults that sites can override
export const commonDefaults: Partial<Config> = {
  future: {
    experimental_faster: false,
    v4: true,
  },
  favicon: 'img/favicon.ico',
  url: 'https://iflastandards.github.io',
  organizationName: 'iflastandards',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',
  markdown: {
    mermaid: true,
  },
  staticDirectories: ['static'],
};