import type { SVGProps } from 'react';
import { cx } from '../utils/cx';

/** Ícones de traço 24×24 (cor = currentColor). Mesmos desenhos do site. */
export const iconPaths = {
  'arrow-down': 'M12 5v14M5 12l7 7 7-7',
  'arrow-up': 'M12 19V5M5 12l7-7 7 7',
  'arrow-right': 'M5 12h14M12 5l7 7-7 7',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  calendar:
    'M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5ZM4 9.5h16M8.5 2.5v3M15.5 2.5v3',
  check: 'M20 6 9 17l-5-5',
  'chevron-down': 'm6 9 6 6 6-6',
  clock: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18ZM12 7v5l3 2',
  copy: 'M10.5 8h7A2.5 2.5 0 0 1 20 10.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 8 17.5v-7A2.5 2.5 0 0 1 10.5 8ZM16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9',
  heart:
    'M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  mail: 'M5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9A2.5 2.5 0 0 1 5.5 5ZM4 7l8 6 8-6',
  paw: 'M12 21c-3 0-5.5-1.6-5.5-4 0-2.6 2.5-5 5.5-5s5.5 2.4 5.5 5c0 2.4-2.5 4-5.5 4ZM5 11.5a2 2.5 0 1 0 0-.01M19 11.5a2 2.5 0 1 0 0-.01M9 6.5a2 2.5 0 1 0 0-.01M15 6.5a2 2.5 0 1 0 0-.01',
  phone:
    'M8 2.5h8a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2ZM11 18.5h2M9.5 10l1.7 1.7 3.3-3.4',
  plus: 'M12 5v14M5 12h14',
  repeat: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  share: 'M12 3v12M7 8l5-5 5 5M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5',
} as const;

export type IconName = keyof typeof iconPaths;
export const iconNames = Object.keys(iconPaths) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'stroke'> {
  name: IconName;
  /** Lado em px. Padrão 24. */
  size?: number;
  /** Espessura do traço. Padrão 1,8. */
  stroke?: number;
  /** Texto para leitores de tela. Sem ele o ícone é decorativo (aria-hidden). */
  label?: string;
}

export function Icon({ name, size = 24, stroke = 1.8, label, className, ...rest }: IconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={cx('shrink-0', className)}
      {...a11y}
      {...rest}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}
