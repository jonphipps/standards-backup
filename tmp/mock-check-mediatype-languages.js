
import { writeFileSync } from 'fs';
import path from 'path';

// Mock language detection
const mockDetectLanguage = (text, declaredLang) => {
  // Simple mock: detect Chinese characters
  if (/[\u4e00-\u9fa5]/.test(text)) return { lang: 'zh', confidence: 0.95 };
  // Mock Spanish text
  if (text.toLowerCase().includes('español') || text.toLowerCase().includes('hola')) return { lang: 'es', confidence: 0.92 };
  // Mock French text  
  if (text.toLowerCase().includes('français') || text.toLowerCase().includes('bonjour')) return { lang: 'fr', confidence: 0.93 };
  // Mock English text
  if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('world')) return { lang: 'en', confidence: 0.94 };
  // Default to declared language
  return { lang: declaredLang, confidence: 0.85 };
};

// Parse arguments
const args = process.argv.slice(2);
const outputMarkdown = args.includes('--markdown') || args.includes('-md');
const useAI = args.includes('--ai');
const testMode = args.includes('--test');

// Mock data
const mockSheetData = [
  { 
    name: 'test-sheet',
    data: [
      ['uri', 'skos:prefLabel@en', 'skos:prefLabel@es', 'skos:prefLabel@zh'],
      ['test:001', 'Hello world', 'Hola mundo', '你好世界'],
      ['test:002', 'Good morning', 'Buenos días', 'Bonjour'], // French text in Chinese column
      ['test:003', 'Test', 'español correcto', '中文正确']
    ]
  }
];

const mismatches = [];

// Process mock data
mockSheetData.forEach(sheet => {
  const headers = sheet.data[0];
  
  for (let rowIdx = 1; rowIdx < sheet.data.length; rowIdx++) {
    const row = sheet.data[rowIdx];
    const uri = row[0];
    
    for (let colIdx = 1; colIdx < headers.length; colIdx++) {
      const header = headers[colIdx];
      const value = row[colIdx];
      
      if (!value) continue;
      
      const langMatch = header.match(/@([a-z]{2})/);
      if (!langMatch) continue;
      
      const declaredLang = langMatch[1];
      const detection = mockDetectLanguage(value, declaredLang);
      
      if (detection.lang !== declaredLang && detection.confidence > 0.9) {
        mismatches.push({
          sheet: sheet.name,
          row: rowIdx + 1,
          uri: uri,
          column: header,
          declared: declaredLang,
          detected: detection.lang,
          confidence: detection.confidence,
          text: value
        });
      }
    }
  }
});

// Output results
if (outputMarkdown) {
  const reportPath = path.join(process.cwd(), 'tmp', `language-tag-mismatches${useAI ? '-ai' : ''}.md`);
  const markdown = `# Language Tag Mismatch Report
Generated: ${new Date().toISOString()}

## Summary
Total mismatches found: **${mismatches.length}**

## Detailed Findings

| URI | Row | Column | Declared | Detected | Confidence | Text |
|-----|-----|--------|----------|----------|------------|------|
${mismatches.map(m => `| ${m.uri} | ${m.row} | ${m.column} | ${m.declared} | ${m.detected} | ${(m.confidence * 100).toFixed(1)}% | ${m.text} |`).join('\n')}
`;
  
  writeFileSync(reportPath, markdown);
  console.log(`Markdown report saved to: ${reportPath}`);
} else {
  console.log(`Found ${mismatches.length} language mismatches`);
  mismatches.forEach(m => {
    console.log(`Row ${m.row}: ${m.declared} -> ${m.detected} (${m.text})`);
  });
}
