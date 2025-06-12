import puppeteer from 'puppeteer';
import { getSiteUrl, sites, DocsEnv } from '../packages/theme/src/config/siteConfig.ts';

async function checkLinks(targetUrl, docsEnvValue) {
  const currentEnv = docsEnvValue;
  const portalSiteKey = 'portal';

  // Define links to check: { text: string (for logging), selector: string, toSite: SiteKey, path?: string }
  const linksToVerify = [
    // Navbar
    { text: 'Navbar Logo', selector: 'nav .navbar__brand', toSite: portalSiteKey, path: '/' },
    { text: 'Navbar ISBDM', selector: 'nav .navbar__items a.dropdown__link[href*="ISBDM"]', toSite: 'ISBDM' },
    { text: 'Navbar LRM', selector: 'nav .navbar__items a.dropdown__link[href*="LRM"]', toSite: 'LRM' },
    { text: 'Navbar FR', selector: 'nav .navbar__items a.dropdown__link[href*="fr"]', toSite: 'fr' },
    { text: 'Navbar ISBD', selector: 'nav .navbar__items a.dropdown__link[href*="isbd"]', toSite: 'isbd' },
    { text: 'Navbar Muldicat', selector: 'nav .navbar__items a.dropdown__link[href*="muldicat"]', toSite: 'muldicat' },
    { text: 'Navbar Unimarc', selector: 'nav .navbar__items a.dropdown__link[href*="unimarc"]', toSite: 'unimarc' },
    { text: 'Navbar Documentation', selector: 'nav .navbar__items a[href$="/docs/"]', toSite: portalSiteKey, path: '/docs/' },
    { text: 'Navbar Blog', selector: 'nav .navbar__items a[href$="/blog/"]', toSite: portalSiteKey, path: '/blog/' },
    { text: 'Navbar Management', selector: 'nav .navbar__items a[href$="/manage/"]', toSite: portalSiteKey, path: '/manage/' },

    // Hero section
    { text: 'Hero Explore Standards', selector: '.hero a.button[href$="/#standards"]', toSite: portalSiteKey, path: '/#standards' },
    { text: 'Hero Documentation', selector: '.hero .heroActions a.button.button--secondary', toSite: portalSiteKey, path: '/docs/' },

    // Footer Links (using expected href for more precise matching)
    // Note: getSiteUrl is called here to define the selector, assuming it's stable for the test run.
    { text: 'Footer ISBDM', selector: `footer a[href="${getSiteUrl('ISBDM', '', currentEnv)}"]`, toSite: 'ISBDM' },
    { text: 'Footer LRM', selector: `footer a[href="${getSiteUrl('LRM', '', currentEnv)}"]`, toSite: 'LRM' },
    { text: 'Footer Portal Blog', selector: `footer a[href="${getSiteUrl('portal', '/blog/', currentEnv)}"]`, toSite: 'portal', path: '/blog/' },
    { text: 'Footer Portal Docs', selector: `footer a[href="${getSiteUrl('portal', '/docs/', currentEnv)}"]`, toSite: 'portal', path: '/docs/' },
  ];

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  console.log(`Navigating to ${targetUrl} for DOCS_ENV=${currentEnv}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  let allTestsPassed = true;
  console.log(`\nVerifying links for environment: ${currentEnv}`);

  for (const link of linksToVerify) {
    const expectedHref = getSiteUrl(link.toSite, link.path || '', currentEnv);
    let actualHref = '';
    try {
      await page.waitForSelector(link.selector, { timeout: 5000 });
      actualHref = await page.$eval(link.selector, el => (el as HTMLAnchorElement).href);

      // Docusaurus's trailingSlash behavior means hrefs in the DOM might or might not have it.
      // The `trailingSlash` config for the current env is key.
      const expectTrailingSlash = currentEnv !== DocsEnv.Preview; // Based on portal/docusaurus.config.ts logic

      let normalizedActualHref = actualHref;
      const isAnchorLink = link.path?.includes('#') || actualHref.includes('#');
      const siteBaseUrl = sites[link.toSite]?.[currentEnv]?.baseUrl || '';

      if (expectTrailingSlash && !actualHref.endsWith('/') && !isAnchorLink && actualHref.startsWith(targetUrl)) {
        // Only add slash if it's a local link and not an anchor
        if (actualHref.substring(targetUrl.length-1).startsWith(siteBaseUrl.substring(0,siteBaseUrl.length-1))) { // check if it's part of the current site's base URL structure
             normalizedActualHref = actualHref + '/';
        }
      } else if (!expectTrailingSlash && actualHref.endsWith('/') && !isAnchorLink) {
        normalizedActualHref = actualHref.slice(0, -1);
      }
      
      // If expectedHref is just a base URL (e.g. https://iflastandards.info/) and actual is (https://iflastandards.info/)
      if (expectedHref.endsWith('/') && !normalizedActualHref.endsWith('/') && normalizedActualHref === expectedHref.slice(0,-1)) {
        normalizedActualHref += '/';
      } else if (!expectedHref.endsWith('/') && normalizedActualHref.endsWith('/') && normalizedActualHref.slice(0,-1) === expectedHref) {
        normalizedActualHref = normalizedActualHref.slice(0,-1);
      }

      if (normalizedActualHref === expectedHref) {
        console.log(`  ✅ PASS: ${link.text} -> ${expectedHref}`);
      } else {
        console.error(`  ❌ FAIL: ${link.text}`);
        console.error(`     Expected: ${expectedHref}`);
        console.error(`     Actual:   ${actualHref} (Normalized: ${normalizedActualHref})`);
        allTestsPassed = false;
      }
    } catch (e) {
      console.error(`  ❌ ERROR: For "${link.text}", selector "${link.selector}" not found or other error. ${e.message}`);
      allTestsPassed = false;
    }
  }

  await browser.close();
  return allTestsPassed;
}

// Main execution
const targetUrlArg = process.argv[2];
const docsEnvArg = process.argv[3] as DocsEnv;

if (!targetUrlArg || !docsEnvArg || !Object.values(DocsEnv).includes(docsEnvArg)) {
  console.error('Usage: node check-portal-homepage-links.mjs <targetUrl> <docsEnv>');
  console.error('docsEnv must be one of:', Object.values(DocsEnv).join(', '));
  process.exit(1);
}

checkLinks(targetUrlArg, docsEnvArg)
  .then(success => {
    if (success) {
      console.log('\nAll homepage link checks passed!');
      process.exit(0);
    } else {
      console.error('\nSome homepage link checks failed.');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Error during link checking:', err);
    process.exit(1);
  });
