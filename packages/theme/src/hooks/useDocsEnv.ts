import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { DocsEnv } from '../config';

/**
 * Hook to get the current documentation environment (DocsEnv string).
 * Reads from siteConfig.customFields.docsEnv.
 *
 * @returns {DocsEnv} The current documentation environment string.
 */
export function useDocsEnv(): DocsEnv {
  const { siteConfig } = useDocusaurusContext();
  
  const customDocsEnv = siteConfig?.customFields?.docsEnv;

  if (customDocsEnv && typeof customDocsEnv === 'string') {
    // Ensure it's a valid DocsEnv value, though type assertion is used here.
    // For stricter checking, you could compare against DocsEnv enum values.
    return customDocsEnv as DocsEnv;
  }

  return 'production' as DocsEnv; 
}
