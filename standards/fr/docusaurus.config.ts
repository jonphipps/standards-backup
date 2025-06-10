import '@ifla/theme/config/envLoader'; // Loads .env.local from root

import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { 
  sharedThemeConfig, 
  sharedPlugins, 
  sharedThemes, 
  commonDefaults 
} from '@ifla/theme/config';

const config: Config = {
  ...commonDefaults,
  
  title: 'IFLA FR',
  tagline: 'Functional Requirements',
  url: 'https://iflastandards.github.io',
  baseUrl: '/FR/',
  projectName: 'FR',

  customFields: {
    vocabularyDefaults: {
      prefix: "ifla",
      startCounter: 1000,
      uriStyle: "numeric",
      numberPrefix: "T",
      caseStyle: "kebab-case",
      showFilter: true,
      filterPlaceholder: "Filter vocabulary terms...",
      showTitle: false,
      showURIs: true,
      showCSVErrors: false,
      profile: "vocabulary-profile.csv",
      profileShapeId: "Concept",
      RDF: {
        "rdf:type": ["skos:ConceptScheme"]
      },
      elementDefaults: {
        uri: "https://www.iflastandards.info/elements",
        classPrefix: "C",
        propertyPrefix: "P",
        profile: "elements-profile.csv",
        profileShapeId: "Element",
      }
    }
  },

  // Site-specific i18n
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
    },
  },

  // Site-specific plugins (shared ones)
  plugins: [
    ...sharedPlugins,
  ],

  // Site-specific presets
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/iflastandards/FR/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          versions: {
            current: {
              label: 'Latest',
              path: '',
            },
          },
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/iflastandards/FR/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Shared themes
  themes: sharedThemes,

  // Site-specific theme config with shared elements
  themeConfig: {
    ...sharedThemeConfig,
    
    // Site-specific docs config
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
      versionPersistence: 'localStorage',
    },
    
    // Site-specific navbar
    navbar: {
      ...sharedThemeConfig.navbar,
      title: 'FR',
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'index',
          label: 'Documentation',
        },
        {
          label: 'Resources',
          position: 'right',
          type: 'dropdown',
          items: [
            {
              label: 'RDF Downloads',
              href: './rdf/',
            },
            {
              label: 'Vocabulary Server',
              href: 'https://iflastandards.info/',
            },
            {
              label: 'IFLA Website',
              href: 'https://www.ifla.org/',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/iflastandards/standards-dev',
              'aria-label': 'GitHub repository',
            },
            {
              label: 'Portal',
              href: process.env.NODE_ENV === 'production' ? '../portal/' : '/portal/',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    
    // Site-specific footer
    footer: {
      style: 'dark' as const,
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        ...(sharedThemeConfig.footer.links || []),
      ],
      copyright: sharedThemeConfig.footer.copyright,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
