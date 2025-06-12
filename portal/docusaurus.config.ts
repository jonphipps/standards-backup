import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import {
  sharedThemeConfig,
  sharedPlugins,
  sharedThemes,
  commonDefaults,
} from '@ifla/theme/config';
import {
  getSiteDocusaurusConfig,
  getSiteUrl,
  type SiteKey,
  getCurrentEnv,
  DocsEnv,
} from '@ifla/theme/config/siteConfig';

const currentSiteConfig = getSiteDocusaurusConfig('portal');
const currentEnv = getCurrentEnv();

const standardsDropdown = [
  { label: 'ISBDM', href: getSiteUrl('ISBDM' as SiteKey) },
  { label: 'LRM', href: getSiteUrl('LRM' as SiteKey) },
  { label: 'FR', href: getSiteUrl('fr' as SiteKey) }, // Assuming 'fr' is the SiteKey for 'FR'
  { label: 'ISBD', href: getSiteUrl('isbd' as SiteKey) }, // Assuming 'isbd' is the SiteKey for 'ISBD'
  { label: 'MULDICAT', href: getSiteUrl('muldicat' as SiteKey) },
  { label: 'UNIMARC', href: getSiteUrl('unimarc' as SiteKey) },
];

const config: Config = {
  ...commonDefaults,
  url: currentSiteConfig.url,
  title: 'IFLA Standards Portal',
  tagline: 'International Federation of Library Associations and Institutions',
  baseUrl: currentSiteConfig.baseUrl,
  projectName: 'standards-portal',
  staticDirectories: ['static', '../packages/theme/static'],
  trailingSlash: currentEnv === DocsEnv.Preview ? false : true,
  onBrokenAnchors: 'log', // Changed from default 'warn'

  // Portal-specific i18n
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
    },
  },

  // Portal-specific plugins
  plugins: [
    ...sharedPlugins,
  ],

  // Portal-specific presets
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/portal/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/iflastandards/standards-dev/tree/main/portal/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Shared themes
  themes: sharedThemes,

  // Portal-specific theme config
  themeConfig: {
    ...sharedThemeConfig,
    
    // Portal-specific navbar
    navbar: {
      ...sharedThemeConfig.navbar,
      title: 'IFLA Standards',
      items: [
        {
          type: 'dropdown',
          label: 'Standards',
          position: 'left',
          items: standardsDropdown,
        },
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: '/manage',
          label: 'Management',
          position: 'left',
          className: 'navbar__item--management',
        },
        {
          href: 'https://github.com/iflastandards/standards-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    
    // Portal-specific footer
    footer: {
      style: sharedThemeConfig.footer.style as 'light' | 'dark' | undefined,
      copyright: sharedThemeConfig.footer.copyright,
      links: [
        {
          title: 'Standards',
          items: [
            {
              label: 'ISBDM',
              href: getSiteUrl('ISBDM' as SiteKey),
            },
            {
              label: 'LRM',
              href: getSiteUrl('LRM' as SiteKey),
            },
            {
              label: 'ISBD',
              href: getSiteUrl('isbd' as SiteKey),
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Documentation',
              to: '/docs',
            },
          ],
        },
        ...sharedThemeConfig.footer.links,
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
