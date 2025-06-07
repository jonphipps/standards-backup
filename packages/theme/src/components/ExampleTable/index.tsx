import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { ExampleTableProps } from '../../types';

/**
 * ExampleTable component for collapsible example content
 */
export const ExampleTable: React.FC<ExampleTableProps> = ({
  children,
  title = "Examples",
  className,
  collapsible = true,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  if (!collapsible) {
    return (
      <div className={clsx(styles.exampleTable, styles.nonCollapsible, className)}>
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.exampleTable, className)}>
      <button
        className={styles.trigger}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="example-content"
      >
        <span className={styles.title}>{title}</span>
        <span className={clsx(styles.icon, { [styles.open]: isOpen })}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div
          id="example-content"
          className={styles.content}
          role="region"
          aria-labelledby="example-trigger"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ExampleTable;