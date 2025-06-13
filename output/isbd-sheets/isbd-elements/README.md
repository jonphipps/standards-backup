# ISBD Elements Workbook

## Overview
This workbook contains 2 ISBD elements vocabularies with a total of 357 data rows.

## Contents
- **index.csv**: Overview of all sheets in this workbook
- **Individual CSV files**: One file per vocabulary

## Sheets Created
- **isbd-elements.csv**: ISBD Elements
- **unconstrained-elements.csv**: Unconstrained Elements

## Statistics
- Total vocabularies: 2
- Successfully created: 2
- Total data rows: 357
- Languages supported: EN, ES

## Usage
1. Review the data in each CSV file
2. Import to Google Sheets using the create-isbd-sheets.ts script
3. Or use these files directly in Excel/other spreadsheet applications

## Next Steps
To create Google Sheets from this data:
```bash
# Set up Google Service Account credentials
export GSHEETS_SA_KEY="<base64-encoded-service-account-json>"

# Create the Google Sheets structure
npx tsx scripts/create-isbd-sheets.ts

# Populate with data (after getting sheet IDs)
npx tsx scripts/populate-isbd-sheets.ts <elements-sheet-id> <values-sheet-id>
```
