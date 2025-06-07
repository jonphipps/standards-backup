import React from 'react';
import Link from '@docusaurus/Link';

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
}: DownloadPanelProps): JSX.Element {
  return (
    <div className={`download-panel ${className}`}>
      <h2>Download Resources</h2>
      <div className="download-sections">
        <div className="download-section">
          <h3>📄 Documentation</h3>
          <p>Download the complete standard documentation</p>
          <Link
            className="button button--primary button--block"
            to={pdfUrl || '#'}
            disabled={!pdfUrl}>
            Download PDF
          </Link>
        </div>
        
        <div className="download-section">
          <h3>🔗 RDF Formats</h3>
          <p>Download the standard in various RDF serializations</p>
          <div className="download-buttons">
            <Link
              className="button button--secondary button--block"
              to={ttlUrl || '#'}
              disabled={!ttlUrl}>
              TTL (Turtle)
            </Link>
            <Link
              className="button button--secondary button--block"
              to={jsonLdUrl || '#'}
              disabled={!jsonLdUrl}>
              JSON-LD
            </Link>
            <Link
              className="button button--secondary button--block"
              to={xmlUrl || '#'}
              disabled={!xmlUrl}>
              RDF/XML
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .download-panel {
          background: var(--ifm-card-background-color);
          border-radius: var(--ifm-card-border-radius);
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: var(--ifm-global-shadow-lw);
        }
        .download-panel h2 {
          margin-top: 0;
          color: var(--ifm-heading-color);
        }
        .download-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .download-section {
          background: var(--ifm-background-surface-color);
          padding: 1.5rem;
          border-radius: var(--ifm-card-border-radius);
          border: 1px solid var(--ifm-color-emphasis-200);
        }
        .download-section h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
        .download-section p {
          color: var(--ifm-color-secondary-darker);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .download-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .download-sections {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}