import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { SeeAlsoProps } from '../../types';

/**
 * SeeAlso component for "See also" references with consistent styling
 */
export const SeeAlso: React.FC<SeeAlsoProps> = ({
  children,
  className,
}) => {
  return (
    <span className={clsx('seeAlsoAdd', styles.seeAlso, className)}>
      <strong>See also: </strong>
      {children}
    </span>
  );
};

export default SeeAlso;