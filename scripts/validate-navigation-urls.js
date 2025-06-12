#!/usr/bin/env node

const { getCurrentEnv } = require('../packages/theme/dist/config/siteConfig.server');
const { getSiteUrl } = require('../packages/theme/dist/config/siteConfig');
const { standardsDropdown, sharedFooterSiteLinks } = require('../packages/theme/dist/config/docusaurus');

/**
 * Validates that navigation URLs are correctly configured for the current environment.
 * For non-localhost environments, URLs will appear "broken" locally but should match
 * the expected deployment URLs.
 */

const EXPECTED_PATTERNS = {
  localhost: {
    portal: /^http:\/\/localhost:3000\/portal\//,
    ISBDM: /^http:\/\/localhost:3001\/ISBDM\//,
    LRM: /^http:\/\/localhost:3002\/LRM\//,
    fr: /^http:\/\/localhost:3003\/fr\//,
    isbd: /^http:\/\/localhost:3004\/isbd\//,
    muldicat: /^http:\/\/localhost:3005\/muldicat\//,
    unimarc: /^http:\/\/localhost:3006\/unimarc\//
  },
  preview: {
    portal: /^https:\/\/iflastandards\.github\.io\/standards-dev\/portal\//,
    ISBDM: /^https:\/\/iflastandards\.github\.io\/standards-dev\/ISBDM\//,
    LRM: /^https:\/\/iflastandards\.github\.io\/standards-dev\/LRM\//,
    fr: /^https:\/\/iflastandards\.github\.io\/standards-dev\/fr\//,
    isbd: /^https:\/\/iflastandards\.github\.io\/standards-dev\/isbd\//,
    muldicat: /^https:\/\/iflastandards\.github\.io\/standards-dev\/muldicat\//,
    unimarc: /^https:\/\/iflastandards\.github\.io\/standards-dev\/unimarc\//
  },
  production: {
    portal: /^https:\/\/iflastandards\.info\/portal\//,
    ISBDM: /^https:\/\/iflastandards\.info\/ISBDM\//,
    LRM: /^https:\/\/iflastandards\.info\/LRM\//,
    fr: /^https:\/\/iflastandards\.info\/fr\//,
    isbd: /^https:\/\/iflastandards\.info\/isbd\//,
    muldicat: /^https:\/\/iflastandards\.info\/muldicat\//,
    unimarc: /^https:\/\/iflastandards\.info\/unimarc\//
  }
};

function validateNavigationUrls() {
  console.log('\n🧭 Validating Navigation URL Configuration...');
  
  const env = getCurrentEnv();
  console.log(`📍 Current Environment: ${env}`);
  
  const expectedPatterns = EXPECTED_PATTERNS[env];
  if (!expectedPatterns) {
    console.error(`❌ No URL patterns defined for environment: ${env}`);
    process.exit(1);
  }
  
  console.log(`🎯 Expected URL patterns for ${env}:`);
  Object.entries(expectedPatterns).forEach(([site, pattern]) => {
    console.log(`   ${site}: ${pattern.source}`);
  });
  
  const issues = [];
  
  // Test standards dropdown URLs
  console.log('\n🔍 Testing Standards Dropdown URLs...');
  const dropdown = standardsDropdown(env);
  dropdown.items.forEach(item => {
    const url = item.href;
    console.log(`  Testing: ${item.label} -> ${url}`);
    
    // Find which site this should match
    const matchingSite = Object.entries(expectedPatterns).find(([site, pattern]) => {
      // Create a test URL to see which pattern it should match
      const testUrl = getSiteUrl(site, '/', env);
      return url.startsWith(testUrl.split('/').slice(0, -1).join('/'));
    });
    
    if (matchingSite) {
      const [site, pattern] = matchingSite;
      if (!pattern.test(url)) {
        issues.push({
          type: 'Standards Dropdown',
          label: item.label,
          url,
          expected: pattern.source,
          site
        });
      }
    } else {
      // Check if it matches any pattern
      const anyMatch = Object.entries(expectedPatterns).some(([, pattern]) => pattern.test(url));
      if (!anyMatch) {
        issues.push({
          type: 'Standards Dropdown',
          label: item.label,
          url,
          expected: 'Any valid site pattern',
          site: 'unknown'
        });
      }
    }
  });
  
  // Test footer site links
  console.log('\n🔍 Testing Footer Site Links...');
  const footerLinks = sharedFooterSiteLinks(env);
  footerLinks.forEach(link => {
    const url = link.href;
    console.log(`  Testing: ${link.label} -> ${url}`);
    
    // Similar validation for footer links
    const anyMatch = Object.entries(expectedPatterns).some(([, pattern]) => pattern.test(url));
    if (!anyMatch && url.startsWith('http')) { // Only check full URLs
      issues.push({
        type: 'Footer Link',
        label: link.label,
        url,
        expected: 'Valid site pattern',
        site: 'unknown'
      });
    }
  });
  
  // Test individual getSiteUrl calls
  console.log('\n🔍 Testing getSiteUrl Function...');
  Object.keys(expectedPatterns).forEach(site => {
    const testPaths = ['/', '/docs/intro', '/blog'];
    testPaths.forEach(path => {
      const url = getSiteUrl(site, path, env);
      const pattern = expectedPatterns[site];
      
      console.log(`  Testing: getSiteUrl('${site}', '${path}', '${env}') -> ${url}`);
      
      if (!pattern.test(url)) {
        issues.push({
          type: 'getSiteUrl Function',
          label: `${site}${path}`,
          url,
          expected: pattern.source,
          site
        });
      }
    });
  });
  
  // Report results
  if (issues.length > 0) {
    console.error(`\n❌ Found ${issues.length} navigation URL configuration issues:`);
    
    issues.forEach((issue, i) => {
      console.error(`\n  ${i + 1}. ${issue.type}: "${issue.label}"`);
      console.error(`     Generated URL: ${issue.url}`);
      console.error(`     Expected pattern: ${issue.expected}`);
      console.error(`     Site: ${issue.site}`);
    });
    
    console.error(`\n💡 These URLs may work when deployed to ${env} environment`);
    console.error(`   but indicate configuration issues that should be fixed.`);
    
    process.exit(1);
  } else {
    console.log(`\n✅ All navigation URLs are correctly configured for ${env} environment!`);
    
    if (env !== 'localhost') {
      console.log(`\n📝 Note: URLs point to ${env} environment and will appear broken`);
      console.log(`    when tested locally, but should work when deployed.`);
    }
  }
}

// Test function for manual verification
function showNavigationUrls() {
  const env = getCurrentEnv();
  console.log(`\n📋 Navigation URLs for ${env} environment:\n`);
  
  console.log('🔗 Standards Dropdown:');
  const dropdown = standardsDropdown(env);
  dropdown.items.forEach(item => {
    console.log(`   ${item.label}: ${item.href}`);
  });
  
  console.log('\n🔗 Footer Site Links:');
  const footerLinks = sharedFooterSiteLinks(env);
  footerLinks.forEach(link => {
    console.log(`   ${link.label}: ${link.href}`);
  });
  
  console.log('\n🔗 Sample getSiteUrl calls:');
  ['portal', 'ISBDM', 'LRM'].forEach(site => {
    console.log(`   ${site}/: ${getSiteUrl(site, '/', env)}`);
    console.log(`   ${site}/docs/intro: ${getSiteUrl(site, '/docs/intro', env)}`);
  });
}

if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'show') {
    showNavigationUrls();
  } else {
    validateNavigationUrls();
  }
}

module.exports = { validateNavigationUrls, showNavigationUrls };