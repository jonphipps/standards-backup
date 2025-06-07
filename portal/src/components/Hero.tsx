import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Hero.module.css';

export default function Hero(): JSX.Element {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to the IFLA Standards Workspace
          </h1>
          <p className={styles.heroSubtitle}>
            A collaborative platform for IFLA Review Group members and editors to develop and maintain bibliographic standards
          </p>
          
          <div className={styles.heroActions}>
            <Link
              className="button button--primary button--lg"
              to="/sheets/pull">
              Pull Sheet
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/new">
              New Page
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/releases/draft">
              Draft Release
            </Link>
          </div>
          
          <div className={styles.heroDescription}>
            <h2>For Editors and Review Group Members</h2>
            <p>
              This workspace provides tools and resources to help you:
            </p>
            <ul>
              <li>Collaborate on standard development and revisions</li>
              <li>Manage vocabulary sheets and RDF resources</li>
              <li>Track changes and review proposals</li>
              <li>Prepare and publish standard releases</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}