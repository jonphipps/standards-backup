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
  
  console.log('[useDocsEnv] hook called.');
  console.log('[useDocsEnv] siteConfig.customFields:', JSON.stringify(siteConfig?.customFields));
  
  const customDocsEnv = siteConfig?.customFields?.docsEnv;
  console.log('[useDocsEnv] siteConfig.customFields.docsEnv raw value:', JSON.stringify(customDocsEnv));
  console.log('[useDocsEnv] typeof siteConfig.customFields.docsEnv:', typeof customDocsEnv);

  if (customDocsEnv && typeof customDocsEnv === 'string') {
    // Ensure it's a valid DocsEnv value, though type assertion is used here.
    // For stricter checking, you could compare against DocsEnv enum values.
    const envToReturn = customDocsEnv as DocsEnv;
    console.log('[useDocsEnv] Returning from customFields.docsEnv:', envToReturn, '(type:', typeof envToReturn + ')');
    return envToReturn;
  }

  console.warn('[useDocsEnv] docsEnv not found in siteConfig.customFields or is not a valid string. Defaulting to DocsEnv.Production.');
  const fallbackEnv = 'production' as DocsEnv;
  console.log('[useDocsEnv] Returning fallback:', fallbackEnv, '(type:', typeof fallbackEnv + ')');
  return fallbackEnv; 
}
