import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { OutLinkProps } from '../../types';

/**
 * OutLink component for external links with consistent styling
 */
export const OutLink: React.FC<OutLinkProps> = ({
  href,
  children,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={clsx(
        'linkOutline',
        styles.outLink,
        className
      )}
    >
      {children}
    </a>
  );
};

export default OutLink;