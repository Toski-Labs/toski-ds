import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import { Kicker } from './Kicker';

export interface SectionHeadingProps {
  kicker?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** h1 no topo da página, h2 nas seções, h3 dentro de seções. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

const titleSizes = {
  h1: 'text-[clamp(36px,4.6vw,56px)] leading-[1.06] tracking-tight',
  h2: 'text-[clamp(30px,3.6vw,42px)] leading-[1.1] tracking-[-0.02em]',
  h3: 'text-[clamp(24px,2.6vw,30px)] leading-[1.15] tracking-[-0.01em]',
};

/** Rótulo + título + texto de apoio. */
export function SectionHeading({ kicker, title, lead, id, as: Tag = 'h2', className }: SectionHeadingProps) {
  return (
    <div className={cx('flex flex-col gap-2.5', className)}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <Tag id={id} className={cx('max-w-170 font-semibold text-balance text-ink', titleSizes[Tag])}>
        {title}
      </Tag>
      {lead && <p className="max-w-160 text-[17px] leading-normal text-muted">{lead}</p>}
    </div>
  );
}
