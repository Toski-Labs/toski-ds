# Toski DS

[![npm](https://img.shields.io/npm/v/@toski-labs/ds?label=npm&color=A9541F)](https://www.npmjs.com/package/@toski-labs/ds)
[![CI](https://github.com/Toski-Labs/toski-ds/actions/workflows/ci.yml/badge.svg)](https://github.com/Toski-Labs/toski-ds/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-online-DB9A5B)](https://toski-labs.github.io/toski-ds/)
[![MIT license](https://img.shields.io/badge/license-MIT-6B5648)](LICENSE)

[Português](README.md) · **English**

The **Toski Labs** design system: a single source of truth for the colors, typography, radii and
components used on the website (Astro + Tailwind CSS 4), the iOS app (SwiftUI) and the themes
(VS Code and iTerm2).

📖 **Storybook:** https://toski-labs.github.io/toski-ds/ (docs are in Portuguese) · 📦 **npm:** [`@toski-labs/ds`](https://www.npmjs.com/package/@toski-labs/ds)

## What's inside

| Path | Contents |
|---|---|
| `tokens/tokens.json` | **Source of truth**: brand, light/dark colors (shared, web-only and mobile-only), font, radii, layout, app tokens and the contrast pairs checked in CI |
| `build/` | Generated from the tokens (do not edit by hand) |
| `build/css/tokens.css` | `--toski-*` variables (light on `:root`; dark via the system or `data-theme="dark"`) |
| `build/css/theme.css` | Tailwind CSS 4 `@theme` block (colors, `--radius-*`, `--font-sans`) |
| `build/swift/ToskiColors.swift` | SwiftUI (app names): light/dark colors, radii, spacing, sizes and text styles |
| `build/json/web.json` · `mobile.json` | Plain JSON per platform (VS Code and iTerm2 themes, scripts) |
| `build/json/app-tokens.json` | Tokens in the PetHealthTracker app format (copied with `npm run sync:app`) |
| `build/swift/ToskiTokens.swift` | SwiftUI: app component sizes (`ToskiComponent`) and animations (`ToskiMotionTokens`) |
| `icons/` | 64 stroke icons (`svg/`) and the web ↔ app name map (`icons.json`) |
| `styles/tailwind.css` | Everything a Tailwind CSS 4 project needs to import |
| `src/components/` | React + TypeScript + Tailwind CSS 4 components |
| `assets/` | Paçoca (mascot) and app icon SVGs (for Xcode) |
| `docs/` | Storybook pages |

Components: `Button` (primary, secondary, light; lg 54px and md 48px), `Pill` (status, outline, tag, plus),
`Card` (surface, plain, hero, dashed; card 18 and panel 28 radii), `IconBox`, `Kicker`, `SectionHeading`,
`CheckList`, `Icon` (64 inline SVG stroke icons, the same as the app), `AppIcon` and `Mascot` (Paçoca).

## Quick start

```bash
npm install @toski-labs/ds @fontsource-variable/outfit
```

```css
@import "tailwindcss";
@import "@fontsource-variable/outfit";
@import "@toski-labs/ds/tailwind.css";
```

```tsx
import { Button, SectionHeading } from '@toski-labs/ds';

<SectionHeading kicker="Projects" title="What comes out of the lab" />
<Button href="/pethealthtracker" icon="arrow-right">Learn more</Button>
```

```swift
// SwiftUI: copy build/swift/ToskiColors.swift into the project
Text("Hello").foregroundStyle(ToskiColors.textPrimary)
```

## Development

Requires Node 22.

```bash
npm install
npm run dev              # Storybook at http://localhost:6006
npm run tokens:build     # generate build/ from tokens/tokens.json
npm run contrast         # check token contrast pairs
npm run sync:app         # copy tokens and icons into the PetHealthTracker app
npm run verify           # everything CI runs
```

To change a token: edit `tokens/tokens.json`, run `npm run tokens:build` and `npm run contrast`, note it in
`CHANGELOG.md` under "## Próxima versão" and commit `tokens/`, `build/` and `src/generated/` together. CI fails if
`build/` is stale or if any text pair drops below 4.5:1 (3:1 for large text and icons).

## Accessibility

Contrast checked in CI for both themes · visible focus ring · 48px+ buttons (44px minimum touch target) ·
animations and transitions off with `prefers-reduced-motion` · icons and mascot are decorative by default
(`aria-hidden`), pass `label` when they carry meaning.

## Releasing

Write your changes under "## Próxima versão" in `CHANGELOG.md`, then on `main` run
`npm run release -- patch | minor | major` (`--dry-run` to simulate). It checks git and the changelog, runs
`npm run verify`, bumps the version, commits, tags and pushes; the **Publicar no npm** workflow publishes to npm.

## Versioning

[Semantic Versioning](https://semver.org/).
See the [CHANGELOG](CHANGELOG.md).

## License

[MIT](LICENSE) © 2026 Toski Labs
