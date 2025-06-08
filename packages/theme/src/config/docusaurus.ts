import { themes as prismThemes } from 'prism-react-renderer';

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
  // Standard social card
  image: 'img/docusaurus-social-card.jpg',
};

// Shared plugins - only truly universal ones
export const sharedPlugins = [
  'docusaurus-plugin-sass',
];

// Shared themes - only search which all sites use
export const sharedThemes = [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      indexBlog: false,
    },
  ],
];

// Common defaults that sites can override
export const commonDefaults = {
  future: {
    experimental_faster: false,
    v4: true,
  },
  favicon: 'img/favicon.ico',
  url: 'https://iflastandards.github.io',
  organizationName: 'iflastandards',
  onBrokenLinks: 'warn' as const,
  onBrokenMarkdownLinks: 'warn' as const,
};