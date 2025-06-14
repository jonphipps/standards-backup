#!/usr/bin/env tsx
// scripts/spreadsheet-api.ts
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { google } from 'googleapis';
import { utils as xlsxUtils, write as xlsxWrite, WorkBook, WorkSheet } from 'xlsx';

export interface VocabularyInfo {
  name: string;
  title: string;
  description: string;
  csvPath: string;
  relativeDir: string;
  profileType: 'elements' | 'values';
  rowCount: number;
  languages: string[];
  headers: string[];
}

export interface WorkbookGroup {
  name: string;
  title: string;
  vocabularies: VocabularyInfo[];
  totalRows: number;
}

export interface SpreadsheetConfig {
  name: string;
  baseDir: string;
  outputDir: string;
  groupBy: 'profile' | 'directory' | 'all';
}

export class SpreadsheetAPI {
  private config: SpreadsheetConfig;

  constructor(config: SpreadsheetConfig) {
    this.config = config;
  }

  /**
   * Recursively discover all CSV files in the base directory
   */
  async discoverVocabularies(): Promise<VocabularyInfo[]> {
    const vocabularies: VocabularyInfo[] = [];
    const csvFiles = this.findCSVFiles(this.config.baseDir);

    console.log(`🔍 Found ${csvFiles.length} CSV files in ${this.config.baseDir}`);

    for (const csvPath of csvFiles) {
      try {
        const vocab = await this.analyzeCSV(csvPath);
        vocabularies.push(vocab);
        console.log(`   📊 ${vocab.name}: ${vocab.rowCount} rows, ${vocab.languages.length} languages`);
      } catch (error) {
        console.warn(`   ⚠️  Skipped ${csvPath}: ${error}`);
      }
    }

    return vocabularies;
  }

  /**
   * Recursively find all CSV files
   */
  private findCSVFiles(dir: string): string[] {
    const csvFiles: string[] = [];
    
    const scan = (currentDir: string) => {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scan(fullPath);
        } else if (stat.isFile() && item.endsWith('.csv')) {
          csvFiles.push(fullPath);
        }
      }
    };

    scan(dir);
    return csvFiles;
  }

  /**
   * Analyze a CSV file to extract vocabulary information
   */
  private async analyzeCSV(csvPath: string): Promise<VocabularyInfo> {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const firstLine = csvContent.split('\n')[0];
    const headers = firstLine.split(',').map(h => h.trim());
    
    // Parse CSV to get row count
    const parsed = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    // Extract languages from headers
    const languages = this.extractLanguages(headers);
    
    // Determine profile type and create name
    const relativePath = path.relative(this.config.baseDir, csvPath);
    const relativeDir = path.dirname(relativePath);
    const fileName = path.basename(csvPath, '.csv');
    
    const profileType = this.determineProfileType(headers, relativePath);
    const name = this.generateName(fileName, relativeDir);
    const title = this.generateTitle(fileName, relativeDir);
    const description = this.generateDescription(fileName, relativeDir, profileType);

    return {
      name,
      title,
      description,
      csvPath,
      relativeDir,
      profileType,
      rowCount: parsed.length,
      languages,
      headers
    };
  }

  /**
   * Extract language codes from headers
   */
  private extractLanguages(headers: string[]): string[] {
    const languageSet = new Set<string>();
    
    headers.forEach(header => {
      const match = header.match(/@(\w+)/);
      if (match) {
        languageSet.add(match[1]);
      }
    });

    return Array.from(languageSet).sort();
  }

  /**
   * Determine if this is elements or values vocabulary
   */
  private determineProfileType(headers: string[], path: string): 'elements' | 'values' {
    // Check for elements-specific headers
    if (headers.some(h => h.includes('rdfs:domain') || h.includes('rdfs:range') || h.includes('owl:Class'))) {
      return 'elements';
    }
    
    // Check path for indicators
    if (path.includes('/elements') || path.includes('/unc/')) {
      return 'elements';
    }
    
    return 'values';
  }

  /**
   * Generate a clean name for the vocabulary
   */
  private generateName(fileName: string, relativeDir: string): string {
    const dirParts = relativeDir.split('/').filter(p => p && p !== '.');
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    if (dirParts.length > 0) {
      const lastDir = dirParts[dirParts.length - 1];
      if (lastDir !== cleanFileName) {
        return `${lastDir}-${cleanFileName}`;
      }
    }
    
    return cleanFileName;
  }

  /**
   * Generate a human-readable title
   */
  private generateTitle(fileName: string, relativeDir: string): string {
    const words = fileName.split(/[_-]/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    
    return words.join(' ');
  }

  /**
   * Generate description
   */
  private generateDescription(fileName: string, relativeDir: string, profileType: string): string {
    const title = this.generateTitle(fileName, relativeDir);
    const typeLabel = profileType === 'elements' ? 'elements and classes' : 'vocabulary terms';
    
    return `ISBD ${title} ${typeLabel}`;
  }

  /**
   * Group vocabularies into workbooks
   */
  groupVocabularies(vocabularies: VocabularyInfo[]): WorkbookGroup[] {
    switch (this.config.groupBy) {
      case 'profile':
        return this.groupByProfile(vocabularies);
      case 'directory':
        return this.groupByDirectory(vocabularies);
      case 'all':
        return [{
          name: 'all-vocabularies',
          title: 'All Vocabularies',
          vocabularies,
          totalRows: vocabularies.reduce((sum, v) => sum + v.rowCount, 0)
        }];
      default:
        return this.groupByProfile(vocabularies);
    }
  }

  private groupByProfile(vocabularies: VocabularyInfo[]): WorkbookGroup[] {
    const elements = vocabularies.filter(v => v.profileType === 'elements');
    const values = vocabularies.filter(v => v.profileType === 'values');

    const groups: WorkbookGroup[] = [];

    if (elements.length > 0) {
      groups.push({
        name: 'elements',
        title: 'Elements',
        vocabularies: elements,
        totalRows: elements.reduce((sum, v) => sum + v.rowCount, 0)
      });
    }

    if (values.length > 0) {
      groups.push({
        name: 'values',
        title: 'Values',
        vocabularies: values,
        totalRows: values.reduce((sum, v) => sum + v.rowCount, 0)
      });
    }

    return groups;
  }

  private groupByDirectory(vocabularies: VocabularyInfo[]): WorkbookGroup[] {
    const groups = new Map<string, VocabularyInfo[]>();

    vocabularies.forEach(vocab => {
      const topDir = vocab.relativeDir.split('/')[0] || 'root';
      if (!groups.has(topDir)) {
        groups.set(topDir, []);
      }
      groups.get(topDir)!.push(vocab);
    });

    return Array.from(groups.entries()).map(([dirName, vocabs]) => ({
      name: dirName,
      title: dirName.charAt(0).toUpperCase() + dirName.slice(1),
      vocabularies: vocabs,
      totalRows: vocabs.reduce((sum, v) => sum + v.rowCount, 0)
    }));
  }

  /**
   * Create Excel workbooks
   */
  async createExcelWorkbooks(workbookGroups: WorkbookGroup[]): Promise<string[]> {
    const outputPaths: string[] = [];
    fs.mkdirSync(this.config.outputDir, { recursive: true });

    for (const group of workbookGroups) {
      console.log(`\n📊 Creating Excel workbook: ${group.title}`);
      
      const workbook: WorkBook = xlsxUtils.book_new();
      
      // Create index sheet
      const indexData = [
        ['Vocabulary Name', 'Title', 'Description', 'Directory', 'Row Count', 'Languages', 'Sheet Name']
      ];
      
      group.vocabularies.forEach(vocab => {
        indexData.push([
          vocab.name,
          vocab.title,
          vocab.description,
          vocab.relativeDir,
          vocab.rowCount.toString(),
          vocab.languages.join(', '),
          vocab.name
        ]);
      });
      
      const indexSheet = xlsxUtils.aoa_to_sheet(indexData);
      xlsxUtils.book_append_sheet(workbook, indexSheet, 'Index');

      // Create vocabulary sheets
      for (const vocab of group.vocabularies) {
        const csvData = await this.loadCSVData(vocab.csvPath);
        const worksheet = this.createWorksheet(csvData, vocab.headers);
        xlsxUtils.book_append_sheet(workbook, worksheet, vocab.name.substring(0, 31)); // Excel sheet name limit
        
        console.log(`   📝 Added sheet: ${vocab.name} (${vocab.rowCount} rows)`);
      }

      const outputPath = path.join(this.config.outputDir, `${this.config.name}-${group.name}.xlsx`);
      const buffer = xlsxWrite(workbook, { type: 'buffer', bookType: 'xlsx' });
      fs.writeFileSync(outputPath, buffer);
      
      outputPaths.push(outputPath);
      console.log(`   ✅ Created: ${outputPath}`);
    }

    return outputPaths;
  }

  /**
   * Create Google Sheets workbooks
   */
  async createGoogleWorkbooks(workbookGroups: WorkbookGroup[]): Promise<string[]> {
    const credentials = JSON.parse(
      Buffer.from(process.env.GSHEETS_SA_KEY!, 'base64').toString('utf8')
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file'
      ]
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });
    
    const spreadsheetIds: string[] = [];

    for (const group of workbookGroups) {
      console.log(`\n📊 Creating Google Sheets workbook: ${group.title}`);
      
      // Create spreadsheet
      const workbookName = `${this.config.name}-${group.name}`;
      const createResponse = await drive.files.create({
        requestBody: {
          name: workbookName,
          mimeType: 'application/vnd.google-apps.spreadsheet',
        },
        fields: 'id',
      });

      const spreadsheetId = createResponse.data.id!;
      spreadsheetIds.push(spreadsheetId);

      // Create index sheet first
      await this.createGoogleIndexSheet(sheets, spreadsheetId, group);

      // Create vocabulary sheets
      for (const vocab of group.vocabularies) {
        await this.createGoogleVocabularySheet(sheets, spreadsheetId, vocab);
        console.log(`   📝 Added sheet: ${vocab.name} (${vocab.rowCount} rows)`);
      }

      // Remove default Sheet1
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
      const defaultSheet = spreadsheet.data.sheets?.find(s => s.properties?.title === 'Sheet1');
      if (defaultSheet) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{
              deleteSheet: {
                sheetId: defaultSheet.properties?.sheetId
              }
            }]
          }
        });
      }

      console.log(`   ✅ Created: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
    }

    return spreadsheetIds;
  }

  private async createGoogleIndexSheet(sheets: any, spreadsheetId: string, group: WorkbookGroup) {
    // Add index sheet
    const addIndexResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title: 'Index',
              index: 0
            }
          }
        }]
      }
    });

    const indexSheetId = addIndexResponse.data.replies[0].addSheet.properties.sheetId;

    // Populate index
    const indexRows = [
      ['Vocabulary Name', 'Title', 'Description', 'Directory', 'Row Count', 'Languages', 'Link']
    ];

    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    
    group.vocabularies.forEach(vocab => {
      const sheetId = spreadsheet.data.sheets?.find((s: any) => s.properties?.title === vocab.name)?.properties?.sheetId || 0;
      const link = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheetId}`;
      
      indexRows.push([
        vocab.name,
        vocab.title,
        vocab.description,
        vocab.relativeDir,
        vocab.rowCount.toString(),
        vocab.languages.join(', '),
        link
      ]);
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Index!A1',
      valueInputOption: 'RAW',
      requestBody: { values: indexRows }
    });

    // Format index sheet
    const indexColumnCount = 7;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          // Set column width to 80 pixels
          {
            updateDimensionProperties: {
              range: {
                sheetId: indexSheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: indexColumnCount
              },
              properties: {
                pixelSize: 80
              },
              fields: 'pixelSize'
            }
          },
          // Format all cells: wrap text, top alignment
          {
            repeatCell: {
              range: {
                sheetId: indexSheetId,
                startRowIndex: 0,
                endRowIndex: indexRows.length,
                startColumnIndex: 0,
                endColumnIndex: indexColumnCount
              },
              cell: {
                userEnteredFormat: {
                  wrapStrategy: 'WRAP',
                  verticalAlignment: 'TOP'
                }
              },
              fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
            }
          },
          // Bold header row
          {
            repeatCell: {
              range: {
                sheetId: indexSheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: indexColumnCount
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true
                  }
                }
              },
              fields: 'userEnteredFormat.textFormat.bold'
            }
          },
          // Freeze header row and first column
          {
            updateSheetProperties: {
              properties: {
                sheetId: indexSheetId,
                gridProperties: {
                  frozenRowCount: 1,
                  frozenColumnCount: 1
                }
              },
              fields: 'gridProperties.frozenRowCount,gridProperties.frozenColumnCount'
            }
          }
        ]
      }
    });
  }

  private async createGoogleVocabularySheet(sheets: any, spreadsheetId: string, vocab: VocabularyInfo) {
    // Create sheet
    const addSheetResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title: vocab.name
            }
          }
        }]
      }
    });

    const sheetId = addSheetResponse.data.replies[0].addSheet.properties.sheetId;

    // Load and add data
    const csvData = await this.loadCSVData(vocab.csvPath);
    const rows = [vocab.headers, ...csvData.map(row => vocab.headers.map(header => row[header] || ''))];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${vocab.name}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: rows }
    });

    // Format columns and cells
    const columnCount = vocab.headers.length;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          // Set column width to 80 pixels
          {
            updateDimensionProperties: {
              range: {
                sheetId: sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: columnCount
              },
              properties: {
                pixelSize: 80
              },
              fields: 'pixelSize'
            }
          },
          // Format all cells: wrap text, top alignment
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: rows.length,
                startColumnIndex: 0,
                endColumnIndex: columnCount
              },
              cell: {
                userEnteredFormat: {
                  wrapStrategy: 'WRAP',
                  verticalAlignment: 'TOP'
                }
              },
              fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment'
            }
          },
          // Bold header row
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: columnCount
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    bold: true
                  }
                }
              },
              fields: 'userEnteredFormat.textFormat.bold'
            }
          },
          // Freeze header row
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                gridProperties: {
                  frozenRowCount: 1,
                  frozenColumnCount: 1
                }
              },
              fields: 'gridProperties.frozenRowCount,gridProperties.frozenColumnCount'
            }
          }
        ]
      }
    });
  }

  private async loadCSVData(csvPath: string): Promise<any[]> {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    return parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
  }

  private createWorksheet(csvData: any[], headers: string[]): WorkSheet {
    const wsData = [headers, ...csvData.map(row => headers.map(header => row[header] || ''))];
    return xlsxUtils.aoa_to_sheet(wsData);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error(`
Usage: pnpm dlx tsx scripts/spreadsheet-api.ts <format> <name> [groupBy] [baseDir]

Arguments:
  format   - Output format: 'excel', 'google', or 'both'
  name     - Project name (used in file/workbook names)
  groupBy  - Grouping strategy: 'profile' (default), 'directory', or 'all'  
  baseDir  - Base directory to scan (default: standards/ISBDM/static/vocabs/xml_csv_new/ns/isbd)

Examples:
  pnpm dlx tsx scripts/spreadsheet-api.ts excel ISBDM profile
  pnpm dlx tsx scripts/spreadsheet-api.ts google ISBDM-Test directory
  pnpm dlx tsx scripts/spreadsheet-api.ts both MyProject all /path/to/csv/files
`);
    process.exit(1);
  }

  const format = args[0] as 'excel' | 'google' | 'both';
  const name = args[1];
  const groupBy = (args[2] || 'profile') as 'profile' | 'directory' | 'all';
  const baseDir = args[3] || '/Users/jonphipps/Code/IFLA/standards-dev/standards/ISBDM/static/vocabs/xml_csv_new/ns/isbd';

  if (!['excel', 'google', 'both'].includes(format)) {
    console.error('Format must be "excel", "google", or "both"');
    process.exit(1);
  }

  const config: SpreadsheetConfig = {
    name,
    baseDir,
    outputDir: path.join(process.cwd(), 'output', `${name}-spreadsheets`),
    groupBy
  };

  console.log(`🚀 Spreadsheet API: Creating ${format} workbooks for ${name}`);
  console.log(`📁 Scanning: ${baseDir}`);
  console.log(`📊 Grouping: ${groupBy}`);
  console.log(`📂 Output: ${config.outputDir}`);

  const api = new SpreadsheetAPI(config);
  
  // Discover vocabularies
  const vocabularies = await api.discoverVocabularies();
  console.log(`\n✅ Discovered ${vocabularies.length} vocabularies`);
  
  // Group into workbooks
  const workbookGroups = api.groupVocabularies(vocabularies);
  console.log(`📚 Created ${workbookGroups.length} workbook groups`);
  
  workbookGroups.forEach(group => {
    console.log(`   📖 ${group.title}: ${group.vocabularies.length} vocabularies, ${group.totalRows} total rows`);
  });

  // Create spreadsheets
  if (format === 'excel' || format === 'both') {
    console.log('\n📊 Creating Excel workbooks...');
    const excelPaths = await api.createExcelWorkbooks(workbookGroups);
    console.log(`✅ Created ${excelPaths.length} Excel workbooks`);
  }

  if (format === 'google' || format === 'both') {
    console.log('\n📊 Creating Google Sheets workbooks...');
    if (!process.env.GSHEETS_SA_KEY) {
      console.error('❌ GSHEETS_SA_KEY environment variable not set for Google Sheets');
      process.exit(1);
    }
    const googleIds = await api.createGoogleWorkbooks(workbookGroups);
    console.log(`✅ Created ${googleIds.length} Google Sheets workbooks`);
    googleIds.forEach(id => {
      console.log(`   🔗 https://docs.google.com/spreadsheets/d/${id}`);
    });
  }

  console.log('\n🎉 Spreadsheet creation complete!');
}

if (require.main === module) {
  main().catch(console.error);
}

export default SpreadsheetAPI;