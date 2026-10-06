import type { SVGProps } from 'react';
import { iconData } from '../generated/icons';
import { cx } from '../utils/cx';

/**
 * Ícones de traço 24×24 (cor = currentColor). Desenhos em icons/svg/, os mesmos do app iOS.
 * Nome em inglês na web; `iconData[nome].mobile` é o nome no app (ex.: calendar → calendario).
 */
export { iconData };

export type IconName = keyof typeof iconData;
export const iconNames = Object.keys(iconData) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'stroke'> {
  name: IconName;
  /** Lado em px. Padrão 24. O tamanho do canvas está em iconData[name].size. */
  size?: number;
  /** Espessura do traço. Padrão 1,8. O traço do canvas está em iconData[name].stroke. */
  stroke?: number;
  /** Texto para leitores de tela. Sem ele o ícone é decorativo (aria-hidden). */
  label?: string;
}

type Shape = { readonly d?: string; readonly cx?: number; readonly cy?: number; readonly r?: number };

export function Icon({ name, size = 24, stroke = 1.8, label, className, ...rest }: IconProps) {
  const icon = iconData[name];
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  const paint = icon.filled
    ? { fill: 'currentColor', stroke: 'none' }
    : {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: stroke,
        strokeLinecap: 'round' as const,
        strokeLinejoin: (icon.linejoin ?? undefined) as 'round' | undefined,
      };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
      className={cx('shrink-0', className)}
      {...paint}
      {...a11y}
      {...rest}
    >
      {(icon.shapes as readonly Shape[]).map((s, i) =>
        s.d ? <path key={i} d={s.d} /> : <circle key={i} cx={s.cx} cy={s.cy} r={s.r} />,
      )}
    </svg>
  );
}
