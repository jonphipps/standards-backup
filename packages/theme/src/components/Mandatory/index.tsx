import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { MandatoryProps } from '../../types';

/**
 * Mandatory component to highlight required information
 */
export const Mandatory: React.FC<MandatoryProps> = ({
  children,
  className,
}) => {
  return (
    <span className={clsx(styles.mandatory, className)}>
      {children}
    </span>
  );
};

export default Mandatory;