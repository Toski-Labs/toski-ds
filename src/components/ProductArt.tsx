import { useId } from 'react';
import { productArt, type ProductId } from '../generated/products';

export type { ProductId };

/** Ajusta o SVG do produto: tamanho, acessibilidade e ids únicos (vários na mesma página). */
function inline(svg: string, uid: string, width: number | string, label?: string): string {
  let out = svg.replace(/<title>[^<]*<\/title>/, '');
  const open = out.slice(0, out.indexOf('>'));
  const viewBox = open.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 1 1';
  const [, , vw, vh] = viewBox.split(/\s+/).map(Number);
  const w = typeof width === 'number' ? `${width}` : width;
  const h = typeof width === 'number' ? `${Math.round((width * vh) / vw)}` : 'auto';
  const a11y = label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  out = out.replace(open, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}" ${a11y} focusable="false"`);
  for (const id of new Set([...out.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))) {
    out = out.replaceAll(`id="${id}"`, `id="${uid}-${id}"`).replaceAll(`url(#${id})`, `url(#${uid}-${id})`);
  }
  return out;
}

export interface ProductIconProps {
  product: ProductId;
  /** light = fundo claro · dark = escuro · tinted = monocromático (iOS 26). */
  variant?: 'light' | 'dark' | 'tinted';
  /** Lado em px. Padrão 64. */
  size?: number;
  /** Texto para leitores de tela. Sem ele o ícone é decorativo. */
  label?: string;
  className?: string;
}

/** Ícone do app de um produto (PetHealthTracker ou Koti). */
export function ProductIcon({ product, variant = 'light', size = 64, label, className }: ProductIconProps) {
  const uid = useId().replace(/:/g, '');
  const art = productArt[product] as Record<string, string>;
  const svg = art[`${product}-icon-${variant}`];
  if (!svg) return null;
  return <span className={className} style={{ display: 'inline-block', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: inline(svg, uid, size, label) }} />;
}

export interface ProductMascotProps {
  product: ProductId;
  /** pair = dupla · pair-base = dupla, base · pair-error = dupla, erro · ball-indigo = bolinha. */
  art?: 'pair' | 'pair-base' | 'pair-error' | 'ball-indigo';
  /** Sem `mode`, segue o tema da página (claro/escuro). */
  mode?: 'light' | 'dark';
  /** Largura (px ou CSS). Padrão 100%. */
  width?: number | string;
  /** Texto para leitores de tela. Sem ele a arte é decorativa. */
  label?: string;
  className?: string;
}

/** Mascotes de um produto, com o contorno na cor oposta ao fundo (claro/escuro). */
export function ProductMascot({ product, art = 'pair', mode, width = '100%', label, className }: ProductMascotProps) {
  const uid = useId().replace(/:/g, '');
  const arts = productArt[product] as Record<string, string>;
  const modes = mode ? [mode] : (['light', 'dark'] as const);
  return (
    <span className={className} style={{ display: 'inline-block', width: typeof width === 'number' ? width : width, lineHeight: 0 }}>
      {modes.map((m) => {
        const svg = arts[`${art}-${m}`];
        if (!svg) return null;
        return (
          <span
            key={m}
            data-art={mode ? undefined : m}
            style={{ display: 'block' }}
            dangerouslySetInnerHTML={{ __html: inline(svg, `${uid}${m}`, '100%', label) }}
          />
        );
      })}
    </span>
  );
}

export interface ProductLogoProps {
  product: ProductId;
  /** Sem `mode`, segue o tema da página: ameixa no claro, papel no escuro. */
  mode?: 'light' | 'dark';
  /** Largura (px ou CSS). Padrão 100%. */
  width?: number | string;
  /** Texto para leitores de tela. Sem ele o logotipo é decorativo. */
  label?: string;
  className?: string;
}

/** Logotipo do produto (Koti): versão para fundo claro ou escuro. */
export function ProductLogo({ product, mode, width = '100%', label, className }: ProductLogoProps) {
  const uid = useId().replace(/:/g, '');
  const arts = productArt[product] as Record<string, string>;
  const versions = (mode ? [mode] : (['light', 'dark'] as const)).map((m) => ({ m, svg: arts[`${product}-logo-${m === 'light' ? 'plum' : 'paper'}`] }));
  return (
    <span className={className} style={{ display: 'inline-block', width, lineHeight: 0 }}>
      {versions.map(({ m, svg }) =>
        svg ? (
          <span
            key={m}
            data-art={mode ? undefined : m}
            style={{ display: 'block' }}
            dangerouslySetInnerHTML={{ __html: inline(svg, `${uid}${m}`, '100%', label) }}
          />
        ) : null,
      )}
    </span>
  );
}
