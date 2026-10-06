import { tokens } from '../generated/tokens';
import { mascotPaths } from './Mascot';

const { caramelo, ferrugem, creme, carvao } = tokens.brand;

export interface AppIconProps {
  /** Lado em px. Padrão 36. */
  size?: number;
  /** Costura da bolinha. Padrão true. */
  withBall?: boolean;
  /** Texto para leitores de tela. Sem ele o ícone é decorativo. */
  label?: string;
  className?: string;
}

/** Ícone da marca (caramelo), igual ao favicon e ao ícone do app. Mesmas cores nos dois temas. */
export function AppIcon({ size = 36, withBall = true, label, className }: AppIconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" focusable="false" className={className} {...a11y}>
      <rect width="180" height="180" rx="40" fill={caramelo} />
      <svg x="22" y="25" width="136" height="130" viewBox="-6 -6 222 212">
        <path d={mascotPaths.body} fill={ferrugem} stroke={creme} strokeWidth="5" strokeLinejoin="round" />
        <path d={mascotPaths.ear} fill={ferrugem} stroke={creme} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="96" cy="74" rx="4.4" ry="3" fill={creme} />
        <ellipse cx="31" cy="88" rx="7" ry="6" fill={carvao} />
        <circle cx="34" cy="168" r="16" fill={carvao} stroke={creme} strokeWidth="5" />
        {withBall && <path d={mascotPaths.seam} fill="none" stroke={creme} strokeWidth="2.5" strokeLinecap="round" />}
      </svg>
    </svg>
  );
}
