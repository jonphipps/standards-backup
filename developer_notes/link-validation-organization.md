# Link Validation Reports Organization

## Quick Usage

To run comprehensive link validation with the new organized reporting:

```bash
# Validate a single site
node scripts/validate-environment-urls.js --env localhost --site ISBDM --type comprehensive

# Validate all sites (each gets its own report)
node scripts/validate-environment-urls.js --env localhost --site all --type comprehensive
```

View reports: `open output/link-validation/index.html`

## Folder Structure

All validation reports and caches are now organized in `output/link-validation/`:

```
output/link-validation/
├── index.html                    # Main dashboard for all reports
├── index-data.json              # Report metadata (auto-generated)
├── portal/                      # Portal site reports and caches
│   ├── content-cache.json       # Content checksums for caching
│   ├── sitemap-cache.json       # Sitemap cache
│   └── report-YYYYMMDD-HHMMSS.html  # Timestamped reports
├── isbdm/                       # ISBDM site reports and caches
│   ├── content-cache.json
│   ├── sitemap-cache.json
│   └── report-YYYYMMDD-HHMMSS.html
└── [other sites...]             # Each standard gets its own folder
```

## Report Features

### Timestamped Reports
- **Format**: `report-YYYYMMDD-HHMMSS.html`
- **Example**: `report-20250614-143052.html`
- **Location**: `output/link-validation/{site}/`

### Index Dashboard
- **Main file**: `output/link-validation/index.html`
- **Features**:
  - Shows all sites (Portal, ISBDM, LRM, FR, ISBD, MULDICAT, UNIMARC)
  - Latest runs displayed first
  - Color-coded status badges:
    - 🟢 **CLEAN**: No broken links, no cached pages
    - 🟡 **CACHED**: No broken links, but some pages were cached (skipped)
    - 🔴 **ERRORS**: Broken links found
  - Performance metrics: cached/changed/new page counts
  - Environment indicators (localhost, preview, production)

### Content Caching
- **Purpose**: Skip processing unchanged pages on subsequent runs
- **File**: `{site}/content-cache.json`
- **Benefits**: Dramatically faster validation on large sites
- **Behavior**:
  - 🆕 **NEW**: First time processing this page
  - 🔄 **CHANGED**: Page content modified since last run  
  - ⏭️ **SKIPPED**: Page unchanged, using cached data

## All Sites Validation

When running `--site all`:
- Each site generates its own timestamped report in its folder
- Each site maintains its own caches independently
- The index dashboard shows all results organized by site
- Failed sites don't affect other sites' processing

## Developer Information

### Key Functions
- `generateHtmlReport()`: Creates timestamped reports with environment info
- `updateValidationIndex()`: Updates the main dashboard with new run data
- `generateValidationIndexHtml()`: Renders the dashboard HTML
- Content caching: `loadPageContentCache()`, `savePageContentCache()`, `getMainContentChecksum()`

### Configuration
- Site list: `['portal', 'isbdm', 'lrm', 'fr', 'isbd', 'muldicat', 'unimarc']`
- Report retention: Last 20 runs per site
- Cache location: `output/link-validation/{site}/`

### Status Determination
```javascript
let status = 'success';  // Default: green (CLEAN)
if (results.failed > 0) {
  status = 'danger';     // Red (ERRORS)
} else if (results.skippedPages > 0) {
  status = 'warning';    // Yellow (CACHED)
}
```

## Migration Notes

The new system automatically:
- Creates the organized folder structure
- Moves caches to the correct locations
- Maintains backward compatibility with existing validation types
- Preserves all existing command-line options

### Example Report Added
The existing ISBDM report (`report-20250614-162401.html`) has been added to the index system showing:
- **Status**: 🔴 ERRORS (235 broken links found)
- **Environment**: localhost
- **Links**: ✅ 1262 / ❌ 235 / 📊 1497 total
- **Performance**: 🆕 342 new pages processed
- **Timestamp**: 2025-06-14, 6:47:25 p.m.

This demonstrates the dashboard's color-coding and statistics display functionality.