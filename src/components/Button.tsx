import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/cx';
import { Icon, type IconName } from './Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'light';
export type ButtonSize = 'lg' | 'md';

interface BaseProps {
  /** primary = destaque · secondary = superfície com borda · light = superfície sem borda */
  variant?: ButtonVariant;
  /** lg = 54px · md = 48px (raio 14) */
  size?: ButtonSize;
  /** Ícone depois do texto. */
  icon?: IconName;
  children: ReactNode;
}

type AsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = AsLink | AsButton;

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent font-semibold hover:bg-accent-hover',
  secondary: 'bg-surface text-ink font-medium border-[1.5px] border-line hover:border-accent',
  light: 'bg-surface text-ink font-medium hover:bg-tint',
};

const sizes: Record<ButtonSize, string> = {
  lg: 'h-[54px] px-6 text-[17px]',
  md: 'h-12 px-5 text-base',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'lg', className?: string) {
  return cx(
    'inline-flex min-w-11 items-center justify-center gap-2.5 rounded-button no-underline select-none',
    'transition-[color,background-color,border-color,scale] duration-150 active:scale-[0.97] motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );
}

/** Botão ou link com cara de botão (quando recebe href). Altura mínima 48px: passa a área de toque de 44px. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'lg', icon, children, className, ...rest } = props;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} stroke={2.2} />}
    </>
  );
  const classes = buttonClasses(variant, size, className);

  if (typeof rest.href === 'string') {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
