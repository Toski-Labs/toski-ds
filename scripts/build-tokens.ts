/**
 * Gera build/ e src/generated/ a partir de tokens/tokens.json.
 *
 *   npm run tokens:build   → escreve os arquivos
 *   npm run tokens:check   → falha se algo estiver desatualizado (usado no CI)
 *
 * Web  (CSS, Tailwind, JSON web, TS): tokens compartilhados + web, nomes em kebab-case.
 * Mobile (Swift, JSON mobile):        tokens compartilhados + mobile, nomes do app em camelCase.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brand, colors, font, layout, mobile, mobileColors, mobileRadii, mobileRadiusNote, radii } from '../src/tokens/index';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEADER = 'Gerado por scripts/build-tokens.ts a partir de tokens/tokens.json. Não edite à mão.';

const px = (n: number) => `${n}px`;
const fontStack = font.web.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');

// =====================================================================
// WEB
// =====================================================================

function cssVars(mode: 'light' | 'dark', indent: string): string {
  return colors.map((c) => `${indent}--toski-${c.name}: ${c[mode]};`).join('\n');
}

function buildCss(): string {
  const brandVars = brand.map((b) => `  --toski-${b.name}: ${b.value};`).join('\n');
  const radiusVars = radii.map((r) => `  --toski-radius-${r.name}: ${px(r.value)};`).join('\n');
  const layoutVars = layout.map((l) => `  --toski-${l.name}: ${px(l.value)};`).join('\n');
  return `/* ${HEADER} */

/* Tema claro (padrão) + tokens que não mudam com o tema */
:root {
  color-scheme: light dark;

  /* Marca */
${brandVars}

  /* Fonte, raios e layout */
  --toski-font-sans: ${fontStack};
${radiusVars}
${layoutVars}

  /* Cores semânticas */
${cssVars('light', '  ')}
}

/* Escuro pelo sistema, a menos que a pessoa tenha escolhido "Claro" (data-theme="light") */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
${cssVars('dark', '    ')}
  }
}

/* Escuro escolhido manualmente */
:root[data-theme="dark"] {
  color-scheme: dark;
${cssVars('dark', '  ')}
}

/* Claro escolhido manualmente */
:root[data-theme="light"] {
  color-scheme: light;
}
`;
}

function buildTheme(): string {
  const semantic = colors.map((c) => `  --color-${c.name}: var(--toski-${c.name});`).join('\n');
  const brandColors = brand.map((b) => `  --color-${b.name}: ${b.value};`).join('\n');
  const radiusVars = radii.map((r) => `  --radius-${r.name}: ${px(r.value)};`).join('\n');
  // container → max-w-page · gutter → px-gutter
  const layoutVars = layout
    .map((l) => (l.name === 'container' ? `  --container-page: ${px(l.value)};` : `  --spacing-${l.name}: ${px(l.value)};`))
    .join('\n');
  return `/* ${HEADER} */
/* Use depois de @import "tailwindcss" e de tokens.css. */

/* Cores semânticas: bg-surface, text-muted, border-line, bg-accent… (mudam com o tema) */
@theme inline {
${semantic}
}

/* Valores fixos: cores da marca, fonte, raios (rounded-card…) e layout (max-w-page, px-gutter) */
@theme {
${brandColors}

  --font-sans: ${fontStack};

${radiusVars}

${layoutVars}
}
`;
}

function webData() {
  const mode = (m: 'light' | 'dark') => Object.fromEntries(colors.map((c) => [c.name, c[m]]));
  return {
    brand: Object.fromEntries(brand.map((b) => [b.name, b.value])),
    light: mode('light'),
    dark: mode('dark'),
    font: { family: font.family, stack: font.web, weights: font.weights },
    radius: Object.fromEntries(radii.map((r) => [r.name, r.value])),
    layout: Object.fromEntries(layout.map((l) => [l.name, l.value])),
  };
}

function buildWebJson(): string {
  return `${JSON.stringify({ $description: `${HEADER} Plataforma: web.`, ...webData() }, null, 2)}\n`;
}

function buildTs(): string {
  return `// ${HEADER}\n// Tokens da web, exportados pelo pacote como \`tokens\`.\n\nexport const tokens = ${JSON.stringify(webData(), null, 2)} as const;\n\nexport type ToskiTokens = typeof tokens;\nexport type ToskiColorName = keyof typeof tokens.light;\n`;
}

// =====================================================================
// MOBILE
// =====================================================================

function mobileData() {
  const mode = (m: 'light' | 'dark') => Object.fromEntries(mobileColors.map((c) => [c.name, c[m]]));
  return {
    brand: Object.fromEntries(brand.map((b) => [b.name, b.value])),
    light: mode('light'),
    dark: mode('dark'),
    pet: mobile.pet,
    blackFriday: mobile.blackFriday,
    font: { family: font.family, weights: font.weights },
    typography: mobile.typography,
    radius: {
      ...Object.fromEntries(radii.map((r) => [r.mobileName, r.value])),
      ...Object.fromEntries(
        mobileRadii.map((r) => [r.name, r.side ? { radius: r.value, side: r.side } : r.value]),
      ),
    },
    shadow: mobile.shadow,
    spacing: mobile.spacing,
    size: mobile.size,
    rules: mobile.rules,
  };
}

// ---------- App (PetHealthTracker): mesmo formato do docs/design/assets/tokens/tokens.json ----------
// Ordem das chaves igual à do arquivo do app (só formatação; chaves novas entram no fim).
const APP_COLOR_ORDER = [
  'background', 'surface', 'tint', 'heroBackground', 'textPrimary', 'textSecondary', 'border', 'accent',
  'onAccent', 'critical', 'onCritical', 'criticalBackground', 'criticalBorder', 'success', 'successBackground',
  'tabBar', 'tabIdle', 'segmentSelected', 'switchOff', 'toastBackground', 'toastText', 'toastAction', 'scrim',
  'mascotNose', 'mascotOutline', 'ballOutline', 'faint', 'divider', 'borderStrong', 'barInactive', 'accentDeep',
  'featureCard', 'onFeatureCard', 'onAccentSubtle', 'lockBackground', 'onLock', 'alertBackground',
  'bannerBackground', 'previewBackdrop', 'themePreviewCard',
];
const APP_RADIUS_ORDER = [
  'checkbox', 'swatch', 'pdfPage', 'small', 'iconBox', 'buttonSmall', 'segmentTrack', 'input', 'button', 'tile',
  'card', 'notification', 'sheet', 'appIcon',
];

function ordered<T>(entries: [string, T][], order: string[]): [string, T][] {
  const rank = (k: string) => (order.includes(k) ? order.indexOf(k) : order.length);
  return [...entries].sort((a, b) => rank(a[0]) - rank(b[0]));
}

/** O app lê "none" (não "transparent"). */
const appValue = (v: string) => (v === 'transparent' ? 'none' : v);

function buildAppJson(): string {
  const color = Object.fromEntries(
    ordered(
      mobileColors.map((c) => [c.name, { light: appValue(c.light), dark: appValue(c.dark), use: c.description }]),
      APP_COLOR_ORDER,
    ),
  );
  const radiusEntries: [string, number | { radius: number; side: number }][] = [
    ...radii.map((r): [string, number] => [r.mobileName, r.value]),
    ...mobileRadii.map((r): [string, number | { radius: number; side: number }] => [
      r.name,
      r.side ? { radius: r.value, side: r.side } : r.value,
    ]),
  ];
  const data = {
    $description: `Tokens de design do Toski. Cores semânticas têm valor para o tema claro e para o escuro. Gerado pelo Toski DS (github.com/Toski-Labs/toski-ds): não edite à mão; mude tokens/tokens.json no DS e rode npm run sync:app.`,
    brand: Object.fromEntries(brand.map((b) => [b.name, b.value])),
    color,
    pet: mobile.pet,
    blackFriday: mobile.blackFriday,
    typography: { family: font.family, weights: font.weights, styles: mobile.typography },
    radius: { $description: mobileRadiusNote, ...Object.fromEntries(ordered(radiusEntries, APP_RADIUS_ORDER)) },
    shadow: { $description: mobile.shadowNote, ...mobile.shadow },
    spacing: mobile.spacing,
    size: mobile.size,
    ...Object.fromEntries(Object.entries(mobile.rules).map(([k, rule]) => [k, { rule }])),
  };
  return `${JSON.stringify(data, null, 2)}\n`;
}

function buildMobileJson(): string {
  return `${JSON.stringify({ $description: `${HEADER} Plataforma: mobile (iOS).`, ...mobileData() }, null, 2)}\n`;
}

/** "#RRGGBB" | "transparent" | "rgba(r,g,b,a)" → literal Swift (hex, alpha). */
function swiftColor(v: string): { hex: string; alpha: string } {
  const s = v.trim().toLowerCase();
  if (s === 'transparent' || s === 'none') return { hex: '0x000000', alpha: '0' };
  const rgba = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgba) {
    const [r, g, b] = rgba.slice(1, 4).map((n) => Number(n).toString(16).padStart(2, '0').toUpperCase());
    return { hex: `0x${r}${g}${b}`, alpha: String(Number(rgba[4] ?? '1')) };
  }
  if (/^#[0-9a-f]{6}$/.test(s)) return { hex: `0x${s.slice(1).toUpperCase()}`, alpha: '1' };
  throw new Error(`Cor que o Swift não entende: ${v}`);
}

function swiftDynamic(light: string, dark: string): string {
  const l = swiftColor(light);
  const d = swiftColor(dark);
  if (l.alpha === '1' && d.alpha === '1') return `dynamic(light: ${l.hex}, dark: ${d.hex})`;
  return `dynamic(light: ${l.hex}, lightAlpha: ${l.alpha}, dark: ${d.hex}, darkAlpha: ${d.alpha})`;
}

function swiftFixed(v: string): string {
  const c = swiftColor(v);
  return c.alpha === '1' ? `fixed(${c.hex})` : `fixed(${c.hex}, alpha: ${c.alpha})`;
}

const swiftWeight: Record<number, string> = { 400: '.regular', 500: '.medium', 600: '.semibold', 700: '.bold' };

function buildSwift(): string {
  const doc = (d: string) => `    /// ${d}`;
  const pad = Math.max(...mobileColors.map((c) => c.name.length));
  const section = (scope: 'shared' | 'mobile') =>
    mobileColors
      .filter((c) => c.scope === scope)
      .map((c) => `${doc(c.description)}\n    public static let ${c.name.padEnd(pad)} = ${swiftDynamic(c.light, c.dark)}`)
      .join('\n');
  const brandLines = brand.map((b) => `${doc(b.description)}\n    public static let ${b.name} = ${swiftFixed(b.value)}`).join('\n');

  const avatars = mobile.pet.avatars.map((v) => swiftFixed(v)).join(', ');
  const dots = mobile.pet.calendarDots.light
    .map((l, i) => swiftDynamic(l, mobile.pet.calendarDots.dark[i] ?? l))
    .join(',\n            ');
  const bf = Object.entries(mobile.blackFriday)
    .map(([k, v]) => `        public static let ${k} = ToskiColors.${swiftFixed(v)}`)
    .join('\n');

  const radiusLines = [
    ...radii.map((r) => `${doc(r.description)}\n    public static let ${r.mobileName}: CGFloat = ${r.value}`),
    ...mobileRadii.map((r) =>
      r.side
        ? `${doc(r.description)}\n    public static let ${r.name}Radius: CGFloat = ${r.value}\n    public static let ${r.name}Side: CGFloat = ${r.side}\n    /// Raio do ícone para um lado qualquer (proporcional ao de referência).\n    public static func ${r.name}(side: CGFloat) -> CGFloat { side * ${r.name}Radius / ${r.name}Side }`
        : `${doc(r.description)}\n    public static let ${r.name}: CGFloat = ${r.value}`,
    ),
  ].join('\n');
  const shadowLines = Object.entries(mobile.shadow)
    .map(
      ([k, v]) =>
        `    public static let ${k} = Style(y: ${v.y}, blur: ${v.blur}, color: ToskiColors.${swiftFixed(v.color)}, opacity: ${v.opacity})`,
    )
    .join('\n');
  const numLines = (o: Record<string, number>) =>
    Object.entries(o)
      .map(([k, v]) => `    public static let ${k}: CGFloat = ${v}`)
      .join('\n');
  const typeLines = Object.entries(mobile.typography)
    .map(([k, t]) => {
      const args = [`size: ${t.size}`, `weight: ${swiftWeight[t.weight] ?? '.regular'}`];
      if (t.tracking) args.push(`tracking: ${t.tracking}`);
      if (t.uppercase) args.push('uppercase: true');
      return `    public static let ${k} = Style(${args.join(', ')})`;
    })
    .join('\n');

  return `//  ToskiColors.swift
//  ${HEADER}
//  Plataforma: mobile (iOS). Nomes iguais aos do app.
//
//  Uso: Text("Olá").foregroundStyle(ToskiColors.textPrimary)
//  As cores semânticas mudam sozinhas entre claro e escuro. Não depende de Asset Catalog.

import SwiftUI
#if canImport(UIKit)
import UIKit
#elseif canImport(AppKit)
import AppKit
#endif

public enum ToskiColors {
    // MARK: Marca (iguais nos dois temas)

${brandLines}

    // MARK: Semânticas — compartilhadas com a web

${section('shared')}

    // MARK: Semânticas — só do app

${section('mobile')}

    // MARK: Pets

    /// Cores dos avatares dos pets, na ordem de cadastro.
    public static let petAvatars: [Color] = [${avatars}]
    /// Bolinhas do calendário por pet (visão Todos).
    public static let petCalendarDots: [Color] = [
            ${dots}
    ]
    /// Inicial sobre o avatar.
    public static let onPetAvatar = ${swiftFixed(mobile.pet.onAvatar)}
    /// Avatar da usuária (não é cor de pet).
    public static let avatarUser = ${swiftFixed(mobile.pet.avatarUser)}

    // MARK: Black Friday (tema fixo da campanha)

    public enum BlackFriday {
${bf}
    }

    // MARK: Auxiliares

    private static func components(_ hex: UInt32) -> (CGFloat, CGFloat, CGFloat) {
        (CGFloat((hex >> 16) & 0xFF) / 255, CGFloat((hex >> 8) & 0xFF) / 255, CGFloat(hex & 0xFF) / 255)
    }

    fileprivate static func fixed(_ hex: UInt32, alpha: CGFloat = 1) -> Color {
        let (r, g, b) = components(hex)
        return Color(.sRGB, red: r, green: g, blue: b, opacity: alpha)
    }

    private static func dynamic(light: UInt32, lightAlpha: CGFloat = 1, dark: UInt32, darkAlpha: CGFloat = 1) -> Color {
        #if canImport(UIKit)
        return Color(UIColor { traits in
            let isDark = traits.userInterfaceStyle == .dark
            let (r, g, b) = components(isDark ? dark : light)
            return UIColor(red: r, green: g, blue: b, alpha: isDark ? darkAlpha : lightAlpha)
        })
        #elseif canImport(AppKit)
        return Color(NSColor(name: nil) { appearance in
            let isDark = appearance.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua
            let (r, g, b) = components(isDark ? dark : light)
            return NSColor(srgbRed: r, green: g, blue: b, alpha: isDark ? darkAlpha : lightAlpha)
        })
        #else
        return fixed(light, alpha: lightAlpha)
        #endif
    }
}

public enum ToskiRadius {
${radiusLines}
}

/// ${mobile.shadowNote}
public enum ToskiShadow {
    public struct Style: Sendable {
        public let y: CGFloat
        public let blur: CGFloat
        public let color: Color
        public let opacity: Double
        /// Raio para .shadow(color:radius:x:y:) do SwiftUI.
        public var radius: CGFloat { blur / 2 }
    }

${shadowLines}
}

public enum ToskiSpacing {
${numLines(mobile.spacing)}
}

public enum ToskiSize {
${numLines(mobile.size)}
}

public enum ToskiFont {
    /// Nome da família registrada no app (adicione os .ttf do Outfit em "Fonts provided by application").
    public static let family = "${font.family}"

    public struct Style: Sendable {
        public let size: CGFloat
        public let weight: Font.Weight
        /// Espaçamento entre letras em em (multiplique pelo tamanho para pontos).
        public let tracking: CGFloat
        public let uppercase: Bool

        public init(size: CGFloat, weight: Font.Weight, tracking: CGFloat = 0, uppercase: Bool = false) {
            self.size = size
            self.weight = weight
            self.tracking = tracking
            self.uppercase = uppercase
        }

        /// Fonte Outfit que acompanha o Tamanho do Texto do sistema.
        public var font: Font { .custom(ToskiFont.family, size: size).weight(weight) }
        /// Tracking em pontos, para .tracking(_:).
        public var trackingPoints: CGFloat { tracking * size }
    }

${typeLines}
}
`;
}

// =====================================================================

const outputs: Record<string, string> = {
  'build/css/tokens.css': buildCss(),
  'build/css/theme.css': buildTheme(),
  'build/json/web.json': buildWebJson(),
  'build/json/mobile.json': buildMobileJson(),
  'build/swift/ToskiColors.swift': buildSwift(),
  'build/json/app-tokens.json': buildAppJson(),
  'src/generated/tokens.ts': buildTs(),
};

const check = process.argv.includes('--check');
let stale = 0;
for (const [file, content] of Object.entries(outputs)) {
  const path = join(root, file);
  if (check) {
    const current = existsSync(path) ? readFileSync(path, 'utf8') : '';
    if (current !== content) {
      console.error(`✗ ${file} está desatualizado. Rode: npm run tokens:build`);
      stale++;
    } else {
      console.log(`✓ ${file}`);
    }
  } else {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
    console.log(`→ ${relative(root, path)}`);
  }
}
if (stale > 0) process.exit(1);
