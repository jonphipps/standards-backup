/**
 * Server-side configuration that requires Node.js modules
 * This file should only be imported in server-side code (e.g., docusaurus.config.ts)
 * Do not import this file in React components or browser-side code
 */
import dotenv from 'dotenv'; 
dotenv.config();

// Site URLs loaded from environment variables (server-side only)
export const siteUrls = {
  portal: process.env.PORTAL_URL,
  isbdm: process.env.ISBDM_URL,
  lrm: process.env.LRM_URL,
  fr: process.env.FR_URL,
  isbd: process.env.ISBD_URL,
  muldicat: process.env.MULDICAT_URL,
  unimarc: process.env.UNIMARC_URL,
};
    style: 'dark',
    links: [
      {
        title: 'Community',
        items: [
          {
            label: 'IFLA',
            href: 'https://www.ifla.org/',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/iflastandards/standards-dev',
          },
        ],
      },
      {
        title: 'Resources',
        items: [
          {
            label: 'Vocabulary Server',
            href: 'https://iflastandards.info/',
          },
          {
            label: 'Portal',
            href: '/portal/',
          },
        ],
      },
    ],
    copyright: `
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <span>Copyright © ${new Date().getFullYear()} International Federation of Library Associations and Institutions (IFLA).</span>
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
          <img src="/img/cc0_by.png" alt="Badge for Creative Commons Attribution 4.0 International license" style="height: 20px;" />
        </a>
      </div>
    `,
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
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  onDuplicateRoutes: 'warn',
  markdown: {
    mermaid: true,
  },
  staticDirectories: ['static', '../../packages/theme/static'],
};
