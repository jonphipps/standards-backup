import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';
import { FigureProps } from '../../types';

/**
 * Figure component for images with captions
 */
export const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  caption,
  className,
  width,
  height,
}) => {
  const imageSrc = useBaseUrl(src);

  return (
    <figure className={clsx(styles.figure, className)}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={styles.image}
      />
      {caption && (
        <figcaption className={styles.caption}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Figure;