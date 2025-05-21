import { ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

export default function Button({ href, children, external, variant = 'normal' }: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={clsx(styles.button, styles[`variant-${variant}`])}
      >
        {children}
      </a>
    );
  }

  return <button className={clsx(styles.button, styles[`variant-${variant}`])}>{children}</button>;
}

export declare namespace ButtonProps {
  type Variant = 'normal' | 'primary';
}
export interface ButtonProps {
  children?: ReactNode;
  external?: boolean;
  href?: string;
  variant?: ButtonProps.Variant;
}
