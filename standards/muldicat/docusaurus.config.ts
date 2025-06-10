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
  
  title: 'IFLA MULDICAT',
  tagline: 'Multilingual Dictionary of Cataloguing Terms',
  baseUrl: '/muldicat/',
  projectName: 'muldicat',

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

  // Site-specific plugins (shared ones and redirects)
  plugins: [
    ...sharedPlugins,
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [],
        createRedirects(existingPath) {
          return undefined;
        },
      },
    ],
  ],

  // Site-specific presets
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/iflastandards/muldicat/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/iflastandards/muldicat/tree/main/',
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
    
    navbar: {
      ...sharedThemeConfig.navbar,
      title: 'IFLA MULDICAT',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Introduction',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
