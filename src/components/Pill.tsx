import type { HTMLAttributes } from 'react';
import { cx } from '../utils/cx';

export type PillVariant = 'status' | 'outline' | 'tag' | 'plus';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * status = fundo tint com bolinha de destaque ("Em desenvolvimento") ·
   * outline = só borda ("iPhone · iOS 18+") · tag = etiqueta de recurso · plus = etiqueta PLUS
   */
  variant?: PillVariant;
}

const styles: Record<PillVariant, string> = {
  status: 'h-8 gap-2 rounded-full bg-tint px-3.5 text-sm font-medium text-ink',
  outline: 'h-8 rounded-full border border-line px-3.5 text-sm font-medium text-muted',
  tag: 'h-8 rounded-[10px] bg-background px-3 text-sm text-ink',
  plus: 'h-[26px] rounded-full bg-accent px-2.5 text-xs font-semibold tracking-[0.04em] text-on-accent',
};

/** Etiqueta não interativa. */
export function Pill({ variant = 'tag', className, children, ...rest }: PillProps) {
  return (
    <span className={cx('inline-flex items-center whitespace-nowrap', styles[variant], className)} {...rest}>
      {variant === 'status' && <span className="size-2 rounded-full bg-accent" aria-hidden="true" />}
      {children}
    </span>
  );
}
