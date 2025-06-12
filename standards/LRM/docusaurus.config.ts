import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {
  sharedThemeConfig,
  sharedPlugins,
  sharedThemes,
  commonDefaults,
  getSiteDocusaurusConfig, // Import from main config barrel
  getCurrentEnv,           // Import getCurrentEnv
  type SiteKey,             // Import SiteKey type
  type DocsEnv              // Import DocsEnv type
} from '@ifla/theme/config';

const siteKey: SiteKey = 'LRM';
const currentEnv: DocsEnv = getCurrentEnv();
const currentSiteConfig = getSiteDocusaurusConfig(siteKey, currentEnv);

const config: Config = {
  ...commonDefaults,
  url: currentSiteConfig.url,
  title: 'IFLA LRM',
  tagline: 'Library Reference Model',
  baseUrl: currentSiteConfig.baseUrl,
  projectName: 'LRM',

  customFields: {
    vocabularyDefaults: {
      prefix: "lrm",
      startCounter: 1000,
      uriStyle: "numeric",
      numberPrefix: "E",
      caseStyle: "kebab-case",
      showFilter: true,
      filterPlaceholder: "Filter vocabulary terms...",
      showTitle: false,
      showURIs: true,
      showCSVErrors: false,
      profile: "lrm-values-profile.csv",
      profileShapeId: "Concept",
      RDF: {
        "rdf:type": ["skos:ConceptScheme"]
      },
      elementDefaults: {
        uri: "https://www.iflastandards.info/LRM/elements",
        classPrefix: "C",
        propertyPrefix: "P",
        profile: "lrm-elements-profile.csv",
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
          onBrokenLinks: 'warn', // Warns on broken links
          onBrokenAnchors: 'warn', // Warns on broken anchors
          editUrl: 'https://github.com/iflastandards/LRM/tree/main/',
        },
        blog: {
          showReadingTime: true,
          onBrokenLinks: 'throw',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/iflastandards/LRM/tree/main/',
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
      title: 'IFLA LRM',
      items: [
        {
          type: 'doc',
          docId: 'intro/intro',
          position: 'left',
          label: 'Introduction',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
