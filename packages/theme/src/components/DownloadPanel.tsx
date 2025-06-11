import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './DownloadPanel.module.css';

interface DownloadPanelProps {
  pdfUrl?: string;
  ttlUrl?: string;
  jsonLdUrl?: string;
  xmlUrl?: string;
  className?: string;
}

export default function DownloadPanel({
  pdfUrl,
  ttlUrl,
  jsonLdUrl,
  xmlUrl,
  className = '',
}: DownloadPanelProps): React.JSX.Element {
  return (
    <div className={clsx(styles.downloadPanel, className)}>
      <h2>Download Resources</h2>
      <div className={styles.downloadSections}>
        <div className={styles.downloadSection}>
          <h3>📄 Documentation</h3>
          <p>Download the complete standard documentation</p>
          {pdfUrl ? (
            <Link
              className="button button--primary button--block"
              to={pdfUrl}>
              Download PDF
            </Link>
          ) : (
            <button
              className="button button--primary button--block"
              disabled>
              Download PDF (Coming Soon)
            </button>
          )}
        </div>
        
        <div className={styles.downloadSection}>
          <h3>🔗 RDF Formats</h3>
          <p>Download the standard in various RDF serializations</p>
          <div className={styles.downloadButtons}>
            {ttlUrl ? (
              <Link
                className="button button--secondary button--block"
                to={ttlUrl}>
                TTL (Turtle)
              </Link>
            ) : (
              <button
                className="button button--secondary button--block"
                disabled>
                TTL (Coming Soon)
              </button>
            )}
            {jsonLdUrl ? (
              <Link
                className="button button--secondary button--block"
                to={jsonLdUrl}>
                JSON-LD
              </Link>
            ) : (
              <button
                className="button button--secondary button--block"
                disabled>
                JSON-LD (Coming Soon)
              </button>
            )}
            {xmlUrl ? (
              <Link
                className="button button--secondary button--block"
                to={xmlUrl}>
                RDF/XML
              </Link>
            ) : (
              <button
                className="button button--secondary button--block"
                disabled>
                RDF/XML (Coming Soon)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}