import { ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export default function SpaceBetween({ children, direction = 'vertical', size }: SpaceProps) {
  return (
    <div className={clsx(styles.wrapper, styles[`direction-${direction}`], styles[`size-${size}`])}>
      {children}
    </div>
  );
}

export declare namespace SpaceProps {
  type Size = 's' | 'm' | 'l';
  type Direction = 'horizontal' | 'vertical';
}
export interface SpaceProps {
  children?: ReactNode;
  direction?: SpaceProps.Direction;
  size: SpaceProps.Size;
}
