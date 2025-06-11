// packages/theme/config/preset-ifla.ts
import { themes as prismThemes } from 'prism-react-renderer';
import filterIndexMdx from './filterIndexMdx';

/**
 * Centralized shared docs options for @docusaurus/preset-classic.
 */
export const sharedDocs = {
  // path: 'docs', // optional
  sidebarItemsGenerator: async function (generatorArgs: any) {
    const { defaultSidebarItemsGenerator } = generatorArgs;
    const items = await defaultSidebarItemsGenerator(generatorArgs);
    return filterIndexMdx(items);
  },
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
  remarkPlugins: [],
};

/**
 * Centralized shared theme options for @docusaurus/preset-classic.
 */
export const sharedTheme = {
  customCss: require.resolve('./styles/global.css'),
  colorMode: {
    defaultMode: 'light',
    respectPrefersColorScheme: true,
  },
  prism: {
    theme: prismThemes.github,
    darkTheme: prismThemes.dracula,
  },
};
