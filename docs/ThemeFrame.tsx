import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { themedColors, type Mode } from '../src/tokens';

/** Produto escolhido na barra do Storybook (data-product no <html>). undefined = Toski Labs. */
export function useProduct(): string | undefined {
  const read = () => document.documentElement.getAttribute('data-product') ?? undefined;
  const [product, setProduct] = useState<string | undefined>(typeof document === 'undefined' ? undefined : read());
  useEffect(() => {
    setProduct(read());
    const observer = new MutationObserver(() => setProduct(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-product'] });
    return () => observer.disconnect();
  }, []);
  return product;
}

/** Aplica as variáveis de um tema só dentro do quadro (para mostrar claro e escuro lado a lado). */
export function themeVars(mode: Mode, product?: string): CSSProperties {
  const vars: Record<string, string> = { colorScheme: mode };
  for (const c of themedColors('web', product)) vars[`--toski-${c.name}`] = c[mode];
  return vars as CSSProperties;
}

export function ThemeFrame({ mode, children, title }: { mode: Mode; children: ReactNode; title?: string }) {
  const product = useProduct();
  return (
    <section
      data-theme-frame={mode}
      style={themeVars(mode, product)}
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
