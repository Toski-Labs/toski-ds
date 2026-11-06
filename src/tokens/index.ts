/**
 * Leitura tipada de tokens/tokens.json, usada pelos scripts e pelas páginas do Storybook.
 *
 * - "color" vale para web e mobile (nome web em kebab-case; no mobile, mobileName quando existe).
 * - "web.color" e "mobile.color" são só de cada plataforma.
 */
import raw from '../../tokens/tokens.json';
import iconManifest from '../../icons/icons.json';
import { compositeOver, contrastRatio, MIN_LARGE, MIN_TEXT } from './contrast';
import { assertThemeNotRenamed } from '../renamed';

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
  /** 'base' ou o id do tema de produto. */
  theme: string;
  /** Id da paleta, nos pares da Nova XP (paletteContrastReport). Ausente nos pares da base e dos temas. */
  palette?: string;
  platform: Platform;
  mode: Mode;
  fg: string;
  bg: string;
  ratio: number;
  min: number;
  level: 'text' | 'large';
  pass: boolean;
  /** Nota, quando o par está abaixo do mínimo e foi aceito com ressalva (contrast.palettes.known). Só nas paletas. */
  known?: string;
}

interface RawColor {
  light: string;
  dark: string;
  description: string;
  mobileName?: string;
  /** Descrição usada no app quando é diferente da web. */
  mobileDescription?: string;
  /** false: só a web tem o token; o app (mobile.json, app-tokens, Swift) não. */
  app?: boolean;
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
  const common = Object.entries(shared)
    .filter(([, t]) => platform === 'web' || t.app !== false)
    .map(([name, t]) => ({
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
  /** false: o raio é só da web (o app não tem). */
  app: (t as { app?: boolean }).app !== false,
}));

/** Raios compartilhados que o app também tem. */
export const appRadii = radii.filter((r) => r.app);

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

/** Raios só da web (ex.: anel de foco). */
export const webRadii = Object.entries(raw.web.radius).map(([name, t]) => ({
  name,
  value: t.value,
  description: t.description,
}));

/** Durações de interface só da web, em segundos (pressionar, abrir menu, entradas). */
export const webMotion = Object.entries(raw.web.motion as Record<string, { value: number; description: string }>).map(([name, t]) => ({
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
/** Sombra do app + anel; as que mudam entre claro e escuro (shadowMode) têm uma por modo. */
export interface ShadowStyle {
  y: number;
  blur: number;
  color: string;
  opacity: number;
}
export interface ModeShadowStyle extends ShadowStyle {
  ring: { width: number; color: string; opacity: number };
}
export type ModeShadow = Record<'light' | 'dark', ModeShadowStyle>;

const withoutNotes = <T>(o: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('$'))) as T;

export const mobile = {
  pet: raw.mobile.pet,
  blackFriday: raw.mobile.blackFriday,
  typography: raw.mobile.typography as Record<
    string,
    { size: number; weight: number; tracking?: number; uppercase?: boolean; lineHeight?: number; align?: 'leading' }
  >,
  spacing: raw.mobile.spacing as Record<string, number>,
  size: raw.mobile.size as Record<string, number>,
  shadowNote: raw.mobile.shadow.$description,
  shadow: withoutNotes<Record<string, ShadowStyle>>(raw.mobile.shadow),
  shadowModeNote: raw.mobile.shadowMode.$description,
  shadowMode: withoutNotes<Record<string, ModeShadow>>(raw.mobile.shadowMode),
  rules: raw.mobile.rules as Record<string, string>,
};

// ---------- Temas de produto ----------

type LM = { light: string; dark: string };

export interface MemberColor {
  name: string;
  avatar: string;
  mark: LM;
}

export interface ThemeAsset {
  /** Caminho em products/<id>/. */
  file: string;
  kind: string;
  /** Nome na web (inglês). */
  web: string;
  /** Nome no app (português). */
  mobile: string;
}

export interface ThemeDef {
  id: string;
  name: string;
  /** Sufixo dos tipos Swift (ToskiPawtaTheme). */
  swift: string;
  scheme: string;
  description: string;
  brand: { name: string; value: string; description: string }[];
  /** Cores compartilhadas e da web (nome web, kebab-case). */
  color: Record<string, LM>;
  /** Cores só do app (nome do app). */
  mobileColor: Record<string, LM>;
  blackFriday: Record<string, string>;
  mascots?: Record<string, unknown>;
  members?: Record<string, MemberColor>;
  assets: ThemeAsset[];
  pending: string[];
}

interface RawTheme {
  name: string;
  swift: string;
  scheme: string;
  description: string;
  brand: Record<string, { value: string; description: string }>;
  color: Record<string, LM>;
  mobile: { color: Record<string, LM>; blackFriday: Record<string, string> };
  mascots?: Record<string, unknown>;
  members?: Record<string, unknown>;
  assets: ThemeAsset[];
  pending?: string[];
}

const rawThemes = raw.themes as unknown as Record<string, unknown>;
const allowed = rawThemes.$allowed as { color: string[]; mobile: string[]; blackFriday: string[] };

export const themeIds = Object.keys(rawThemes).filter((k) => !k.startsWith('$'));

export const themes: Record<string, ThemeDef> = Object.fromEntries(
  themeIds.map((id) => {
    const t = rawThemes[id] as RawTheme;
    const members = t.members
      ? (Object.fromEntries(Object.entries(t.members).filter(([k]) => !k.startsWith('$'))) as Record<string, MemberColor>)
      : undefined;
    const def: ThemeDef = {
      id,
      name: t.name,
      swift: t.swift,
      scheme: t.scheme,
      description: t.description,
      brand: Object.entries(t.brand).map(([name, b]) => ({ name, ...b })),
      color: t.color,
      mobileColor: t.mobile.color,
      blackFriday: t.mobile.blackFriday,
      mascots: t.mascots,
      members,
      assets: t.assets,
      pending: t.pending ?? [],
    };
    return [id, def];
  }),
);

/** Confere que cada tema só mexe nos tokens permitidos e que os tokens existem, com light e dark. */
export function validateThemes(): string[] {
  const errors: string[] = [];
  const web = new Set([...Object.keys(shared), ...Object.keys(webOnly)]);
  const app = new Set(Object.keys(mobileOnly));
  for (const t of Object.values(themes)) {
    for (const [name, v] of Object.entries(t.color)) {
      if (!allowed.color.includes(name)) errors.push(`${t.id}: "${name}" não é permitido em color`);
      if (!web.has(name)) errors.push(`${t.id}: o token "${name}" não existe na base`);
      if (!v.light || !v.dark) errors.push(`${t.id}: "${name}" precisa de light e dark`);
    }
    for (const [name, v] of Object.entries(t.mobileColor)) {
      if (!allowed.mobile.includes(name)) errors.push(`${t.id}: "${name}" não é permitido em mobile.color`);
      if (!app.has(name)) errors.push(`${t.id}: o token "${name}" não existe em mobile.color da base`);
      if (!v.light || !v.dark) errors.push(`${t.id}: "${name}" precisa de light e dark`);
    }
    for (const name of Object.keys(t.blackFriday)) {
      if (!allowed.blackFriday.includes(name)) errors.push(`${t.id}: blackFriday.${name} não é permitido`);
    }
  }
  return errors;
}

/** Tema pelo id. Nome antigo ou inexistente dá erro. */
export function themeById(themeId: string): ThemeDef {
  assertThemeNotRenamed(themeId);
  const t = themes[themeId];
  if (!t) throw new Error(`Tema não existe: ${themeId}`);
  return t;
}

/** Tema de produto sobre a base. */
function applyTheme(platform: Platform, themeId: string): ColorToken[] {
  const base = platformColors(platform);
  const t = themeById(themeId);
  const over: Record<string, LM> = platform === 'web' ? t.color : { ...t.color, ...t.mobileColor };
  return base.map((c) => {
    const key = c.webName ?? c.name;
    const o = over[key];
    if (!o) return c;
    const text = (rawThemes.$descriptions as Record<string, { web: string; mobile: string }>)[key]?.[platform];
    return { ...c, light: o.light, dark: o.dark, description: text ?? c.description };
  });
}

/** Paleta sobre as cores já com o tema. A paleta vem depois do tema e vence nos tokens de palettes.$allowed. */
function applyPalette(list: ColorToken[], platform: Platform, paletteId: string): ColorToken[] {
  const p = paletteById(paletteId);
  const own = Object.entries(p.color);
  if (platform !== 'mobile') {
    if (own.length > 0) throw new Error(`A paleta "${paletteId}" só existe no mobile (nomes do app)`);
    return list;
  }
  return list.map((c) => {
    const o = p.color[c.name];
    return o ? { ...c, light: o.light, dark: o.dark } : c;
  });
}

/**
 * Cores de uma plataforma com o tema de produto e a paleta aplicados, nessa ordem
 * (sem tema = base; sem paleta = Bege, que é a base).
 */
export function themedColors(platform: Platform, themeId?: string, paletteId?: string): ColorToken[] {
  const themed = themeId ? applyTheme(platform, themeId) : platformColors(platform);
  return paletteId ? applyPalette(themed, platform, paletteId) : themed;
}

/** Nomes (da plataforma) dos tokens que o tema sobrescreve. */
export function themeOverrides(platform: Platform, themeId: string): ColorToken[] {
  const t = themeById(themeId);
  const keys = new Set(platform === 'web' ? Object.keys(t.color) : [...Object.keys(t.color), ...Object.keys(t.mobileColor)]);
  return themedColors(platform, themeId).filter((c) => keys.has(c.webName ?? c.name));
}

export function colorValue(platform: Platform, name: string, mode: Mode, themeId?: string, paletteId?: string): string {
  const c = themedColors(platform, themeId, paletteId).find((x) => x.name === name);
  if (!c) throw new Error(`Token de cor não existe (${platform}): ${name}`);
  return c[mode];
}

// ---------- Paletas (app) ----------

export interface PaletteDef {
  id: string;
  name: string;
  /** Sufixo das chaves extras do app-tokens (color<Sufixo>, shadow.<sombra><Sufixo>). Vazio na padrão. */
  suffix: string;
  description: string;
  /** Só o que difere da base (nomes do app). */
  color: Record<string, LM>;
  shadowMode: Record<string, ModeShadow>;
}

interface RawPalette {
  name: string;
  suffix: string;
  description: string;
  mobile?: { color?: Record<string, LM>; shadowMode?: Record<string, ModeShadow> };
}

const rawPalettes = raw.palettes as unknown as Record<string, unknown>;
const paletteAllowed = rawPalettes.$allowed as { mobile: string[]; shadowMode: string[] };

export const defaultPaletteId = rawPalettes.$default as string;
export const paletteIds = Object.keys(rawPalettes).filter((k) => !k.startsWith('$'));
/** Paletas que o app recebe como bloco extra (todas menos a padrão). */
export const extraPaletteIds = paletteIds.filter((id) => id !== defaultPaletteId);
/** Tokens do vocabulário da Nova XP, na ordem em que saem em color<Sufixo>. */
export const paletteVocabulary = rawPalettes.$vocabulary as string[];

export const palettes: Record<string, PaletteDef> = Object.fromEntries(
  paletteIds.map((id) => {
    const p = rawPalettes[id] as RawPalette;
    const def: PaletteDef = {
      id,
      name: p.name,
      suffix: p.suffix,
      description: p.description,
      color: p.mobile?.color ?? {},
      shadowMode: p.mobile?.shadowMode ?? {},
    };
    return [id, def];
  }),
);

/** Paleta pelo id. Id inexistente dá erro. */
export function paletteById(paletteId: string): PaletteDef {
  const p = palettes[paletteId];
  if (!p) throw new Error(`Paleta não existe: ${paletteId}. Paletas: ${paletteIds.join(', ')}`);
  return p;
}

/** Confere que cada paleta só mexe nos tokens permitidos, que eles existem e que têm light e dark. */
export function validatePalettes(): string[] {
  const errors: string[] = [];
  const app = new Set(mobileColors.map((c) => c.name));
  if (!palettes[defaultPaletteId]) errors.push(`palettes.$default aponta para "${defaultPaletteId}", que não existe`);
  for (const name of paletteVocabulary) {
    if (!app.has(name)) errors.push(`palettes.$vocabulary: o token "${name}" não existe em mobile.color`);
  }
  for (const p of Object.values(palettes)) {
    if (p.id !== defaultPaletteId && !p.suffix) errors.push(`${p.id}: precisa de "suffix" (nome do bloco extra no app)`);
    if (p.id === defaultPaletteId && (Object.keys(p.color).length > 0 || Object.keys(p.shadowMode).length > 0)) {
      errors.push(`${p.id}: a paleta padrão é a base e não declara sobrescritas`);
    }
    for (const [name, v] of Object.entries(p.color)) {
      if (!paletteAllowed.mobile.includes(name)) errors.push(`${p.id}: "${name}" não é permitido em mobile.color`);
      if (!app.has(name)) errors.push(`${p.id}: o token "${name}" não existe em mobile.color da base`);
      if (!v.light || !v.dark) errors.push(`${p.id}: "${name}" precisa de light e dark`);
    }
    for (const [name, v] of Object.entries(p.shadowMode)) {
      if (!paletteAllowed.shadowMode.includes(name)) errors.push(`${p.id}: shadowMode.${name} não é permitido`);
      if (!mobile.shadowMode[name]) errors.push(`${p.id}: shadowMode.${name} não existe na base`);
      if (!v.light || !v.dark) errors.push(`${p.id}: shadowMode.${name} precisa de light e dark`);
    }
  }
  return errors;
}

/** O vocabulário da Nova XP numa paleta (com o tema de produto), na ordem de palettes.$vocabulary. */
export function paletteColorSet(paletteId: string, themeId?: string): ColorToken[] {
  const all = themedColors('mobile', themeId, paletteId);
  return paletteVocabulary.map((name) => {
    const c = all.find((x) => x.name === name);
    if (!c) throw new Error(`Token do vocabulário não existe: ${name}`);
    return c;
  });
}

/** Sombras que mudam com o modo, numa paleta: a da paleta, senão a da base. */
export function paletteShadows(paletteId: string): Record<string, ModeShadow> {
  const p = paletteById(paletteId);
  return Object.fromEntries(Object.entries(mobile.shadowMode).map(([name, base]) => [name, p.shadowMode[name] ?? base]));
}

type PairList = [string, string[]][];

/** Valor de uma cor, ou 'a/b' = a (translúcida) sobre b. */
function resolveColor(platform: Platform, spec: string, mode: Mode, themeId?: string, paletteId?: string): string {
  const [top, under] = spec.split('/');
  const value = colorValue(platform, top, mode, themeId, paletteId);
  return under ? compositeOver(value, colorValue(platform, under, mode, themeId, paletteId)) : value;
}

function expand(platform: Platform, list: PairList, level: 'text' | 'large', themeId?: string, paletteId?: string): ContrastResult[] {
  const min = level === 'text' ? MIN_TEXT : MIN_LARGE;
  const out: ContrastResult[] = [];
  for (const mode of ['light', 'dark'] as const) {
    for (const [fg, bgs] of list) {
      for (const bg of bgs) {
        const ratio = contrastRatio(
          resolveColor(platform, fg, mode, themeId, paletteId),
          resolveColor(platform, bg, mode, themeId, paletteId),
        );
        out.push({
          theme: themeId ?? 'base',
          ...(paletteId ? { palette: paletteId } : {}),
          platform,
          mode,
          fg,
          bg,
          ratio,
          min,
          level,
          pass: ratio >= min,
        });
      }
    }
  }
  return out;
}

/** Todos os pares declarados em tokens.json → contrast, nas duas plataformas e nos dois temas (base). */
export function contrastReport(platform?: Platform): ContrastResult[] {
  const platforms: Platform[] = platform ? [platform] : ['web', 'mobile'];
  return platforms.flatMap((p) => [
    ...expand(p, raw.contrast[p].text as PairList, 'text'),
    ...expand(p, raw.contrast[p].large as PairList, 'large'),
  ]);
}

/** Pares da base + extras de tema, com as cores do tema, mais os membros (Koti). */
export function themeContrastReport(themeId: string): ContrastResult[] {
  const extra = raw.contrast.themes as unknown as Record<Platform, { text: PairList; large: PairList }>;
  const out: ContrastResult[] = [];
  for (const p of ['web', 'mobile'] as const) {
    out.push(
      ...expand(p, raw.contrast[p].text as PairList, 'text', themeId),
      ...expand(p, raw.contrast[p].large as PairList, 'large', themeId),
      ...expand(p, extra[p].text, 'text', themeId),
      ...expand(p, extra[p].large, 'large', themeId),
    );
  }
  const members = themeById(themeId).members;
  if (members) {
    const surfaces = ['background', 'surface', 'tint', 'heroBackground'];
    const mark = (mode: Mode, id: string) => members[id].mark[mode];
    for (const mode of ['light', 'dark'] as const) {
      for (const id of Object.keys(members)) {
        for (const bg of surfaces) {
          const ratio = contrastRatio(mark(mode, id), colorValue('mobile', bg, mode, themeId));
          out.push({ theme: themeId, platform: 'mobile', mode, fg: `membro ${id} (marca)`, bg, ratio, min: MIN_LARGE, level: 'large', pass: ratio >= MIN_LARGE });
        }
        const ratio = contrastRatio(mobile.pet.onAvatar, members[id].avatar);
        out.push({ theme: themeId, platform: 'mobile', mode, fg: 'onPetAvatar', bg: `membro ${id} (avatar)`, ratio, min: MIN_TEXT, level: 'text', pass: ratio >= MIN_TEXT });
      }
    }
  }
  return out;
}

/** Pares das paletas que ficam abaixo do mínimo e foram aceitos com ressalva (contrast.palettes.known). */
export const knownGaps = raw.contrast.palettes.known as { palette: string; mode: Mode; fg: string; bg: string; note: string }[];

/** Pares da Nova XP (contrast.palettes) numa paleta, com a base ou com um tema de produto. */
export function paletteContrastReport(paletteId: string, themeId?: string): ContrastResult[] {
  paletteById(paletteId);
  const pairs = raw.contrast.palettes.mobile as unknown as { text: PairList; large: PairList };
  return [
    ...expand('mobile', pairs.text, 'text', themeId, paletteId),
    ...expand('mobile', pairs.large, 'large', themeId, paletteId),
  ].map((r) => {
    const note = knownGaps.find((k) => k.palette === paletteId && k.mode === r.mode && k.fg === r.fg && k.bg === r.bg)?.note;
    return !r.pass && note ? { ...r, known: note } : r;
  });
}

/** Base + todos os temas de produto + cada paleta combinada com a base e com cada tema. */
export function allContrastReports(): ContrastResult[] {
  return [
    ...contrastReport(),
    ...themeIds.flatMap(themeContrastReport),
    ...paletteIds.flatMap((p) => [undefined, ...themeIds].flatMap((t) => paletteContrastReport(p, t))),
  ];
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
