# ISBD Values Workbook

## Overview
This workbook contains 7 ISBD values vocabularies with a total of 60 data rows.

## Contents
- **index.csv**: Overview of all sheets in this workbook
- **Individual CSV files**: One file per vocabulary

## Sheets Created
- **content-form.csv**: Content Form
- **content-form-base.csv**: Content Form Base
- **dimensionality.csv**: Dimensionality
- **motion.csv**: Motion
- **sensory-specification.csv**: Sensory Specification
- **content-type.csv**: Content Type
- **media-type.csv**: Media Type

## Statistics
- Total vocabularies: 7
- Successfully created: 7
- Total data rows: 60
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
