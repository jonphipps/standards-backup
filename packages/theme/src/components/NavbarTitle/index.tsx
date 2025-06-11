import React, {JSX, useState, useRef, useEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

export default function NavbarTitle(): JSX.Element {
  const {
    siteConfig: {title, baseUrl, url},
  } = useDocusaurusContext();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const portalLink = '/portal/';
  const logoSrc = '/portal/img/logo-ifla_black.png';
  
  // Define all standards in alphabetical order
  const standards = [
    { code: 'FR', title: 'FR', path: '/fr/' },
    { code: 'ISBD', title: 'ISBD', path: '/isbd/' },
    { code: 'ISBDM', title: 'ISBDM', path: '/ISBDM/' },
    { code: 'LRM', title: 'LRM', path: '/LRM/' },
    { code: 'MULDICAT', title: 'MULDICAT', path: '/muldicat/' },
    { code: 'UNIMARC', title: 'UNIMARC', path: '/unimarc/' }
  ];
  
  // Extract the standard tag from the title
  let standardTag = '';
  let currentStandard = null;
  let showBreadcrumb = false;
  
  if (title === 'ISBDM') {
    standardTag = 'ISBDM';
    currentStandard = standards.find(s => s.code === 'ISBDM');
    showBreadcrumb = true;
  } else if (title && title.startsWith('IFLA ')) {
    standardTag = title.replace('IFLA ', '');
    currentStandard = standards.find(s => s.code === standardTag);
    showBreadcrumb = true;
  }
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // If this is the portal or no standard tag, show normal title
  if (!showBreadcrumb || !title || title === 'IFLA Standards') {
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
        <b className={`navbar__title text--truncate ${styles.title}`}>{title || 'IFLA Standards'}</b>
      </Link>
    );
  }
  
  // Breadcrumb style for standards: Logo + IFLA > StandardTag with dropdown
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
      
      {/* Standard dropdown */}
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          className={styles.dropdownToggle}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <b className={`navbar__title ${styles.title}`}>{standardTag}</b>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {standards.map((standard) => (
              <a
                key={standard.code}
                href={`${url}${standard.path}`}
                className={`${styles.dropdownItem} ${
                  currentStandard?.code === standard.code ? styles.active : ''
                }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                {standard.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
