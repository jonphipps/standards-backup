/// <reference types="react" />

// packages/theme/src/components/SiteLink.tsx
import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import { useDocsEnv } from '../hooks/useDocsEnv';
import { getSiteUrl, type SiteKey, type DocsEnv } from '../config';

/**
 * A component for creating robust, environment-aware links between different IFLA Docusaurus sites.
 * It uses the centralized `siteConfig.ts` to generate correct absolute URLs based on the
 * `DOCS_ENV` environment variable (or an explicitly provided `targetEnv`).
 */
interface SiteLinkProps extends Omit<React.ComponentProps<typeof Link>, 'href' | 'to'> {
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
  to: string;
  /**
   * Optional. The target environment.
   */
  toEnv?: DocsEnv;
  /**
   * The content of the link.
   */
  children?: React.ReactNode;
  /**
   * Optional. The CSS class name for the link element.
   */
  className?: string;
}

const SiteLink = ({ to, toSite, toEnv, children, className }: SiteLinkProps): JSX.Element => {
  const currentSiteEnv = useDocsEnv();

  const targetEnv = toEnv || currentSiteEnv;
  const finalUrl = getSiteUrl(toSite, to, targetEnv);
  
  return (
    <Link href={finalUrl} className={className}>
      {children}
    </Link>
  );
}

export default SiteLink;
