import '@ifla/theme/config/envLoader'; // Loads .env.local from root
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import { 
  sharedThemeConfig, 
  sharedPlugins, 
  sharedThemes, 
  commonDefaults,
} from '@ifla/theme/config';
import { siteURLs } from '@ifla/theme/config/siteURLs';

const standardsDropdown = [
  { label: 'ISBDM', href: siteURLs.ISBDM },
  { label: 'LRM', href: siteURLs.LRM },
  { label: 'FR', href: siteURLs.FR },
  { label: 'ISBD', href: siteURLs.ISBD },
  { label: 'MULDICAT', href: siteURLs.MULDICAT },
  { label: 'UNIMARC', href: siteURLs.UNIMARC },
];

const config: Config = {
  ...commonDefaults,
  url: process.env.DOCUSAURUS_URL || 'http://localhost:3000',
  
  title: 'IFLA Standards Portal',
  tagline: 'International Federation of Library Associations and Institutions',
  baseUrl: '/',
  projectName: 'standards-portal',
  staticDirectories: ['static', '../packages/theme/static'],

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
      style: sharedThemeConfig.footer.style,
      copyright: sharedThemeConfig.footer.copyright,
      links: [
        {
          title: 'Standards',
          items: [
            {
              label: 'ISBDM',
              href: siteURLs.ISBDM,
            },
            {
              label: 'LRM',
              href: siteURLs.LRM,
            },
            {
              label: 'ISBD',
              href: siteURLs.ISBD,
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
