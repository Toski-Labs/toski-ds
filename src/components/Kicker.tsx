import type { HTMLAttributes } from 'react';
import { cx } from '../utils/cx';

export interface KickerProps extends HTMLAttributes<HTMLElement> {
  tone?: 'accent' | 'muted';
  as?: 'p' | 'span' | 'div';
}

/** Rótulo de seção: 13px, 600, caixa alta, espaçado. */
export function Kicker({ tone = 'accent', as: Tag = 'p', className, ...rest }: KickerProps) {
  return (
    <Tag
      className={cx(
        'text-[13px] font-semibold uppercase tracking-[0.06em]',
        tone === 'accent' ? 'text-accent-text' : 'text-muted',
        className,
      )}
      {...rest}
    />
  );
}
