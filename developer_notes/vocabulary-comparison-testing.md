# Vocabulary Comparison Tool Testing

## Quick Start
To run the vocabulary comparison tool tests:
```bash
pnpm test packages/theme/src/tests/scripts/vocabulary-comparison.test.ts
```

## Overview
The VocabularyComparisonTool tests ensure the Google Sheets to RDF vocabulary comparison script works correctly. The tests use Vitest with comprehensive mocking of external dependencies.

## Developer Details

### Test Location
- **Test file**: `packages/theme/src/tests/scripts/vocabulary-comparison.test.ts`
- **Script being tested**: `scripts/vocabulary-comparison.mjs`

### Key Testing Challenges Solved

1. **Fetch Mocking**
   - The script uses `globalThis.fetch` which requires special mocking approach
   - Solution: Use `vi.stubGlobal('fetch', mockFetch)` before importing the module
   - This ensures the mock is in place when the module binds fetch to a constant

2. **Constructor API Calls**
   - The constructor calls `getAvailableSheets()` which makes an API request
   - Tests must provide a default mock response for all instances
   - Individual tests can override with specific responses as needed

3. **API Response Differences**
   - `fetchSheetData` returns `data.values || []` not the full response object
   - Tests must match actual return values, not Google Sheets API structure

### Test Coverage

The test suite covers 34 test cases across these areas:

1. **Constructor** - Default and custom options initialization
2. **API Methods** 
   - `getAvailableSheets()` - Fetching and parsing sheet metadata
   - `fetchSheetData()` - Fetching sheet content
3. **Parsing Methods**
   - `parseColumnHeader()` - Parsing SKOS property headers with language/index
   - `organizeColumns()` - Grouping columns by property and language
   - `extractPropertyValues()` - Extracting values with language fallback
4. **Matching Logic**
   - `findMatchingSheet()` - Token/title matching with special patterns
5. **Validation**
   - `isInstructionRow()` - Identifying non-data rows
   - `hasValidRdfUri()` - URI validation
   - `validateSkosStructure()` - SKOS concept validation
6. **Utilities**
   - `normalizeText()` - Text normalization for comparison
   - `escapeMarkdown()` - Markdown special character escaping
   - `truncateText()` - Text truncation for display
7. **Reporting**
   - `generateMarkdownReport()` - Report generation with various scenarios

### Common Issues and Solutions

1. **Emoji Mismatches**
   - Error headers use 🚨 not 🔴
   - Mismatch headers use ⚠️ not 🟡
   
2. **Method Signatures**
   - `findMatchingSheet(sheets, token, title)` takes 3 params, not 2
   - `isInstructionRow(token, uri)` takes 2 params, not array
   - `organizeColumns()` returns a Map, not plain object

3. **Array Parsing**
   - Headers use `[n]` syntax for arrays, not `#n`
   - Language comes before array index: `skos:prefLabel@fr[1]`

### Running Tests

```bash
# Run just these tests
pnpm test packages/theme/src/tests/scripts/vocabulary-comparison.test.ts

# Run with coverage
pnpm test --coverage packages/theme/src/tests/scripts/vocabulary-comparison.test.ts

# Run in watch mode for development
pnpm test --watch packages/theme/src/tests/scripts/vocabulary-comparison.test.ts
```

### Debugging Tests

If tests fail with fetch-related errors:
1. Check that `vi.stubGlobal('fetch', mockFetch)` comes before the import
2. Ensure `mockFetch` is properly typed as `Mock` from vitest
3. Verify mock responses match expected structure

### Future Improvements

1. Add integration tests with real Google Sheets API (using test credentials)
2. Add performance tests for large vocabulary sheets
3. Consider extracting mock setup to a shared test utility
4. Add tests for the full workflow including RDF comparison (currently skipRdfCheck=true)