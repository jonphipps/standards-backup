import { sharedThemeConfig, sharedPlugins } from '@ifla/theme/config';

export default {
  title:   'IFLA Standards Portal',
  tagline: 'International Federation of Library Associations and Institutions',

  // You already had these arrays – keep them verbatim
  plugins: [ ...sharedPlugins ],

  themeConfig: {
    navbar: {
      items: [
        // ↳ the “Standards” dropdown you defined earlier
        {
          label: 'Standards',
          position: 'left',
          items: [
            {label: 'ISBDM', href: 'https://iflastandards.github.io/standards-dev/isbdm/'},
            {label: 'LRM',   href: 'https://iflastandards.github.io/standards-dev/lrm/' },
            // …etc.
          ],
        },
        { type: 'doc', docId: 'index', label: 'Documentation', position: 'left' },
        { to: '/blog',  label: 'Blog', position: 'left' },
        { to: '/manage', label: 'Management', position: 'left', className: 'navbar__item--management' },
        { href: 'https://github.com/iflastandards/standards-dev', label: 'GitHub', position: 'right' },
      ],
    },

    footer: {
      ...sharedThemeConfig.footer,
      links: [
        /* your current “More” links block */
        {
          title: 'More',
          items: [
            { label: 'Blog',          to: '/blog' },
            { label: 'Documentation', to: '/docs' },
          ],
        },
        ...sharedThemeConfig.footer.links,   // reuse the shared list
      ],
    },
  },
};
