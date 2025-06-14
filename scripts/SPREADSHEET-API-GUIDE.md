# General-Purpose Spreadsheet API

## Overview
A flexible API that recursively scans directories for CSV files and creates either Excel workbooks or Google Sheets with proper indexing and organization.

## Quick Start

### Excel Workbooks
```bash
# Create Excel workbooks grouped by profile (elements vs values)
pnpm dlx tsx scripts/spreadsheet-api.ts excel ISBDM profile

# Create workbooks grouped by directory structure  
pnpm dlx tsx scripts/spreadsheet-api.ts excel MyProject directory

# Create single workbook with all vocabularies
pnpm dlx tsx scripts/spreadsheet-api.ts excel MyProject all
```

### Google Sheets
```bash
# Requires GSHEETS_SA_KEY environment variable
pnpm dlx tsx scripts/spreadsheet-api.ts google ISBDM profile
```

### Both Formats
```bash
pnpm dlx tsx scripts/spreadsheet-api.ts both MyProject profile
```

## Features

### 🔍 **Auto-Discovery**
- Recursively scans directories for CSV files
- Analyzes headers to detect languages and profile types
- Preserves original CSV structure with `@en[0]` format

### 📊 **Smart Grouping**
- **Profile**: Groups by elements vs values vocabularies
- **Directory**: Groups by top-level directory structure
- **All**: Single workbook with all vocabularies

### 🌐 **Multilingual Support**
- Automatically detects all languages from headers
- Preserves language tags: `@en`, `@es`, `@fr`, etc.
- Handles indexed properties: `[0]`, `[1]`, `[2]`

### 📋 **Index Sheets**
- Every workbook includes an Index sheet
- Links to individual vocabulary sheets (Google Sheets)
- Shows vocabulary metadata and statistics

## API Usage

```typescript
import SpreadsheetAPI from './scripts/spreadsheet-api';

const config = {
  name: 'MyProject',
  baseDir: '/path/to/csv/files',
  outputDir: './output/spreadsheets',
  groupBy: 'profile' // or 'directory' or 'all'
};

const api = new SpreadsheetAPI(config);

// Discover vocabularies
const vocabularies = await api.discoverVocabularies();

// Group into workbooks
const workbookGroups = api.groupVocabularies(vocabularies);

// Create Excel files
const excelPaths = await api.createExcelWorkbooks(workbookGroups);

// Create Google Sheets (requires GSHEETS_SA_KEY)
const googleIds = await api.createGoogleWorkbooks(workbookGroups);
```

## Configuration Options

### Command Line Arguments
```bash
spreadsheet-api.ts <format> <name> [groupBy] [baseDir]
```

- **format**: `excel`, `google`, or `both`
- **name**: Project name (used in file/workbook names)
- **groupBy**: `profile` (default), `directory`, or `all`
- **baseDir**: Directory to scan (default: ISBDM path)

### Grouping Strategies

#### Profile Grouping (Default)
Groups vocabularies by detected type:
- **Elements Workbook**: Classes, properties, domains, ranges
- **Values Workbook**: Controlled vocabularies, concept schemes

#### Directory Grouping
Groups by top-level directory structure:
- **Terms Workbook**: All vocabularies from `/terms/` directory
- **Elements Workbook**: All vocabularies from root or `/elements/`
- **Unc Workbook**: All vocabularies from `/unc/` directory

#### All Grouping
Single workbook with all vocabularies as separate sheets.

## Test Results from ISBDM

### Profile Grouping Results
✅ **Elements Workbook** (353 total rows)
- elements: 190 rows, 2 languages (en, es)
- unc-elements: 163 rows, 1 language (en)

✅ **Values Workbook** (46 total rows)
- contentform: 11 rows, 10 languages
- contentformbase: 13 rows, 1 language
- dimensionality: 2 rows, 10 languages
- motion: 2 rows, 10 languages
- sensoryspecification: 5 rows, 9 languages
- contenttype: 3 rows, 10 languages
- mediatype: 10 rows, 10 languages

### Created Files
- **Excel**: `/output/ISBDM-spreadsheets/ISBDM-elements.xlsx` (435KB)
- **Excel**: `/output/ISBDM-spreadsheets/ISBDM-values.xlsx` (144KB)
- **Google**: Elements workbook at `19_0uoHfpkr0tCh_idFq3z3e2lFYXLqyrCbjf_Ca6_P8`
- **Google**: Values workbook at `1Al3GofPYHL2eJvrwSRa2mb3C1TLwdURSvkrm8rmoDC8`

## Language Support
The API automatically detected and preserved:
- **10 languages**: bg, en, es, fr, hr, it, lv, ru, sr, zh
- **Proper formatting**: `skos:prefLabel@en`, `skos:definition@es[0]`
- **All indexed properties**: `rdfs:label@es[0]`, `rdfs:label@es[1]`, etc.

## Dependencies
- `xlsx`: Excel file generation
- `googleapis`: Google Sheets API
- `csv-parse`: CSV parsing
- `dotenv`: Environment variable loading

## Environment Variables
```bash
# Required for Google Sheets
GSHEETS_SA_KEY=<base64-encoded-service-account-json>
```

## Error Handling
- Gracefully skips invalid CSV files with warnings
- Validates environment variables for Google Sheets
- Provides detailed progress logging
- Creates output directories automatically

---

## 🎯 **Ready for Production Use**

This API successfully processed **9 ISBDM vocabularies** with **399 total rows** across **10 languages**, creating both Excel and Google Sheets workbooks with proper indexing and multilingual support!