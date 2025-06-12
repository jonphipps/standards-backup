import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { getSiteUrl, type SiteKey } from '@ifla/theme/config/siteConfig';

type StandardItem = {
  title: string;
  code: string;
  description: ReactNode;
  href: string;
  status: 'published' | 'draft' | 'development';
};

const StandardsList: StandardItem[] = [
  {
    title: 'ISBD for Manifestation (ISBDM)',
    code: 'ISBDM',
    description: (
      <>
        International Standard Bibliographic Description for Manifestation provides rules for creating 
        consistent bibliographic descriptions of library materials in their physical or digital form.
      </>
    ),
    href: getSiteUrl('ISBDM' as SiteKey),
    status: 'published',
  },
  {
    title: 'Library Reference Model (LRM)',
    code: 'LRM',
    description: (
      <>
        A high-level conceptual model that provides a framework for understanding the bibliographic universe 
        and the relationships between bibliographic entities.
      </>
    ),
    href: getSiteUrl('LRM' as SiteKey),
    status: 'published',
  },
  {
    title: 'International Standard Bibliographic Description (ISBD)',
    code: 'ISBD',
    description: (
      <>
        The foundational standard for bibliographic description, providing rules for creating consistent 
        and comprehensive bibliographic records across all types of library materials.
      </>
    ),
    href: getSiteUrl('isbd' as SiteKey),
    status: 'development',
  },
  {
    title: 'Functional Requirements (FR)',
    code: 'FR',
    description: (
      <>
        Specifications for functional requirements that support discovery, identification, selection, 
        and access to bibliographic resources.
      </>
    ),
    href: getSiteUrl('fr' as SiteKey),
    status: 'development',
  },
  {
    title: 'Multilingual Dictionary of Cataloguing Terms (MulDiCat)',
    code: 'MulDiCat',
    description: (
      <>
        A comprehensive multilingual dictionary providing standardized cataloguing terminology 
        to support international library cooperation.
      </>
    ),
    href: getSiteUrl('muldicat' as SiteKey),
    status: 'development',
  },
  {
    title: 'UNIMARC',
    code: 'UNIMARC',
    description: (
      <>
        Universal MARC format designed to facilitate the international exchange of bibliographic data 
        and support library automation.
      </>
    ),
    href: getSiteUrl('unimarc' as SiteKey),
    status: 'development',
  },
];

function StandardCard({title, code, description, href, status}: StandardItem) {
  const statusClass = status === 'published' ? styles.statusPublished : 
                     status === 'draft' ? styles.statusDraft : styles.statusDevelopment;
  
  return (
    <div className={clsx('col col--6', styles.standardCard)}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <Heading as="h3">{title}</Heading>
            <span className={clsx(styles.statusBadge, statusClass)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        <div className={styles.cardBody}>
          <p>{description}</p>
        </div>
        <div className={styles.cardFooter}>
          <Link
            className="button button--primary button--block"
            to={href}>
            View {code} Standard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features} id="standards">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">IFLA Standards</Heading>
          <p className={styles.sectionDescription}>
            Explore our comprehensive collection of international bibliographic standards, 
            developed through collaborative efforts with library professionals worldwide.
          </p>
        </div>
        <div className="row">
          {StandardsList.map((props, idx) => (
            <StandardCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
