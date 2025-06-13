# SASS Integration for Theme Components

## Usage
All theme components now use SASS for styling, following the established pattern of component folders with `index.tsx` and `styles.module.scss`.

## Developer Section

### Overview
Recent changes fixed SASS compilation issues in the theme package, particularly for the ElementReference component.

### Key Changes

#### 1. Package Dependencies
Added required SASS dependencies to theme package:
- `sass` - Core SASS compiler
- `sass-loader` - Webpack loader for SASS
- `@types/sass` - TypeScript definitions

#### 2. Build Configuration (`packages/theme/tsup.config.ts`)
Updated to handle SASS files:
```typescript
{
  loader: '.scss',
  minify: true,
}
```

#### 3. Component Structure
All components follow this pattern:
```
components/
  ComponentName/
    index.tsx          # Component logic
    styles.module.scss # SASS styles
```

### ElementReference Component Updates
The ElementReference component was updated to:
1. Import styles from SASS: `import styles from './styles.module.scss'`
2. Remove any CSS imports
3. Ensure TypeScript recognizes SASS modules

### Common Issues and Solutions

#### Issue: SASS module not found
**Solution**: Ensure `sass` and `sass-loader` are installed in the theme package

#### Issue: TypeScript doesn't recognize .scss imports
**Solution**: The theme package includes proper module declarations for SASS files

#### Issue: Styles not applying in production
**Solution**: Check that tsup.config.ts includes the SASS loader configuration

### Development Guidelines
1. Always use SASS for new components in the theme package
2. Follow the `styles.module.scss` naming convention
3. Use CSS modules to avoid style conflicts
4. Leverage SASS features like:
   - Variables for consistent theming
   - Mixins for reusable patterns
   - Nesting for better organization

### Related Files
- `packages/theme/tsup.config.ts` - Build configuration
- `packages/theme/package.json` - SASS dependencies
- `packages/theme/src/components/ElementReference/styles.module.scss` - Example implementation

### Testing SASS Changes
1. Build the theme package: `pnpm build packages/theme`
2. Test in a standards site: `pnpm dev standards/ISBDM`
3. Verify styles are applied correctly
4. Check both light and dark themes if applicable