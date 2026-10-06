import { cx } from '../utils/cx';
import { tokens } from '../generated/tokens';

const { caramelo, ferrugem, creme } = tokens.brand;

/** Desenho da Paçoca (viewBox -6 -6 222 212). Usado pelo Mascot e pelo AppIcon. */
export const mascotPaths = {
  body: 'M26 90 C26 84 32 80 40 79 L74 72 C82 70 86 62 94 56 C104 48 124 46 140 52 C158 58 166 76 168 96 C172 120 182 150 196 200 L72 200 C66 190 74 184 68 176 C62 168 72 162 68 154 C64 146 74 140 74 132 C70 126 64 122 58 118 C48 114 38 110 32 104 C27 100 25 95 26 90 Z',
  ear: 'M112 64 C128 56 148 62 150 78 C154 98 150 116 140 126 C136 132 128 132 124 126 C120 120 122 114 118 110 C112 96 104 78 112 64 Z',
  seam: 'M24 156 Q36 168 24 180 M44 156 Q32 168 44 180',
  seamGround: 'M-26 180 Q-16 190 -26 200 M-10 180 Q-20 190 -10 200',
} as const;

/*
  Cores que dependem do tema (tokens mascot-outline, mascot-nose e ball-outline da web):
  no escuro o corpo ganha contorno creme e o focinho fica mais escuro.
*/
const outline = 'var(--toski-mascot-outline)';
const nose = 'var(--toski-mascot-nose)';
const ballOutline = 'var(--toski-ball-outline)';

export interface MascotProps {
  /** Largura (px ou CSS). Padrão 100%. */
  width?: number | string;
  /**
   * bounce = bolinha pulando (1,8 s; parada com "reduzir movimento") · still = parada ·
   * ground = caída no chão, menor e apagada (erro / 404) · none = sem bolinha
   */
  ball?: 'bounce' | 'still' | 'ground' | 'none';
  /** Texto para leitores de tela. Sem ele a mascote é decorativa. */
  label?: string;
  className?: string;
}

/** Paçoca, a mascote da Toski Labs. */
export function Mascot({ width = '100%', ball = 'bounce', label, className }: MascotProps) {
  const viewBox = ball === 'ground' ? '-40 -6 250 212' : '-6 -6 222 212';
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg width={width} viewBox={viewBox} focusable="false" className={className} {...a11y}>
      {(ball === 'bounce' || ball === 'still') && (
        <g className={cx(ball === 'bounce' && 'toski-ball')} data-ball={ball}>
          <circle cx="34" cy="168" r="16" fill={caramelo} strokeWidth="5" style={{ stroke: ballOutline }} />
          <path d={mascotPaths.seam} fill="none" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: ballOutline }} />
        </g>
      )}
      {ball === 'ground' && (
        <g opacity="0.55" data-ball="ground">
          <circle cx="-18" cy="190" r="13" fill={caramelo} strokeWidth="4" style={{ stroke: 'var(--toski-background)' }} />
          <path
            d={mascotPaths.seamGround}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ stroke: 'var(--toski-background)' }}
          />
        </g>
      )}
      <path d={mascotPaths.body} fill={ferrugem} strokeWidth="5" strokeLinejoin="round" style={{ stroke: outline }} />
      <path d={mascotPaths.ear} fill={ferrugem} stroke={creme} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="96" cy="74" rx="4.4" ry="3" fill={creme} />
      <ellipse cx="31" cy="88" rx="7" ry="6" style={{ fill: nose }} />
    </svg>
  );
}
