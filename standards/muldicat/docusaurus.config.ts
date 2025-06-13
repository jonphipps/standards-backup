import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {
  sharedPlugins,
  sharedThemes,
  commonDefaults,
  getSiteDocusaurusConfig,
  getCurrentEnv,
  type SiteKey,
  type DocsEnv
} from '@ifla/theme/config';

const siteKey: SiteKey = 'muldicat';
const currentEnv: DocsEnv = getCurrentEnv();
const currentSiteConfig = getSiteDocusaurusConfig(siteKey, currentEnv);

const config: Config = {
  ...commonDefaults(currentEnv),
  
  url: currentSiteConfig.url,
  title: 'MulDiCat: RDA to MARC21 and UNIMARC',
  tagline: 'MulDiCat: RDA to MARC21 and UNIMARC',
  baseUrl: currentSiteConfig.baseUrl,
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
    ...(commonDefaults(currentEnv).themeConfig as any),
    
    navbar: {
      ...(commonDefaults(currentEnv).themeConfig as any)?.navbar,
      title: 'MulDiCat: RDA to MARC21 and UNIMARC',
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
