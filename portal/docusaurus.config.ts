import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { 
  sharedThemeConfig, 
  sharedPlugins, 
  sharedThemes, 
  commonDefaults,
  siteUrls
} from '@ifla/theme/config';

const config: Config = {
  ...commonDefaults,
  
  title: 'IFLA Standards Portal',
  tagline: 'International Federation of Library Associations and Institutions',
  baseUrl: process.env.BASE_URL || '/',
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
          items: [
            {
              label: 'ISBDM',
              href: siteUrls.isbdm || '/ISBDM/',
            },
            {
              label: 'LRM',
              href: siteUrls.lrm || '/LRM/',
            },
            {
              label: 'FR',
              href: siteUrls.fr || '/fr/',
            },
            {
              label: 'ISBD',
              href: siteUrls.isbd || '/isbd/',
            },
            {
              label: 'MulDiCat',
              href: siteUrls.muldicat || '/muldicat/',
            },
            {
              label: 'UNIMARC',
              href: siteUrls.unimarc || '/unimarc/',
            },
          ],
        },
        {
          type: 'doc',
          docId: 'index',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/iflastandards/standards-dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    
    // Portal-specific footer
    footer: {
      ...sharedThemeConfig.footer,
      links: [
        {
          title: 'Standards',
          items: [
            {
              label: 'ISBDM',
              href: '/ISBDM/',
            },
            {
              label: 'LRM',
              href: '/LRM/',
            },
            {
              label: 'ISBD',
              href: '/isbd/',
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
