#!/usr/bin/env tsx
// scripts/create-proper-isbd-excel.ts
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface ISBDVocabulary {
  name: string;
  title: string;
  description: string;
  csvPath: string;
  profileType: 'elements' | 'values';
}

const ISBD_VOCABULARIES: ISBDVocabulary[] = [
  {
    name: 'isbd-elements',
    title: 'ISBD Elements',
    description: 'ISBD Elements and Classes',
    csvPath: 'standards/isbd/csv/ns/isbd/elements.csv',
    profileType: 'elements'
  },
  {
    name: 'unconstrained-elements',
    title: 'Unconstrained Elements',
    description: 'ISBD Unconstrained Elements',
    csvPath: 'standards/isbd/csv/ns/isbd/unc/elements.csv',
    profileType: 'elements'
  },
  {
    name: 'content-form',
    title: 'Content Form',
    description: 'ISBD Content Form vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentform.csv',
    profileType: 'values'
  },
  {
    name: 'content-form-base',
    title: 'Content Form Base',
    description: 'ISBD Content Form Base vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentformbase.csv',
    profileType: 'values'
  },
  {
    name: 'dimensionality',
    title: 'Dimensionality',
    description: 'ISBD Dimensionality vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/dimensionality.csv',
    profileType: 'values'
  },
  {
    name: 'motion',
    title: 'Motion',
    description: 'ISBD Motion vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/motion.csv',
    profileType: 'values'
  },
  {
    name: 'sensory-specification',
    title: 'Sensory Specification',
    description: 'ISBD Sensory Specification vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/sensoryspecfication.csv',
    profileType: 'values'
  },
  {
    name: 'content-type',
    title: 'Content Type',
    description: 'ISBD Content Type vocabulary for content qualification',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/contentqualification/type.csv',
    profileType: 'values'
  },
  {
    name: 'media-type',
    title: 'Media Type',
    description: 'ISBD Media Type vocabulary terms',
    csvPath: 'standards/isbd/csv/ns/isbd/terms/mediatype.csv',
    profileType: 'values'
  }
];

async function loadCSVWithOriginalHeaders(csvPath: string): Promise<{ headers: string[], data: any[] }> {
  const fullPath = path.join(process.cwd(), csvPath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }
  
  const csvContent = fs.readFileSync(fullPath, 'utf-8');
  const parsed = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  // Get original headers from first line
  const firstLine = csvContent.split('\n')[0];
  const headers = firstLine.split(',').map(h => h.trim());
  
  return { headers, data: parsed };
}

async function createExcelFiles() {
  const outputDir = path.join(process.cwd(), 'output', 'isbd-excel-proper');
  
  // Create output directories
  const elementsDir = path.join(outputDir, 'isbd-elements');
  const valuesDir = path.join(outputDir, 'isbd-values');
  
  fs.mkdirSync(elementsDir, { recursive: true });
  fs.mkdirSync(valuesDir, { recursive: true });
  
  console.log(`📁 Creating proper ISBD Excel files in ${outputDir}`);
  
  // Process each vocabulary
  let totalRows = 0;
  const elementsIndex: string[][] = [['Vocabulary Name', 'Title', 'Description', 'File Path', 'Row Count']];
  const valuesIndex: string[][] = [['Vocabulary Name', 'Title', 'Description', 'File Path', 'Row Count']];
  
  for (const vocab of ISBD_VOCABULARIES) {
    console.log(`\n📊 Processing ${vocab.title}...`);
    
    try {
      const { headers, data } = await loadCSVWithOriginalHeaders(vocab.csvPath);
      
      console.log(`   📋 Headers: ${headers.slice(0, 5).join(', ')}${headers.length > 5 ? '...' : ''}`);
      console.log(`   📈 Data rows: ${data.length}`);
      console.log(`   🌐 Languages found: ${headers.filter(h => h.includes('@')).map(h => h.match(/@(\w+)/)?.[1]).filter((v, i, a) => a.indexOf(v) === i).join(', ')}`);
      
      // Create CSV with proper headers
      const outputPath = path.join(
        vocab.profileType === 'elements' ? elementsDir : valuesDir,
        `${vocab.name}.csv`
      );
      
      // Build CSV content with original headers
      const csvRows = [headers.join(',')];
      
      for (const row of data) {
        const csvRow = headers.map(header => {
          const value = row[header] || '';
          // Escape commas and quotes in CSV
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvRows.push(csvRow.join(','));
      }
      
      fs.writeFileSync(outputPath, csvRows.join('\n'));
      
      // Add to index
      const indexRow = [vocab.name, vocab.title, vocab.description, `${vocab.name}.csv`, data.length.toString()];
      if (vocab.profileType === 'elements') {
        elementsIndex.push(indexRow);
      } else {
        valuesIndex.push(indexRow);
      }
      
      totalRows += data.length;
      console.log(`   ✅ Created ${outputPath}`);
      
    } catch (error) {
      console.error(`   ❌ Error processing ${vocab.name}:`, error);
    }
  }
  
  // Create index files
  fs.writeFileSync(
    path.join(elementsDir, 'index.csv'), 
    elementsIndex.map(row => row.join(',')).join('\n')
  );
  
  fs.writeFileSync(
    path.join(valuesDir, 'index.csv'), 
    valuesIndex.map(row => row.join(',')).join('\n')
  );
  
  // Create master index
  const masterIndex = [
    ['Workbook', 'File Count', 'Total Rows', 'Directory'],
    ['Elements', (elementsIndex.length - 1).toString(), elementsIndex.slice(1).reduce((sum, row) => sum + parseInt(row[4]), 0).toString(), 'isbd-elements/'],
    ['Values', (valuesIndex.length - 1).toString(), valuesIndex.slice(1).reduce((sum, row) => sum + parseInt(row[4]), 0).toString(), 'isbd-values/']
  ];
  
  fs.writeFileSync(
    path.join(outputDir, 'master-index.csv'),
    masterIndex.map(row => row.join(',')).join('\n')
  );
  
  // Create README
  const readme = `# ISBD Excel Files (Proper Format)

## Overview
Complete ISBD vocabulary data with original CSV headers preserved.

**Total vocabularies:** ${ISBD_VOCABULARIES.length}  
**Total rows:** ${totalRows}

## Structure

### Elements Workbook (\`isbd-elements/\`)
${elementsIndex.slice(1).map(row => `- **${row[1]}** (${row[4]} rows): ${row[2]}`).join('\n')}

### Values Workbook (\`isbd-values/\`)
${valuesIndex.slice(1).map(row => `- **${row[1]}** (${row[4]} rows): ${row[2]}`).join('\n')}

## Header Format
- Language tags: \`@en\`, \`@es\`, etc.
- Indexed properties: \`[0]\`, \`[1]\`, etc.
- Mandatory fields: \`*\` suffix
- Example: \`skos:definition@en[0]*\`

## Files
- Each vocabulary is a separate CSV file
- \`index.csv\` in each directory lists all vocabularies
- \`master-index.csv\` provides overview

## Usage
Import any CSV file into Excel, Google Sheets, or other tools.
All original RDF structure and multilingual content preserved.
`;

  fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
  
  console.log(`\n🎉 ISBD Excel files created successfully!`);
  console.log(`📍 Location: ${outputDir}`);
  console.log(`📊 Total vocabularies: ${ISBD_VOCABULARIES.length}`);
  console.log(`📈 Total rows: ${totalRows}`);
  console.log(`\n📁 Structure:`);
  console.log(`   📋 Elements: ${elementsIndex.length - 1} vocabularies`);
  console.log(`   📋 Values: ${valuesIndex.length - 1} vocabularies`);
}

if (require.main === module) {
  createExcelFiles().catch(console.error);
}