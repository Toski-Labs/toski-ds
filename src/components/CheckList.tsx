import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import { Icon } from './Icon';

export interface CheckListProps {
  items: ReactNode[];
  /** success = verde (grátis) · accent = destaque (Plus, PDF) */
  tone?: 'success' | 'accent';
  /** Em duas ou mais colunas quando houver espaço. */
  columns?: boolean;
  className?: string;
}

export function CheckList({ items, tone = 'accent', columns = false, className }: CheckListProps) {
  return (
    <ul
      role="list"
      className={cx(
        columns ? 'grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-3.5' : 'flex flex-col gap-3.5',
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-[1.45] text-ink">
          <Icon name="check" size={20} stroke={2.4} className={cx('mt-px', tone === 'success' ? 'text-success' : 'text-accent')} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
