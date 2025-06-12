# Developer Notes

This directory contains detailed documentation for developers working on the IFLA Standards project. These notes are designed to help future developers (human or AI) understand how the system works and how to modify it.

## Structure

- **command-line-scripts/** - Documentation for CLI tools and build scripts
- **sites/** - Notes about individual site configurations and customizations
- **theme/** - Documentation about the shared theme package
- **tools/** - Notes about development tools and utilities

## Note Format

Each documentation file follows this structure:

1. **Quick Usage** - Simple instructions for common tasks
2. **Developer Guide** - Detailed technical information including:
   - Location and purpose of related code
   - How the feature works
   - Related files and configurations
   - Modification guidelines
   - Troubleshooting tips

## Contributing

When adding new features or modifying existing ones, please update or create corresponding documentation in this directory. This helps maintain institutional knowledge and makes onboarding easier.

### Adding New Sites

When adding new sites to the project:

1. **Add site configuration** to `packages/theme/src/config/siteConfigCore.ts`:
   - Update the `SiteKey` type to include your new site
   - Add site configuration to the `sites` object for all environments

2. **Link validation automatically includes new sites**:
   - No updates needed to validation scripts - they use the central configuration
   - New sites get default empty ignore patterns (check all links)
   - Add site-specific ignore patterns in `scripts/validate-site-links.js` if needed

3. **Navigation dropdowns automatically include new sites** if added to the theme configuration

This ensures all tooling automatically works with new sites without manual updates.

## For AI Assistants

These notes are specifically written to be helpful for AI coding assistants. They include:
- Explicit file paths
- Code examples
- Common patterns used in the project
- Warnings about potential pitfalls
- Clear modification instructions