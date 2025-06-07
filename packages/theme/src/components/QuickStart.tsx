import React from 'react';
import Link from '@docusaurus/Link';

interface QuickStartProps {
  introductionPath?: string;
  elementsPath?: string;
  examplesPath?: string;
  className?: string;
}

export default function QuickStart({
  introductionPath = '/docs/intro',
  elementsPath = '/docs/elements',
  examplesPath = '/docs/examples',
  className = '',
}: QuickStartProps): JSX.Element {
  return (
    <div className={`quickstart-panel ${className}`}>
      <h2>Quick Start for Cataloguers</h2>
      <p>Get started with the key sections of this standard:</p>
      <div className="quickstart-links">
        <Link
          className="button button--primary button--lg quickstart-link"
          to={introductionPath}>
          📖 Introduction
        </Link>
        <Link
          className="button button--secondary button--lg quickstart-link"
          to={elementsPath}>
          🔧 Elements
        </Link>
        <Link
          className="button button--secondary button--lg quickstart-link"
          to={examplesPath}>
          💡 Examples
        </Link>
      </div>
      <style jsx>{`
        .quickstart-panel {
          background: var(--ifm-card-background-color);
          border-radius: var(--ifm-card-border-radius);
          padding: 2rem;
          margin: 2rem 0;
          box-shadow: var(--ifm-global-shadow-lw);
        }
        .quickstart-panel h2 {
          margin-top: 0;
          color: var(--ifm-heading-color);
        }
        .quickstart-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }
        .quickstart-link {
          flex: 1;
          min-width: 200px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .quickstart-links {
            flex-direction: column;
          }
          .quickstart-link {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}