import { cx } from '../utils/cx';
import { Icon, type IconName } from './Icon';

export interface IconBoxProps {
  name: IconName;
  /** md = 48px (raio 12) · lg = 88px (raio 20) */
  size?: 'md' | 'lg';
  /** Fundo da caixa: tint (padrão) ou surface (quando o card já é tint/hero). */
  on?: 'tint' | 'surface';
  /** Cor do ícone. */
  tone?: 'accent' | 'muted';
  /** Texto para leitores de tela. Sem ele a caixa é decorativa. */
  label?: string;
  className?: string;
}

export function IconBox({ name, size = 'md', on = 'tint', tone = 'accent', label, className }: IconBoxProps) {
  return (
    <span
      className={cx(
        'flex shrink-0 items-center justify-center',
        tone === 'accent' ? 'text-accent' : 'text-muted',
        size === 'lg' ? 'size-22 rounded-[20px]' : 'size-12 rounded-icon',
        on === 'tint' ? 'bg-tint' : 'bg-surface',
        className,
      )}
    >
      <Icon name={name} size={size === 'lg' ? 36 : 24} stroke={size === 'lg' ? 1.6 : 1.8} label={label} />
    </span>
  );
}
