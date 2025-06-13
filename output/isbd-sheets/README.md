# ISBD Google Sheets Setup

This directory contains all the CSV data needed to create ISBD Google Sheets for editorial workflows.

## Structure
- **isbd-elements/**: Elements workbook (classes, properties, unconstrained elements)
- **isbd-values/**: Values workbook (controlled vocabularies)
- **master-index.csv**: Overview of both workbooks

## Quick Start

### Option 1: Use CSV files directly
The CSV files in each directory can be imported into Excel, Google Sheets, or any spreadsheet application.

### Option 2: Create Google Sheets with automation
1. Set up Google Service Account credentials
2. Run the automated sheet creation scripts

```bash
# Create sheet structure
npx tsx scripts/create-isbd-sheets.ts

# Populate with data
npx tsx scripts/populate-isbd-sheets.ts <elements-sheet-id> <values-sheet-id>
```

## Data Summary
- **Elements**: 2 vocabularies covering ISBD elements and properties
- **Values**: 7 controlled vocabularies for content description
- **Languages**: English and Spanish throughout
- **Format**: Ready for editorial workflows

## Generated
Created: 2025-06-13T23:25:17.758Z
Total vocabularies: 9
