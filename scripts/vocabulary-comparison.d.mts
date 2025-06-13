export declare class VocabularyComparisonTool {
    constructor(apiKey: string, spreadsheetId: string, options?: {
        indexSheet?: string;
        skipRdfCheck?: boolean;
        markdown?: boolean;
        outputPath?: string;
    });

    apiKey: string;
    spreadsheetId: string;
    baseGoogleSheetsUrl: string;
    options: {
        indexSheet: string;
        skipRdfCheck: boolean;
        markdown: boolean;
        outputPath: string;
    };
    vocabularies: any[];
    results: {
        matches: any[];
        mismatches: any[];
        missing: any[];
        errors: any[];
    };
    availableSheets: { title: string; sheetId: string; }[];

    runComparison(): Promise<void>;
    loadVocabularies(): Promise<void>;
    getAvailableSheets(): Promise<{ title: string; sheetId: string; }[]>;
    findMatchingSheet(availableSheets: { title: string; sheetId: string; }[], token: string, title: string): { title: string; sheetId: string; } | undefined;
    findColumn(headers: string[], possibleNames: string[]): number;
    isInstructionRow(token: string, uri: string): boolean;
    hasValidRdfUri(uri: string): boolean;
    validateSheetStructure(vocab: any): Promise<void>;
    validateSkosStructure(concepts: any[]): { errors: string[]; warnings: string[]; };
    compareVocabulary(vocab: any): Promise<void>;
    fetchSheetData(sheetName: string): Promise<string[][]>;
    parseColumnHeader(header: string): { property: string; language: string | null; index: number; original: string; } | null;
    organizeColumns(headers: string[]): Map<string, Map<string | null, number[]>>;
    extractPropertyValues(row: string[], propertyMap: Map<string | null, number[]> | undefined, lang: string | null): string[];
    normalizeText(text: string): string;
    escapeMarkdown(text: string): string;
    truncateText(text: string, maxLength: number): string;
    fetchSheetConcepts(sheetName: string, vocab: any): Promise<any[]>;
    fetchRdfConcepts(rdfUrl: string): Promise<any[]>;
    parseRdfConcepts(rdfString: string, baseUri: string): any[];
    compareConcepts(vocab: any, sheetConcepts: any[], rdfConcepts: any[]): { matches: any[]; mismatches: any[]; missing: any[]; };
    generateReport(): any;
    generateMarkdownReport(results: any): void;
    saveReport(content: string): void;
    expandUri(uri: string, vocab: any): string;
}
