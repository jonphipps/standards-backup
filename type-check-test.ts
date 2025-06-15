// Test file to check types
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';

// Let's see what the actual type is
const allDocsData = useAllDocsData();

// Export the type for inspection
export type AllDocsDataType = typeof allDocsData;
