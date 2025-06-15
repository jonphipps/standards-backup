# URL Validation Guide for IFLA Standards

## Quick Reference

### 🎯 **What to Test When**

| Scenario | Script | Purpose |
|----------|---------|---------|
| **Development** | `validate:site-links` | Test dev servers (localhost:300X) |
| **Built Sites** | `validate:built-site` | Test static builds for 404s |
| **URL Configuration** | `validate:env-urls` | Check URL/baseURL correctness |
| **Navigation Only** | `validate:navigation` | Quick nav link check |

### 🚀 **Quick Commands**

```bash
# Interactive mode (prompts for all options) - RECOMMENDED
pnpm run validate:built-site
pnpm run validate:env-urls

# Command line mode (specify all options)
pnpm run validate:built-site -- --site ISBDM --port 3001
pnpm run validate:env-urls -- --env preview --site portal --type static

# Test all localhost sites comprehensively
pnpm run validate:env-urls -- --env localhost --site all --type both
```

### 🎮 **Interactive Mode Features**
- **Smart prompts**: Only asks for missing options
- **Helpful descriptions**: Each choice explains what it does
- **Context-aware defaults**: Different defaults based on environment
- **Validation**: Prevents invalid inputs
- **No more memorizing**: Just run the script and follow prompts!

## 🏗️ **Three Testing Environments**

### 1. **localhost** (Development/Testing)
- **URL**: `http://localhost:300X`
- **baseURL**: `/SITENAME/` or `/portal/`
- **When**: Local development and testing built sites
- **Can test**: Everything (navigation + generated content)

### 2. **preview** (GitHub Pages Staging)
- **URL**: `https://iflastandards.github.io`
- **baseURL**: `/standards-dev/SITENAME/`
- **When**: Testing deployment before production
- **Can test**: URL patterns, navigation (generated content limited)

### 3. **production** (Live Site)
- **URL**: `https://iflastandards.info`
- **baseURL**: `/SITENAME/`
- **When**: Final verification and spot checks
- **Can test**: URL patterns, navigation (generated content limited)

## 📋 **Testing Scenarios**

### **Scenario 1: I'm developing and want to check for broken links**

```bash
# Option A: Test development server
pnpm run start:all  # Start all dev servers
pnpm run validate:site-links --site ISBDM

# Option B: Test built site (recommended)
pnpm build-env --env localhost --site ISBDM
cd standards/ISBDM && pnpm run serve --port 3001
pnpm run validate:built-site -- --site ISBDM --port 3001 --include-generated
```

### **Scenario 2: I see hardcoded localhost URLs in production**

```bash
# Check for hardcoded localhost URLs in any environment
pnpm run validate:env-urls -- --env preview --site ISBDM --type generated

# Check all sites for localhost leaks
pnpm run validate:env-urls -- --env production --site all --type static
```

### **Scenario 3: I want to verify URL/baseURL configuration**

```bash
# Test specific site in specific environment
pnpm run validate:env-urls -- --env preview --site portal --type static

# Spot check all sites in production
pnpm run validate:env-urls -- --env production --site all --type static
```

### **Scenario 4: Comprehensive testing before deployment**

```bash
# 1. Build for target environment
pnpm build-env --env preview --site all

# 2. Test URL configuration (no need to serve)
pnpm run validate:env-urls -- --env preview --site all --type static

# 3. Test localhost builds for generated content issues
pnpm build-env --env localhost --site all
# Serve each site manually, then:
pnpm run validate:env-urls -- --env localhost --site all --type both
```

## 🛠️ **Available Scripts**

### **1. validate:site-links** (Development servers)
```bash
# Test development servers (pnpm start:all)
pnpm run validate:site-links --site ISBDM --timeout 10000 --max-links 50
```
- **Tests**: Development servers
- **Finds**: Navigation issues, basic 404s
- **Ignores**: Generated element links (use patterns)

### **2. validate:built-site** (Built static sites)
```bash
# Test built sites served locally
pnpm run validate:built-site -- --site ISBDM --port 3001 --include-generated
pnpm run validate:built-site -- --site all --port 3000 --continue-on-error
```
- **Tests**: Static build output
- **Finds**: All 404s including generated content
- **Requires**: Built site + local serving

### **3. validate:env-urls** (URL configuration)
```bash
# Check URL patterns and configuration
pnpm run validate:env-urls -- --env preview --site portal --type static
pnpm run validate:env-urls -- --env localhost --site ISBDM --type both
```
- **Tests**: URL/baseURL correctness
- **Finds**: Hardcoded localhost, wrong URL patterns
- **Types**: `static` (nav), `generated` (content), `both`

### **4. validate:navigation** (Quick nav check)
```bash
# Quick navigation URL validation
pnpm run validate:navigation
```
- **Tests**: Navigation URL generation
- **Finds**: URL pattern mismatches
- **Fast**: Configuration-only, no actual requests

## 🎛️ **Script Options**

### **Common Options**
- `--timeout <ms>`: Request timeout (default varies)
- `--site <site>`: Single site, comma-separated, or "all"
- `--continue-on-error`: Keep testing even if one site fails

### **validate:built-site Options**
- `--port <port>`: Starting port number
- `--include-generated`: Test generated element/vocab links
- `--max-links <number>`: Limit links tested per site

### **validate:env-urls Options**
- `--env <env>`: Environment (localhost, preview, production)
- `--type <type>`: Test type (static, generated, both)
- `--sample-size <number>`: Generated links to test in remote envs

## 🔍 **Understanding Test Results**

### **Priority Levels**
- **CRITICAL**: Hardcoded localhost in non-localhost environments
- **HIGH**: Navigation broken links, URL pattern mismatches
- **MEDIUM**: Content link issues, generated link problems
- **LOW**: Non-critical issues

### **Issue Types**
- **URL_MISMATCH**: Wrong base URL or pattern
- **BROKEN_LINK**: 404 or connection error
- **HARDCODED_LOCALHOST**: localhost URLs in wrong environment
- **LOAD_ERROR**: Timeout or network issue

## 📝 **Workflows**

### **Daily Development Workflow**
```bash
# Quick development testing
pnpm run validate:site-links --site ISBDM

# Thorough testing of changes
pnpm build-env --env localhost --site ISBDM
cd standards/ISBDM && pnpm run serve --port 3001
pnpm run validate:built-site -- --site ISBDM --port 3001
```

### **Pre-Deployment Workflow**
```bash
# 1. Test localhost builds thoroughly
pnpm build-env --env localhost --site all
pnpm run validate:env-urls -- --env localhost --site all --type both

# 2. Test target environment URL configuration
pnpm build-env --env preview --site all
pnpm run validate:env-urls -- --env preview --site all --type static

# 3. Spot check production URLs
pnpm run validate:env-urls -- --env production --site all --type static
```

### **Troubleshooting Workflow**
```bash
# If seeing hardcoded localhost in production:
pnpm run validate:env-urls -- --env production --site ISBDM --type generated

# If navigation broken:
pnpm run validate:navigation
pnpm run validate:env-urls -- --env localhost --site ISBDM --type static

# If generated content broken:
pnpm run validate:built-site -- --site ISBDM --port 3001 --include-generated
```

## 🚨 **Common Issues & Solutions**

### **"0 internal links found" or slow page loads (5+ seconds)**
- **Cause**: Page loading errors, JavaScript crashes, or empty content
- **Fix**: Check if site is properly built and served
- **Enhanced Detection**: The validator now detects:
  - React error boundaries and component crashes
  - 404/Not Found pages
  - Docusaurus build errors
  - Empty main content areas
  - JavaScript console errors
- **Test**: `validate:env-urls --env localhost --type comprehensive`

### **"Hardcoded localhost URLs detected"**
- **Cause**: Components generating localhost URLs in non-localhost builds
- **Fix**: Check component logic using `useDocsEnv()` hook
- **Test**: `validate:env-urls --env preview --type generated`

### **"URL pattern mismatch"**
- **Cause**: Wrong baseURL or URL in site configuration
- **Fix**: Check `docusaurus.config.ts` environment handling
- **Test**: `validate:env-urls --env preview --type static`

### **"Build directory not found"**
- **Cause**: Site not built for target environment
- **Fix**: `pnpm build-env --env localhost --site SITENAME`
- **Test**: After building, try validation again

### **"Site not accessible"**
- **Cause**: Built site not being served
- **Fix**: `cd standards/SITENAME && pnpm run serve --port 300X`
- **Test**: Check port number matches site configuration

### **"Page load errors detected"**
- **Cause**: JavaScript errors, React crashes, or build issues
- **Enhanced Reporting**: The validator now shows:
  - Specific error messages from the page
  - Load times for problematic pages
  - Content availability status
- **Fix**: Check browser console for errors, rebuild site if necessary

## 🔧 **Environment Variables**

The scripts use these environment configurations:

```javascript
// From packages/theme/src/config/siteConfigCore.ts
sites = {
  portal: {
    localhost: { url: 'http://localhost:3000', baseUrl: '/portal/', port: 3000 },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/portal/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/portal/' }
  },
  ISBDM: {
    localhost: { url: 'http://localhost:3001', baseUrl: '/ISBDM/', port: 3001 },
    preview: { url: 'https://iflastandards.github.io', baseUrl: '/standards-dev/ISBDM/' },
    production: { url: 'https://iflastandards.info', baseUrl: '/ISBDM/' }
  }
  // ... other sites
}
```

To modify ports or URLs, update `packages/theme/src/config/siteConfigCore.ts`.

## 🎯 **Testing Strategy Summary**

| Environment | Generated Content | Static Navigation | Script |
|-------------|-------------------|-------------------|---------|
| **localhost** | ✅ Full testing | ✅ Full testing | `validate:built-site` |
| **preview** | 🔍 Spot checks | ✅ Full testing | `validate:env-urls` |
| **production** | 🔍 Spot checks | ✅ Full testing | `validate:env-urls` |

**Key Point**: Only localhost can comprehensively test generated content because that's where you can serve the built sites locally.