// Main component exports for IFLA theme

// Core components
export { default as ElementReference } from './ElementReference';
export { default as VocabularyTable } from './VocabularyTable';

// Link components
export { default as InLink } from './InLink';
export { default as OutLink } from './OutLink';

// Content components
export { default as SeeAlso } from './SeeAlso';
export { default as Mandatory } from './Mandatory';
export { default as Unique } from './Unique';
export { default as Figure } from './Figure';
export { default as ExampleTable } from './ExampleTable';

// Legacy exports for backward compatibility
export { default as DownloadPanel } from './DownloadPanel';
export { default as QuickStart } from './QuickStart';

// Re-export types
export type {
  ElementReferenceProps,
  VocabularyTableProps,
  InLinkProps,
  OutLinkProps,
  SeeAlsoProps,
  MandatoryProps,
  UniqueProps,
  FigureProps,
  ExampleTableProps,
  ConceptProps,
  RDFData,
  MultilingualText,
  LanguageConfig,
  CSVConceptRow,
  TOCItem,
  UriCaseStyle,
  RDFMetadata,
  IFLAThemeConfig,
  VocabularyDefaults
} from '../types';