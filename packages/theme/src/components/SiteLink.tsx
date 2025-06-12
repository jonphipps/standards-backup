// packages/theme/src/components/SiteLink.tsx
import React from 'react';
import { getSiteUrl, type SiteKey, type DocsEnv } from '../config/siteConfig';

export interface SiteLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The key of the target site (e.g., 'LRM', 'portal'). Must be a valid SiteKey.
   */
  toSite: SiteKey;
  /**
   * Optional. The relative path within the target site (e.g., '/introduction', 'docs/main', or '').
   * If it starts with '/', it's treated as absolute from the site's baseUrl root.
   * If empty, links to the site's base (url + baseUrl).
   * Defaults to an empty string, linking to the base of the target site.
   */
  path?: string;
  /**
   * Optional. The environment for which to generate the URL. 
   * Defaults to the current environment determined by `DOCS_ENV`.
   */
  targetEnv?: DocsEnv;
}

/**
 * A component for creating robust, environment-aware links between different IFLA Docusaurus sites.
 * It uses the centralized `siteConfig.ts` to generate correct absolute URLs based on the
 * `DOCS_ENV` environment variable (or an explicitly provided `targetEnv`).
 */
const SiteLink: React.FC<SiteLinkProps> = ({ 
  toSite,
  path = '', 
  targetEnv,
  children,
  ...anchorProps 
}) => {
  const href = getSiteUrl(toSite, path, targetEnv);

  return (
    <a href={href} {...anchorProps}>
      {children}
    </a>
  );
};

export default SiteLink;
