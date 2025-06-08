import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './QuickStart.module.css';

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
    <div className={clsx(styles.quickstartPanel, className)}>
      <h2>Quick Start for Cataloguers</h2>
      <p>Get started with the key sections of this standard:</p>
      <div className={styles.quickstartLinks}>
        <Link
          className={clsx('button', 'button--primary', 'button--lg', styles.quickstartLink)}
          to={introductionPath}>
          📖 Introduction
        </Link>
        <Link
          className={clsx('button', 'button--secondary', 'button--lg', styles.quickstartLink)}
          to={elementsPath}>
          🔧 Elements
        </Link>
        <Link
          className={clsx('button', 'button--secondary', 'button--lg', styles.quickstartLink)}
          to={examplesPath}>
          💡 Examples
        </Link>
      </div>
    </div>
  );
}