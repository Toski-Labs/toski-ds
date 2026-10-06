/**
 * Leitura tipada de tokens/tokens.json, usada pelos scripts e pelas páginas do Storybook.
 *
 * - "color" vale para web e mobile (nome web em kebab-case; no mobile, mobileName quando existe).
 * - "web.color" e "mobile.color" são só de cada plataforma.
 */
import raw from '../../tokens/tokens.json';
import iconManifest from '../../icons/icons.json';
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
  /** Descrição usada no app quando é diferente da web. */
  mobileDescription?: string;
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
    description: platform === 'mobile' ? (t.mobileDescription ?? t.description) : t.description,
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

interface RawMobileRadius {
  value?: number;
  radius?: number;
  side?: number;
  description: string;
}

/** Raios só do app (appIcon tem raio + lado de referência). */
export const mobileRadii = Object.entries(raw.mobile.radius as Record<string, RawMobileRadius | string>)
  .filter(([name]) => !name.startsWith('$'))
  .map(([name, t]) => {
    const r = t as RawMobileRadius;
    return { name, value: r.value ?? r.radius ?? 0, side: r.side, description: r.description };
  });

export const mobileRadiusNote = (raw.mobile.radius as Record<string, unknown>).$description as string;

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
  shadowNote: raw.mobile.shadow.$description,
  shadow: Object.fromEntries(Object.entries(raw.mobile.shadow).filter(([k]) => !k.startsWith('$'))) as Record<
    string,
    { y: number; blur: number; color: string; opacity: number }
  >,
  rules: raw.mobile.rules as Record<string, string>,
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

// ---------- Movimento, medidas de componentes e ícones ----------

type Json = number | string | boolean | Json[] | { [k: string]: Json };

/** Animações (compartilhadas entre web e app). */
export const motion = raw.motion as unknown as {
  $description: string;
  curve: Record<string, [number, number, number, number]>;
  ball: { description: string; keyframes: number[]; viewBoxWidth: number; slow: { duration: number; rise: number }; fast: { duration: number; rise: number } };
  dots: { description: string; duration: number; delays: number[]; keyframes: number[]; low: number; high: number };
  spinner: { description: string; duration: number };
  panel: { description: string; duration: number; reducedDuration: number; dragReturnDuration: number };
  toast: { description: string; enterDuration: number; curve: string; slide: number; reducedDuration: number; visible: Record<string, number> };
  interaction: { description: string; pressedOpacity: number; disabledOpacity: number };
};

/** Medidas dos componentes do app. */
export const component = raw.mobile.component as unknown as Record<string, Json>;


export interface IconEntry {
  /** Nome do arquivo em icons/svg/ (o nome do app quando existe). */
  id: string;
  web: string;
  mobile?: string;
}

export const iconEntries: IconEntry[] = Object.entries(iconManifest as Record<string, unknown>)
  .filter(([k]) => !k.startsWith('$'))
  .map(([id, v]) => ({ id, ...(v as { web: string; mobile?: string }) }));
