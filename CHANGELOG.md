# Changelog

Todas as mudanças relevantes do Toski DS. O projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/).
Novas entradas são geradas pelo [Changesets](https://github.com/changesets/changesets) (`npm run changeset`).

## 0.2.0 — 2026-10-06

### Adicionado

- Tokens do app que faltavam (vindos de `docs/design/assets/tokens/tokens.json` do PetHealthTracker):
  13 cores só do app (faint, divider, borderStrong, barInactive, featureCard, onFeatureCard, onAccentSubtle,
  lockBackground, onLock, alertBackground, bannerBackground, previewBackdrop, themePreviewCard),
  `avatarUser`, 10 raios só do app (checkbox, swatch, pdfPage, small, buttonSmall, segmentTrack, input, tile,
  notification, appIcon com lado de referência), 4 sombras (knob, raised, floating, sheet) e as regras do PDF e
  do botão da Apple.
- `ToskiShadow` e `ToskiRadius.appIcon(side:)` no `ToskiColors.swift`.
- `build/json/app-tokens.json` no formato do app e `npm run sync:app` (com `--check`) para copiá-lo.
- 10 pares novos no teste de contraste (146 no total).

### Mudado

- `accent-hover` (web) passa a ser compartilhado com o app como `accentDeep` (mesmos valores).
- Descrições do app (`mobileDescription`) quando diferem das da web.

### Removido

- Raio `chip` (999) do mobile: o app usa `Capsule`, sem token.

## 0.1.0 — 2026-10-06

### Adicionado

- Tokens em `tokens/tokens.json` (claro e escuro), divididos em compartilhados, só web e só mobile:
  5 cores da marca; 19 cores compartilhadas, 9 só da web e 7 só do app; fonte Outfit; raios
  (icon 12, button 14, card 18, panel 28 + chip, input e appIcon no app); layout da web (container 1168,
  margem 24); pets, Black Friday, tipografia, espaçamentos e tamanhos do app.
- Gerador `scripts/build-tokens.ts`: `build/css/tokens.css` (`--toski-*`), `build/css/theme.css`
  (`@theme` do Tailwind CSS 4), `build/swift/ToskiColors.swift` (SwiftUI, nomes do app),
  `build/json/web.json` e `build/json/mobile.json`.
- Teste de contraste `scripts/check-contrast.ts` (136 pares: web e mobile, claro e escuro) no CI.
- Componentes React: Button, Pill, Card, IconBox, Kicker, SectionHeading, CheckList, Icon, AppIcon e Mascot.
- `styles/tailwind.css` para projetos com Tailwind CSS 4.
- Storybook com tokens, componentes em claro e escuro e a página "Como usar", publicado no GitHub Pages.
