#!/usr/bin/env tsx
// scripts/create-isbd-excel.ts
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

interface CSVRow {
  [key: string]: string;
}

interface ISBDVocabulary {
  name: string;
  title: string;
  description: string;
  csvPath: string;
  profileType: 'values' | 'elements';
  languages: string[];
}

// Same vocabularies as the Google Sheets script
const ISBD_VOCABULARIES: ISBDVocabulary[] = [
  // Main elements
  {
    name: 'isbd-elements',
    title: 'ISBD Elements',
    description: 'Core ISBD elements and properties for bibliographic description',
    csvPath: 'standards/isbd/csv/ns/isbd/elements.csv',
    profileType: 'elements',
    languages: ['en', 'es']
  },
  {
    name: 'unconstrained-elements',
    title: 'Unconstrained Elements',
    description: 'ISBD Unconstrained Elements',
    csvPath: 'standards/isbd/csv/ns/isbd/unc/elements.csv',
    profileType: 'elements',
    languages: ['en', 'es']
  },
  
  // Value vocabularies
  {
    name: 'content-form',
    title: 'Content Form',
    description: 'ISBD Content Form vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentform.csv',
    profileType: 'values',
    languages: ['en', 'es']
  },
  {
    name: 'content-form-base',
    title: 'Content Form Base',
    description: 'ISBD Content Form Base vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentformbase.csv',
    profileType: 'values',
    languages: ['en', 'es']
  },
  {
    name: 'dimensionality',
    title: 'Dimensionality',
    description: 'ISBD Dimensionality vocabulary for content qualification',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/dimensionality.csv',
    profileType: 'values',
    languages: ['en', 'es']
  },
  {
    name: 'motion',
    title: 'Motion',
    description: 'ISBD Motion vocabulary for content qualification',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/motion.csv',
    profileType: 'values',
    languages: ['en', 'es']
  },
  {
    name: 'sensory-specification',
    title: 'Sensory Specification',
    description: 'ISBD Sensory Specification vocabulary for content qualification',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/sensoryspecfication.csv',
    profileType: 'values',
    languages: ['en', 'es']
  },
  {
    name: 'content-type',
    title: 'Content Type',
    description: 'ISBD Content Type vocabulary for content qualification',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/type.csv',
    profileType: 'values',
    languages: ['en', 'es']
  },
  {
    name: 'media-type',
    title: 'Media Type',
    description: 'ISBD Media Type vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/mediatype.csv',
    profileType: 'values',
    languages: ['en', 'es']
  }
];

async function loadCSVData(csvPath: string): Promise<CSVRow[]> {
  const fullPath = path.join(process.cwd(), csvPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  CSV file not found: ${csvPath}`);
    return [];
  }
  
  try {
    const csvContent = fs.readFileSync(fullPath, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      comment: '#',
    }) as CSVRow[];
    
    return records;
  } catch (error) {
    console.error(`❌ Error parsing CSV ${csvPath}:`, error);
    return [];
  }
}

async function createWorkbookCSV(
  vocabularies: ISBDVocabulary[],
  workbookType: string,
  outputDir: string
): Promise<void> {
  console.log(`\n📁 Creating ${workbookType} workbook files...`);
  
  const workbookDir = path.join(outputDir, `isbd-${workbookType.toLowerCase()}`);
  
  // Create workbook directory
  if (!fs.existsSync(workbookDir)) {
    fs.mkdirSync(workbookDir, { recursive: true });
  }
  
  // Create index file
  const indexRows = [
    ['Sheet Name', 'Title', 'Description', 'Languages', 'Original CSV Path', 'Row Count', 'Status']
  ];
  
  let totalRows = 0;
  let successfulSheets = 0;
  
  for (const vocab of vocabularies) {
    console.log(`📊 Processing: ${vocab.title}`);
    
    // Load CSV data
    const csvData = await loadCSVData(vocab.csvPath);
    const rowCount = csvData.length;
    totalRows += rowCount;
    
    let status = 'No data';
    
    if (rowCount > 0) {
      // Create CSV file for this vocabulary
      const outputPath = path.join(workbookDir, `${vocab.name}.csv`);
      
      // Convert data back to CSV format
      if (csvData.length > 0) {
        const headers = Object.keys(csvData[0]);
        const csvRows = [headers, ...csvData.map(row => headers.map(h => row[h] || ''))];
        const csvContent = stringify(csvRows);
        
        fs.writeFileSync(outputPath, csvContent);
        status = 'Created';
        successfulSheets++;
        console.log(`  ✅ Created ${vocab.name}.csv (${rowCount} rows)`);
      }
    } else {
      console.log(`  ⚠️  No data for ${vocab.title}`);
    }
    
    // Add to index
    indexRows.push([
      vocab.name,
      vocab.title,
      vocab.description,
      vocab.languages.join(', '),
      vocab.csvPath,
      rowCount.toString(),
      status
    ]);
  }
  
  // Create index CSV
  const indexPath = path.join(workbookDir, 'index.csv');
  const indexContent = stringify(indexRows);
  fs.writeFileSync(indexPath, indexContent);
  
  // Create README
  const readmePath = path.join(workbookDir, 'README.md');
  const readmeContent = `# ISBD ${workbookType} Workbook

## Overview
This workbook contains ${vocabularies.length} ISBD ${workbookType.toLowerCase()} vocabularies with a total of ${totalRows} data rows.

## Contents
- **index.csv**: Overview of all sheets in this workbook
- **Individual CSV files**: One file per vocabulary

## Sheets Created
${vocabularies.map(v => `- **${v.name}.csv**: ${v.title}`).join('\n')}

## Statistics
- Total vocabularies: ${vocabularies.length}
- Successfully created: ${successfulSheets}
- Total data rows: ${totalRows}
- Languages supported: EN, ES

## Usage
1. Review the data in each CSV file
2. Import to Google Sheets using the create-isbd-sheets.ts script
3. Or use these files directly in Excel/other spreadsheet applications

## Next Steps
To create Google Sheets from this data:
\`\`\`bash
# Set up Google Service Account credentials
export GSHEETS_SA_KEY="<base64-encoded-service-account-json>"

# Create the Google Sheets structure
npx tsx scripts/create-isbd-sheets.ts

# Populate with data (after getting sheet IDs)
npx tsx scripts/populate-isbd-sheets.ts <elements-sheet-id> <values-sheet-id>
\`\`\`
`;
  
  fs.writeFileSync(readmePath, readmeContent);
  
  console.log(`\n✅ ${workbookType} workbook created:`);
  console.log(`   📁 Directory: ${workbookDir}`);
  console.log(`   📊 Sheets: ${successfulSheets}/${vocabularies.length}`);
  console.log(`   📈 Total rows: ${totalRows}`);
}

async function main() {
  console.log('🚀 Creating ISBD Excel/CSV files...\n');
  
  const outputDir = path.join(process.cwd(), 'output', 'isbd-sheets');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Group vocabularies by profile type
  const elementVocabs = ISBD_VOCABULARIES.filter(v => v.profileType === 'elements');
  const valueVocabs = ISBD_VOCABULARIES.filter(v => v.profileType === 'values');
  
  // Create workbooks
  await createWorkbookCSV(elementVocabs, 'Elements', outputDir);
  await createWorkbookCSV(valueVocabs, 'Values', outputDir);
  
  // Create master index
  const masterIndexRows = [
    ['Workbook', 'Type', 'Vocabularies', 'Total Rows', 'Directory']
  ];
  
  masterIndexRows.push([
    'ISBD Elements',
    'elements',
    elementVocabs.length.toString(),
    elementVocabs.reduce(async (acc, v) => (await acc) + (await loadCSVData(v.csvPath)).length, Promise.resolve(0)).toString(),
    'isbd-elements/'
  ]);
  
  masterIndexRows.push([
    'ISBD Values',
    'values',
    valueVocabs.length.toString(),
    valueVocabs.reduce(async (acc, v) => (await acc) + (await loadCSVData(v.csvPath)).length, Promise.resolve(0)).toString(),
    'isbd-values/'
  ]);
  
  const masterIndexPath = path.join(outputDir, 'master-index.csv');
  const masterIndexContent = stringify(masterIndexRows);
  fs.writeFileSync(masterIndexPath, masterIndexContent);
  
  // Create master README
  const masterReadmePath = path.join(outputDir, 'README.md');
  const masterReadmeContent = `# ISBD Google Sheets Setup

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

\`\`\`bash
# Create sheet structure
npx tsx scripts/create-isbd-sheets.ts

# Populate with data
npx tsx scripts/populate-isbd-sheets.ts <elements-sheet-id> <values-sheet-id>
\`\`\`

## Data Summary
- **Elements**: ${elementVocabs.length} vocabularies covering ISBD elements and properties
- **Values**: ${valueVocabs.length} controlled vocabularies for content description
- **Languages**: English and Spanish throughout
- **Format**: Ready for editorial workflows

## Generated
Created: ${new Date().toISOString()}
Total vocabularies: ${ISBD_VOCABULARIES.length}
`;
  
  fs.writeFileSync(masterReadmePath, masterReadmeContent);
  
  console.log('\n🎉 ISBD Excel/CSV creation complete!');
  console.log('==========================================');
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`📊 Elements workbook: ${elementVocabs.length} sheets`);
  console.log(`📊 Values workbook: ${valueVocabs.length} sheets`);
  console.log(`📋 Ready for Google Sheets import or direct Excel use`);
  console.log('\n💡 Next steps:');
  console.log('1. Review the CSV files in the output directory');
  console.log('2. Set up Google Service Account if needed');
  console.log('3. Run create-isbd-sheets.ts to create Google Sheets');
}

// Run if called directly
if (require.main === module) {
  main();
}