/**
 * Leitura tipada de tokens/tokens.json, usada pelos scripts e pelas páginas do Storybook.
 *
 * - "color" vale para web e mobile (nome web em kebab-case; no mobile, mobileName quando existe).
 * - "web.color" e "mobile.color" são só de cada plataforma.
 */
import raw from '../../tokens/tokens.json';
import { contrastRatio, MIN_LARGE, MIN_TEXT } from './contrast';

export type Mode = 'light' | 'dark';
export type Platform = 'web' | 'mobile';
export type Scope = 'shared' | Platform;

export interface ColorToken {
  /** Nome na plataforma (web: kebab-case · mobile: camelCase do app). */
  name: string;
  /** Nome web, quando o token é compartilhado (para cruzar as duas listas). */
  webName?: string;
  light: string;
  dark: string;
  description: string;
  scope: Scope;
}

export interface ContrastResult {
  platform: Platform;
  mode: Mode;
  fg: string;
  bg: string;
  ratio: number;
  min: number;
  level: 'text' | 'large';
  pass: boolean;
}

interface RawColor {
  light: string;
  dark: string;
  description: string;
  mobileName?: string;
}

export const camel = (s: string) => s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

export const brand = Object.entries(raw.brand).map(([name, t]) => ({
  name,
  value: t.value,
  description: t.description,
}));

const shared = raw.color as Record<string, RawColor>;
const webOnly = raw.web.color as Record<string, RawColor>;
const mobileOnly = raw.mobile.color as Record<string, RawColor>;

/** Cores de uma plataforma: compartilhadas + exclusivas, já com o nome daquela plataforma. */
export function platformColors(platform: Platform): ColorToken[] {
  const common = Object.entries(shared).map(([name, t]) => ({
    name: platform === 'web' ? name : (t.mobileName ?? camel(name)),
    webName: name,
    light: t.light,
    dark: t.dark,
    description: t.description,
    scope: 'shared' as const,
  }));
  const own = Object.entries(platform === 'web' ? webOnly : mobileOnly).map(([name, t]) => ({
    name,
    light: t.light,
    dark: t.dark,
    description: t.description,
    scope: platform,
  }));
  return [...common, ...own];
}

/** Atalho: cores da web (as que viram --toski-*). */
export const colors = platformColors('web');
export const mobileColors = platformColors('mobile');

export const radii = Object.entries(raw.radius).map(([name, t]) => ({
  name,
  mobileName: (t as { mobileName?: string }).mobileName ?? name,
  value: t.value,
  description: t.description,
}));

export const mobileRadii = Object.entries(raw.mobile.radius).map(([name, t]) => ({
  name,
  value: t.value,
  description: t.description,
}));

export const layout = Object.entries(raw.web.layout).map(([name, t]) => ({
  name,
  value: t.value,
  description: t.description,
}));

export const font = raw.font.sans;
export const mobile = {
  pet: raw.mobile.pet,
  blackFriday: raw.mobile.blackFriday,
  typography: raw.mobile.typography as Record<string, { size: number; weight: number; tracking?: number; uppercase?: boolean }>,
  spacing: raw.mobile.spacing as Record<string, number>,
  size: raw.mobile.size as Record<string, number>,
};

export function colorValue(platform: Platform, name: string, mode: Mode): string {
  const c = platformColors(platform).find((x) => x.name === name);
  if (!c) throw new Error(`Token de cor não existe (${platform}): ${name}`);
  return c[mode];
}

type PairList = [string, string[]][];

function expand(platform: Platform, list: PairList, level: 'text' | 'large'): ContrastResult[] {
  const min = level === 'text' ? MIN_TEXT : MIN_LARGE;
  const out: ContrastResult[] = [];
  for (const mode of ['light', 'dark'] as const) {
    for (const [fg, bgs] of list) {
      for (const bg of bgs) {
        const ratio = contrastRatio(colorValue(platform, fg, mode), colorValue(platform, bg, mode));
        out.push({ platform, mode, fg, bg, ratio, min, level, pass: ratio >= min });
      }
    }
  }
  return out;
}

/** Todos os pares declarados em tokens.json → contrast, nas duas plataformas e nos dois temas. */
export function contrastReport(platform?: Platform): ContrastResult[] {
  const platforms: Platform[] = platform ? [platform] : ['web', 'mobile'];
  return platforms.flatMap((p) => [
    ...expand(p, raw.contrast[p].text as PairList, 'text'),
    ...expand(p, raw.contrast[p].large as PairList, 'large'),
  ]);
}
