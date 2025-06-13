import type { Config } from '@docusaurus/types';
import {
  DocsEnv,
  type SiteKey,
  getSiteDocusaurusConfig,
  getCurrentEnv,
  commonDefaults,
  standardsDropdown,
  sharedFooterSiteLinks
} from '@ifla/theme/config';
import { themes as prismThemes } from 'prism-react-renderer';

const siteKey: SiteKey = 'portal';
const currentEnv = getCurrentEnv();
const { url, baseUrl } = getSiteDocusaurusConfig(siteKey, currentEnv);

const config: Config = {
  ...commonDefaults(currentEnv),
  url,
  title: 'IFLA Standards Portal',
  tagline: 'International Federation of Library Associations and Institutions',
  baseUrl,
  projectName: 'standards-portal',
  staticDirectories: ['static', '../packages/theme/static'],
  trailingSlash: currentEnv === DocsEnv.Preview ? false : commonDefaults(currentEnv).trailingSlash,
  onBrokenAnchors: 'ignore', // Changed from default 'warn'

  customFields: {
    docsEnv: currentEnv,
  },

  // Portal-specific i18n
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/iflastandards/standards-dev/tree/main/portal/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/iflastandards/standards-dev/tree/main/portal/',
        },
        theme: {
          customCss: [
            require.resolve('@ifla/theme/styles.css'),
            require.resolve('./src/css/custom.css'),
          ],
        },
      } satisfies import('@docusaurus/preset-classic').Options,
    ],
  ],

  themeConfig: {
    ...commonDefaults(currentEnv).themeConfig,
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'IFLA Standards Portal',
      logo: {
        alt: 'IFLA Logo',
        src: 'img/logo-ifla_black.png',
        srcDark: 'img/logo-ifla_black.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        standardsDropdown(currentEnv),
        {
          href: 'https://github.com/iflastandards/standards-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // Footer is now inherited from commonDefaults(currentEnv).themeConfig
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies import('@docusaurus/preset-classic').ThemeConfig,
};

export default config;
