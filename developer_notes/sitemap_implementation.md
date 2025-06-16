# Sitemap Implementation

## Quick Usage

All IFLA standards sites now have automatic sitemap pages accessible at `/sitemap` and linked from the footer.

### For New Sites
When creating a new site with `scripts/create-ifla-standard.ts`, sitemap pages are automatically included.

### For Existing Sites
Use `scripts/add-sitemap-pages.sh` to add sitemap pages to sites that don't have them.

## Developer Information

### Implementation Details

**Current Status:**
- ✅ All standards sites have sitemap pages (ISBDM, LRM, fr, isbd, muldicat, unimarc)
- ✅ Consistent styling and functionality across all sites
- ✅ Automatic categorization of documentation
- ✅ Responsive design with IFLA branding

**File Locations:**
- Individual site sitemaps: `standards/{site}/src/pages/sitemap.tsx`
- Shared styles: `standards/{site}/src/pages/sitemap.module.scss`
- Theme component (for future use): `packages/theme/src/components/Sitemap/`

### Features

**Automatic Categorization:**
- Organizes docs by directory structure (e.g., `tutorial-basics/` → "Tutorial-basics")
- Sorts documents alphabetically within categories
- Filters out docs without titles

**Responsive Design:**
- 2 columns on mobile/tablet
- 3 columns on desktop
- Hover effects and accessibility features
- IFLA color scheme and branding

**Additional Resources:**
- Links to RDF downloads (`/rdf/`)
- Links to blog (`/blog/`)
- Extensible for future resource links

### Scaffold Template Integration

The `create-ifla-standard.ts` script now includes:
- Complete sitemap page generation
- 11 placeholder replacements for full customization
- Proper directory structure with `src/pages/` and `src/css/`
- Recursive file processing for nested templates

### Maintenance

**Adding Sitemap to New Sites:**
1. Use the scaffold script for new sites (automatic)
2. For manual addition, copy files from existing site and update titles

**Customizing Categories:**
Edit the `organizeDocsByCategory` function in `sitemap.tsx` to modify how docs are categorized.

**Styling Updates:**
Modify `sitemap.module.scss` files. Consider updating the shared theme component for future consistency.

### Future Improvements

**Potential Enhancements:**
- Move sitemap to shared theme component (requires resolving module import issues)
- Add custom category mapping per site
- Include page descriptions in sitemap
- Add last-modified dates
- Support for multiple documentation versions

**Theme Integration:**
A shared sitemap component exists in `packages/theme/src/components/Sitemap/` but has module resolution issues with Docusaurus imports. Individual site implementations are currently preferred for stability.
