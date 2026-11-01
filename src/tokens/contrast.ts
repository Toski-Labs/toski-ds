/** Contraste WCAG 2.x entre duas cores hex (#RRGGBB). */

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Cor inválida: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(h.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Cor translúcida (`rgba(r,g,b,a)`) sobre uma cor opaca (#RRGGBB) → #RRGGBB. Hex sem alpha volta igual. */
export function compositeOver(fg: string, bg: string): string {
  const m = fg.trim().match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (!m) return fg;
  const alpha = Number(m[4] ?? '1');
  const under = bg.replace('#', '');
  const out = [1, 2, 3].map((i) => {
    const over = Number(m[i]);
    const below = parseInt(under.slice((i - 1) * 2, (i - 1) * 2 + 2), 16);
    return Math.round(over * alpha + below * (1 - alpha))
      .toString(16)
      .padStart(2, '0');
  });
  return `#${out.join('').toUpperCase()}`;
}

export const MIN_TEXT = 4.5;
export const MIN_LARGE = 3;
