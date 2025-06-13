# Language Checking Scripts

## Usage
Several new scripts have been added to check and validate language tags across the codebase:
- `pnpm check:language-tags` - Basic check for language mismatches
- `pnpm check:language-tags:md` - Output in markdown format
- `pnpm check:language-tags:ai` - AI-friendly output format
- `pnpm detect:language-mismatches` - Detect mismatches in vocabulary
- `pnpm detect:language-mismatches-local` - Check local files
- `pnpm detect:language-mismatches-skos` - Check SKOS vocabularies

## Developer Section

### Overview
These scripts help maintain consistency in language tagging across MDX files, ensuring that language attributes match the actual content language.

### Script Details

#### check-mediatype-languages.mjs
- **Purpose**: Validates language tags in MDX frontmatter match content
- **Location**: `scripts/check-mediatype-languages.mjs`
- **Options**:
  - `--markdown`: Outputs results in markdown table format
  - `--ai`: Formats output for AI processing
  - Can combine: `--ai --markdown`

#### detect-language-mismatches.mjs
- **Purpose**: Detects language mismatches in vocabulary files
- **Location**: `scripts/detect-language-mismatches.mjs`
- **Variants**:
  - `-local`: Checks local MDX files
  - `-skos`: Validates SKOS vocabulary structure

### Implementation Features
1. **Pattern Detection**: Uses regex to find language tags in various formats
2. **Content Analysis**: Compares declared language with actual content
3. **Multiple Output Formats**: Plain text, markdown tables, or AI-optimized
4. **Batch Processing**: Can check entire directories recursively

### Common Issues Detected
- Language tag doesn't match content language
- Missing language declarations
- Inconsistent language tag formats
- Mixed language content without proper markup

### Usage Examples
```bash
# Basic check with console output
pnpm check:language-tags

# Generate markdown report for documentation
pnpm check:language-tags:md > language-report.md

# Get AI-friendly format for automated processing
pnpm check:language-tags:ai

# Check local vocabulary files
pnpm detect:language-mismatches-local
```

### Adding New Language Checks
To add new language validation:
1. Create script in `scripts/` directory
2. Follow naming pattern: `check-[what]-languages.mjs`
3. Add corresponding npm script in package.json
4. Support multiple output formats where applicable

### Related Files
- `scripts/check-mediatype-languages.mjs` - Main implementation
- `scripts/detect-language-mismatches*.mjs` - Variant scripts
- `scripts/check-missing-languages.ts` - TypeScript version for additional checks

### Integration with CI
These scripts can be integrated into CI pipelines to ensure language consistency before deployment.