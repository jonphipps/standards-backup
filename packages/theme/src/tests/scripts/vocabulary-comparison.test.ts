/**
 * @jest-environment node
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

// Mock dependencies
vi.mock('fs', () => ({
    writeFileSync: vi.fn(),
    existsSync: vi.fn(() => true),
    mkdirSync: vi.fn()
}));

// Mock fetch globally before importing the module that uses it
const mockFetch = vi.fn() as Mock;
vi.stubGlobal('fetch', mockFetch);

// Now import the module after fetch is mocked
const { VocabularyComparisonTool } = await import('../../../../../scripts/vocabulary-comparison.mjs');

describe('VocabularyComparisonTool', () => {
    let tool: any;
    const mockApiKey = 'test-api-key';
    const mockSpreadsheetId = 'test-spreadsheet-id';

    beforeEach(() => {
        vi.clearAllMocks();

        // Default mock for the getAvailableSheets call in the constructor
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: async () => ({ sheets: [] }) // Default to empty sheets
        });

        tool = new VocabularyComparisonTool(mockApiKey, mockSpreadsheetId, {
            indexSheet: 'index',
            skipRdfCheck: true,
            markdown: false
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Constructor', () => {
        it('should initialize with correct default options', () => {
            const defaultTool = new VocabularyComparisonTool(mockApiKey, mockSpreadsheetId);
            
            expect(defaultTool.apiKey).toBe(mockApiKey);
            expect(defaultTool.spreadsheetId).toBe(mockSpreadsheetId);
            expect(defaultTool.options.indexSheet).toBe('index');
            expect(defaultTool.options.skipRdfCheck).toBe(false);
            expect(defaultTool.options.markdown).toBe(false);
            expect(defaultTool.options.outputPath).toBe('tmp/vocabulary-comparison-report.md');
        });

        it('should override default options with provided ones', () => {
            const customTool = new VocabularyComparisonTool(mockApiKey, mockSpreadsheetId, {
                indexSheet: 'custom-index',
                skipRdfCheck: true,
                markdown: true,
                outputPath: 'custom/output.md'
            });

            expect(customTool.options.indexSheet).toBe('custom-index');
            expect(customTool.options.skipRdfCheck).toBe(true);
            expect(customTool.options.markdown).toBe(true);
            expect(customTool.options.outputPath).toBe('custom/output.md');
        });
    });

    describe('getAvailableSheets', () => {
        it('should fetch and parse available sheets', async () => {
            // Mock the response for the test
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: 'OK',
                json: vi.fn().mockResolvedValue({
                    sheets: [
                        { properties: { title: 'Sheet1', sheetId: 123 } },
                        { properties: { title: 'Sheet2', sheetId: 456 } }
                    ]
                })
            };
            mockFetch.mockResolvedValueOnce(mockResponse);

            const result = await tool.getAvailableSheets();

            expect(result).toEqual([
                { title: 'Sheet1', sheetId: 123 },
                { title: 'Sheet2', sheetId: 456 }
            ]);
        });

        it('should throw error on failed API call', async () => {
            // Mock the response for the actual test
            const mockResponse = {
                ok: false,
                status: 401,
                statusText: 'Unauthorized'
            };
            mockFetch.mockResolvedValueOnce(mockResponse);

            await expect(tool.getAvailableSheets()).rejects.toThrow(
                'Failed to fetch spreadsheet metadata: Unauthorized'
            );
        });
    });

    describe('findMatchingSheet', () => {
        it('should find exact token match', () => {
            const sheets = [
                { title: 'isbdm-modeofissuance', sheetId: 1 },
                { title: 'isbdm-contentform', sheetId: 2 }
            ];
            const result = tool.findMatchingSheet(sheets, 'isbdm-modeofissuance', null);
            expect(result).toEqual({ title: 'isbdm-modeofissuance', sheetId: 1 });
        });

        it('should find exact title match', () => {
            const sheets = [
                { title: 'ISBDM Mode of Issuance', sheetId: 1 },
                { title: 'ISBDM Content Form', sheetId: 2 }
            ];
            const result = tool.findMatchingSheet(sheets, 'notfound', 'ISBDM Mode of Issuance');
            expect(result).toEqual({ title: 'ISBDM Mode of Issuance', sheetId: 1 });
        });

        it('should find special isbdu pattern match', () => {
            const sheets = [
                { title: 'UNC/Elements', sheetId: 1 },
                { title: 'Other Sheet', sheetId: 2 }
            ];
            const result = tool.findMatchingSheet(sheets, 'isbdu', null);
            expect(result).toEqual({ title: 'UNC/Elements', sheetId: 1 });
        });

        it('should find special isbd pattern match', () => {
            const sheets = [
                { title: 'Elements', sheetId: 1 },
                { title: 'Other Sheet', sheetId: 2 }
            ];
            const result = tool.findMatchingSheet(sheets, 'isbd', null);
            expect(result).toEqual({ title: 'Elements', sheetId: 1 });
        });

        it('should return undefined for no matches', () => {
            const sheets = [
                { title: 'ISBDM Mode of Issuance', sheetId: 1 },
                { title: 'ISBDM Content Form', sheetId: 2 }
            ];
            const result = tool.findMatchingSheet(sheets, 'nonexistent-token', null);
            expect(result).toBeUndefined();
        });
    });

    describe('parseColumnHeader', () => {
        it('should parse basic header', () => {
            const result = tool.parseColumnHeader('skos:prefLabel');
            expect(result).toEqual({
                property: 'skos:prefLabel',
                language: null,
                index: 0,
                original: 'skos:prefLabel'
            });
        });

        it('should parse header with language', () => {
            const result = tool.parseColumnHeader('skos:prefLabel@fr');
            expect(result).toEqual({
                property: 'skos:prefLabel',
                language: 'fr',
                index: 0,
                original: 'skos:prefLabel@fr'
            });
        });

        it('should parse header with array index', () => {
            const result = tool.parseColumnHeader('skos:prefLabel[2]');
            expect(result).toEqual({
                property: 'skos:prefLabel',
                language: null,
                index: 2,
                original: 'skos:prefLabel[2]'
            });
        });

        it('should parse header with language and array index', () => {
            const result = tool.parseColumnHeader('skos:prefLabel@fr[1]');
            expect(result).toEqual({
                property: 'skos:prefLabel',
                language: 'fr',
                index: 1,
                original: 'skos:prefLabel@fr[1]'
            });
        });

        it('should return null for empty header', () => {
            const result = tool.parseColumnHeader('');
            expect(result).toBe(null);
        });
    });

    describe('organizeColumns', () => {
        it('should organize columns by property and language', () => {
            const headers = ['URI', 'skos:prefLabel', 'skos:prefLabel@fr', 'skos:altLabel', 'skos:altLabel[1]'];
            const result = tool.organizeColumns(headers);

            expect(result).toBeInstanceOf(Map);
            expect(result.has('skos:prefLabel')).toBe(true);
            expect(result.has('skos:altLabel')).toBe(true);
            
            const prefLabelMap = result.get('skos:prefLabel');
            expect(prefLabelMap.has('default')).toBe(true);
            expect(prefLabelMap.has('fr')).toBe(true);
            expect(prefLabelMap.get('default')).toEqual([1]);
            expect(prefLabelMap.get('fr')).toEqual([2]);
            
            const altLabelMap = result.get('skos:altLabel');
            expect(altLabelMap.has('default')).toBe(true);
            expect(altLabelMap.get('default')).toEqual([3, 4]);
        });
    });

    describe('extractPropertyValues', () => {
        it('should extract single value for specified language', () => {
            const row = ['uri', 'English Label', 'French Label', 'Alt Label'];
            const propertyMap = new Map([
                ['en', [1]],
                ['fr', [2]]
            ]);
            const result = tool.extractPropertyValues(row, propertyMap, 'en');
            expect(result).toEqual(['English Label']);
        });

        it('should extract multiple values for repeatable property', () => {
            const row = ['uri', 'Alt Label 1', '', 'Alt Label 2'];
            const propertyMap = new Map([
                ['default', [1, , 3]] // sparse array
            ]);
            const result = tool.extractPropertyValues(row, propertyMap);
            expect(result).toEqual(['Alt Label 1', 'Alt Label 2']);
        });

        it('should fallback to default language', () => {
            const row = ['uri', 'English Label', '', ''];
            const propertyMap = new Map([
                ['en', [1]],
                ['de', [2]]
            ]);
            const result = tool.extractPropertyValues(row, propertyMap, 'fr');
            expect(result).toEqual(['English Label']);
        });
    });

    describe('hasValidRdfUri', () => {
        it('should validate RDF URIs', () => {
            expect(tool.hasValidRdfUri('http://example.com/concept')).toBe(true);
            expect(tool.hasValidRdfUri('https://example.com/concept')).toBe(true);
            expect(tool.hasValidRdfUri('not-a-uri')).toBe(false);
            expect(tool.hasValidRdfUri('')).toBe(false);
            expect(tool.hasValidRdfUri(null)).toBe(false);
        });
    });

    describe('isInstructionRow', () => {
        it('should identify instruction rows', () => {
            expect(tool.isInstructionRow('Instructions:', '')).toBe(true);
            expect(tool.isInstructionRow('This is a long instruction line that exceeds fifty characters', '')).toBe(true);
            expect(tool.isInstructionRow('instruction', '')).toBe(true);
            expect(tool.isInstructionRow('example', '')).toBe(true);
            expect(tool.isInstructionRow('', '')).toBe(true);
            expect(tool.isInstructionRow(null, '')).toBe(true);
        });

        it('should not identify valid data rows as instructions', () => {
            expect(tool.isInstructionRow('C001', 'http://example.com/C001')).toBe(false);
            expect(tool.isInstructionRow('Short token', 'http://example.com/concept')).toBe(false);
        });
    });

    describe('validateSkosStructure', () => {
        it('should validate concepts with all required properties', () => {
            const concepts = [
                {
                    uri: 'http://example.com/C001',
                    prefLabel: 'Test Label',
                    definition: 'Test Definition'
                }
            ];
            const result = tool.validateSkosStructure(concepts);
            expect(result.errors).toHaveLength(0);
            expect(result.warnings).toHaveLength(0);
        });

        it('should report missing URIs as errors', () => {
            const concepts = [
                {
                    prefLabel: 'Test Label',
                    definition: 'Test Definition',
                    rowIndex: 2
                }
            ];
            const result = tool.validateSkosStructure(concepts);
            expect(result.errors).toContain('Row 2: Missing URI');
        });

        it('should report missing labels as warnings', () => {
            const concepts = [
                {
                    uri: 'http://example.com/C001',
                    definition: 'Test Definition',
                    rowIndex: 3
                }
            ];
            const result = tool.validateSkosStructure(concepts);
            expect(result.warnings).toContain('Row 3: Missing preferred label');
        });
    });

    describe('normalizeText', () => {
        it('should normalize text correctly', () => {
            expect(tool.normalizeText('  Test  Text  ')).toBe('test text');
            expect(tool.normalizeText('Test\nText')).toBe('test text');
            expect(tool.normalizeText('Test\tText')).toBe('test text');
            expect(tool.normalizeText('')).toBe('');
            expect(tool.normalizeText(null)).toBe('');
            expect(tool.normalizeText(undefined)).toBe('');
        });
    });

    describe('escapeMarkdown', () => {
        it('should escape markdown special characters', () => {
            expect(tool.escapeMarkdown('*test*')).toBe('\\*test\\*');
            expect(tool.escapeMarkdown('_test_')).toBe('\\_test\\_');
            expect(tool.escapeMarkdown('[test]')).toBe('\\[test\\]');
            expect(tool.escapeMarkdown('`test`')).toBe('\\`test\\`');
            expect(tool.escapeMarkdown('normal text')).toBe('normal text');
        });
    });

    describe('truncateText', () => {
        it('should truncate long text', () => {
            const longText = 'a'.repeat(100);
            const result = tool.truncateText(longText, 50);
            expect(result).toBe('a'.repeat(50) + '...');
        });

        it('should not truncate short text', () => {
            const shortText = 'Short text';
            const result = tool.truncateText(shortText, 50);
            expect(result).toBe(shortText);
        });

        it('should handle empty text', () => {
            expect(tool.truncateText('', 50)).toBe('');
            expect(tool.truncateText(null, 50)).toBe('');
        });
    });

    describe('generateMarkdownReport', () => {
        it('should generate markdown report successfully', async () => {
            const results = {
                vocabularies: [
                    { token: 'test', title: 'Test Vocab', sheetId: 1, sheetName: 'Test' }
                ],
                errors: [],
                matches: [],
                mismatches: [],
                missing: []
            };

            tool.generateMarkdownReport(results);

            expect(writeFileSync).toHaveBeenCalledWith(
                'tmp/vocabulary-comparison-report.md',
                expect.stringContaining('# Vocabulary Comparison Report')
            );
        });

        it('should include error information in report', async () => {
            const results = {
                vocabularies: [
                    { token: 'test', title: 'Test Vocab', sheetId: 1, sheetName: 'Test' }
                ],
                errors: [
                    { vocabulary: 'test', message: 'Error 1' },
                    { vocabulary: 'test2', message: 'Error 2' }
                ],
                matches: [],
                mismatches: [],
                missing: []
            };

            tool.generateMarkdownReport(results);

            const content = (writeFileSync as Mock).mock.calls[0][1];
            expect(content).toContain('## 🚨 Errors');
            expect(content).toContain('Error 1');
            expect(content).toContain('Error 2');
        });

        it('should handle mismatches in report', async () => {
            const results = {
                vocabularies: [
                    { token: 'test', title: 'Test Vocab', sheetId: 1, sheetName: 'Test' }
                ],
                errors: [],
                matches: [],
                mismatches: [{
                    uri: 'http://example.com/C001',
                    sheetValues: {
                        prefLabel: 'Sheet Label',
                        definition: 'Sheet Definition',
                        notation: 'C001'
                    },
                    rdfValues: {
                        prefLabel: 'RDF Label',
                        definition: 'RDF Definition',
                        notation: 'C001'
                    },
                    prefLabelMatch: false,
                    definitionMatch: false,
                    notationMatch: true,
                    vocabularyTitle: 'Test Vocab'
                }],
                missing: []
            };

            tool.generateMarkdownReport(results);

            const content = (writeFileSync as Mock).mock.calls[0][1];
            expect(content).toContain('## ⚠️ Mismatches');
            expect(content).toContain('http://example.com/C001');
            expect(content).toContain('Sheet Label');
            expect(content).toContain('RDF Label');
        });
    });

    describe('Integration: fetchSheetData', () => {
        it('should fetch sheet data via API', async () => {
            // Mock the response for fetchSheetData
            const mockResponse = {
                ok: true,
                status: 200,
                statusText: 'OK',
                json: vi.fn().mockResolvedValue({
                    values: [
                        ['URI', 'skos:prefLabel', 'skos:definition'],
                        ['http://example.com/C001', 'Test Concept', 'A test concept']
                    ]
                })
            };
            mockFetch.mockResolvedValueOnce(mockResponse);

            const result = await tool.fetchSheetData('test-sheet');

            expect(result).toEqual([
                ['URI', 'skos:prefLabel', 'skos:definition'],
                ['http://example.com/C001', 'Test Concept', 'A test concept']
            ]);
        });

        it('should handle API errors', async () => {
            // Mock an error response
            const mockResponse = {
                ok: false,
                status: 404,
                statusText: 'Not Found'
            };
            mockFetch.mockResolvedValueOnce(mockResponse);

            await expect(tool.fetchSheetData('nonexistent-sheet')).rejects.toThrow(
                'Failed to fetch sheet nonexistent-sheet: Not Found'
            );
        });
    });
});