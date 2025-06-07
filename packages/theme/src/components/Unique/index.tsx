import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { UniqueProps } from '../../types';

/**
 * Unique component to highlight unique or special information
 */
export const Unique: React.FC<UniqueProps> = ({
  children,
  className,
}) => {
  return (
    <span className={clsx(styles.unique, className)}>
      {children}
    </span>
  );
};

export default Unique;