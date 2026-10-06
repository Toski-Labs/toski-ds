import type { CSSProperties, ReactNode } from 'react';
import { colors, type Mode } from '../src/tokens';

/** Aplica as variáveis de um tema só dentro do quadro (para mostrar claro e escuro lado a lado). */
export function themeVars(mode: Mode): CSSProperties {
  const vars: Record<string, string> = { colorScheme: mode };
  for (const c of colors) vars[`--toski-${c.name}`] = c[mode];
  return vars as CSSProperties;
}

export function ThemeFrame({ mode, children, title }: { mode: Mode; children: ReactNode; title?: string }) {
  return (
    <section
      data-theme-frame={mode}
      style={themeVars(mode)}
      className="flex-1 rounded-card border border-line bg-background p-6 text-ink font-sans"
    >
      <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
        {title ?? (mode === 'light' ? 'Claro' : 'Escuro')}
      </p>
      {children}
    </section>
  );
}

/** Mostra o mesmo conteúdo no tema claro e no escuro. */
export function LightAndDark({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <ThemeFrame mode="light">{children}</ThemeFrame>
      <ThemeFrame mode="dark">{children}</ThemeFrame>
    </div>
  );
}
