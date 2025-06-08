import React, {JSX} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

export default function NavbarTitle(): JSX.Element {
  const {
    siteConfig: {title, baseUrl, url},
  } = useDocusaurusContext();
  
  const portalLink = `${url}/portal/`;
  const logoSrc = useBaseUrl('img/logo-ifla_black.png');
  
  // Extract the standard tag from the title
  // Examples: "IFLA FR" -> "FR", "ISBDM" -> "ISBDM", "IFLA ISBD" -> "ISBD"
  let standardTag = '';
  let showBreadcrumb = false;
  
  if (title === 'ISBDM') {
    standardTag = 'ISBDM';
    showBreadcrumb = true;
  } else if (title.startsWith('IFLA ')) {
    standardTag = title.replace('IFLA ', '');
    showBreadcrumb = true;
  }
  
  // If this is the portal or no standard tag, show normal title
  if (!showBreadcrumb || title === 'IFLA Standards') {
    return (
      <Link
        to={useBaseUrl('/')}
        className={`navbar__brand ${styles.navbarTitle}`}
      >
        <div className="navbar__logo">
          <img
            src={logoSrc}
            alt="IFLA Logo"
            className={styles.logo}
          />
        </div>
        <b className={`navbar__title text--truncate ${styles.title}`}>{title}</b>
      </Link>
    );
  }
  
  // Breadcrumb style for standards: Logo + IFLA > StandardTag
  return (
    <div className={`navbar__brand ${styles.navbarTitle}`}>
      {/* Logo + IFLA link to portal */}
      <Link
        to={portalLink}
        className={styles.logoLink}
      >
        <div className="navbar__logo">
          <img
            src={logoSrc}
            alt="IFLA Logo"
            className={styles.logo}
          />
        </div>
        <b className={`navbar__title ${styles.title}`}>IFLA</b>
      </Link>
      
      {/* Separator */}
      <span className={styles.separator}>
        &rsaquo;
      </span>
      
      {/* Standard tag link to standard's index */}
      <Link
        to={useBaseUrl('/')}
        className={styles.standardLink}
      >
        <b className={`navbar__title ${styles.title}`}>{standardTag}</b>
      </Link>
    </div>
  );
}
