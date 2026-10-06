import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../utils/cx';

export type CardVariant = 'surface' | 'plain' | 'hero' | 'dashed';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** surface = superfície com borda · plain = sem borda · hero = fundo da Paçoca · dashed = tracejado */
  variant?: CardVariant;
  /** card = raio 18 · panel = raio 28 */
  radius?: 'card' | 'panel';
  as?: 'div' | 'article' | 'section' | 'li' | 'aside';
}

const variants: Record<CardVariant, string> = {
  surface: 'bg-surface border border-line',
  plain: 'bg-surface',
  hero: 'bg-hero',
  dashed: 'border-2 border-dashed border-line',
};

export function Card({ variant = 'surface', radius = 'card', as = 'div', className, ...rest }: CardProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cx(variants[variant], radius === 'panel' ? 'rounded-panel' : 'rounded-card', className)}
      {...rest}
    />
  );
}
