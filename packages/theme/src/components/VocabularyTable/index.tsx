import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { VocabularyTableProps, ConceptProps, CSVConceptRow } from '../../types';

/**
 * Basic VocabularyTable component
 * This is a simplified version - the full implementation would include CSV loading,
 * multilingual support, filtering, sorting, etc.
 */
export const VocabularyTable: React.FC<VocabularyTableProps> = ({
  concepts = [],
  csvData = [],
  csvUrl,
  showFilter = true,
  filterPlaceholder = "Filter terms...",
  showTitle = true,
  showURIs = true,
  title = "Vocabulary",
  className,
  allowDownload = false,
  maxRows,
  sortable = true,
  compactMode = false,
}) => {
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ConceptProps[]>(concepts);

  // Load CSV data if URL provided
  useEffect(() => {
    if (csvUrl && !csvData.length) {
      setLoading(true);
      // In a real implementation, this would fetch and parse CSV
      // For now, just simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [csvUrl, csvData]);

  // Convert CSV data to concepts if needed
  useEffect(() => {
    if (csvData.length > 0) {
      const convertedConcepts = csvData.map((row, index) => ({
        id: row.id || `concept-${index}`,
        uri: row.uri || `#concept-${index}`,
        label: row.label || row.prefLabel || 'Untitled',
        definition: row.definition || row.description || '',
        scopeNote: row.scopeNote || '',
        ...row
      }));
      setData(convertedConcepts);
    }
  }, [csvData]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data;

    // Apply filter
    if (filter) {
      filtered = data.filter(concept =>
        (typeof concept.label === 'string' ? concept.label : concept.label?.en || '')
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        (typeof concept.definition === 'string' ? concept.definition : concept.definition?.en || '')
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    }

    // Apply sorting
    if (sortField && sortable) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof ConceptProps] || '';
        const bValue = b[sortField as keyof ConceptProps] || '';
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Apply max rows limit
    if (maxRows && maxRows > 0) {
      filtered = filtered.slice(0, maxRows);
    }

    return filtered;
  }, [data, filter, sortField, sortDirection, maxRows, sortable]);

  const handleSort = (field: string) => {
    if (!sortable) return;
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderCellValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value?.en) return value.en;
    return String(value || '');
  };

  if (loading) {
    return (
      <div className={clsx(styles.vocabularyTable, className)}>
        <div className={styles.loading}>Loading vocabulary...</div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.vocabularyTable, {
      [styles.compact]: compactMode
    }, className)}>
      {showTitle && title && (
        <h3 className={styles.title}>{title}</h3>
      )}
      
      {showFilter && (
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder={filterPlaceholder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterInput}
          />
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th 
                className={sortable ? styles.sortable : ''}
                onClick={() => handleSort('label')}
              >
                Term
                {sortField === 'label' && (
                  <span className={styles.sortIndicator}>
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                className={sortable ? styles.sortable : ''}
                onClick={() => handleSort('definition')}
              >
                Definition
                {sortField === 'definition' && (
                  <span className={styles.sortIndicator}>
                    {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              {showURIs && (
                <th 
                  className={sortable ? styles.sortable : ''}
                  onClick={() => handleSort('uri')}
                >
                  URI
                  {sortField === 'uri' && (
                    <span className={styles.sortIndicator}>
                      {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {processedData.map((concept, index) => (
              <tr key={concept.id || index}>
                <td className={styles.termCell}>
                  <strong>{renderCellValue(concept.label)}</strong>
                  {concept.altLabel && (
                    <div className={styles.altLabel}>
                      Alt: {renderCellValue(concept.altLabel)}
                    </div>
                  )}
                </td>
                <td className={styles.definitionCell}>
                  {renderCellValue(concept.definition)}
                  {concept.scopeNote && (
                    <div className={styles.scopeNote}>
                      <em>Scope: {renderCellValue(concept.scopeNote)}</em>
                    </div>
                  )}
                </td>
                {showURIs && (
                  <td className={styles.uriCell}>
                    <code>{concept.uri}</code>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {processedData.length === 0 && (
        <div className={styles.noResults}>
          No terms found matching your search.
        </div>
      )}

      {allowDownload && (
        <div className={styles.downloadSection}>
          <button className={styles.downloadButton}>
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabularyTable;