# Changelog

Todas as mudanças relevantes do Toski DS. O projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/).
Novas entradas são geradas pelo [Changesets](https://github.com/changesets/changesets) (`npm run changeset`).

## 0.3.2 — 2026-10-06

### Corrigido

- `release.yml` pula a publicação quando a versão já está no npm (a 0.3.1 foi publicada à mão e o workflow
  tentou publicá-la de novo). Primeira versão publicada pelo GitHub Actions, com trusted publishing.

## 0.3.1 — 2026-10-06

### Mudado

- Pacote pronto para o npm como `@toski-labs/ds` (público): sem `private`, `publishConfig`, `keywords`,
  verificação completa antes de publicar (`prepublishOnly`) e CHANGELOG no pacote.
- Workflow `release.yml`: publica no npm ao enviar uma tag `vX.Y.Z` (trusted publishing, com provenance).
- README e "Como usar" com a instalação pelo npm.

## 0.3.0 — 2026-10-06

### Adicionado

- Ícones: os 57 ícones do app (`icons/svg/`, desenhos do canvas) mais 7 só da web, num conjunto único com nome
  em inglês na web e em português no app (`icons/icons.json`). `sync:app` copia os SVGs para o app.
- Movimento (`motion`): curvas, bolinha (lenta 1,8 s / 14 e rápida 1,2 s / 16), pontinhos, spinner, painel,
  toast e opacidades de pressionado/desabilitado. Na web viram `--toski-motion-*` e `--toski-ease-*`
  (Tailwind: `ease-toski-in-out`, `ease-toski-out`); no Swift, `ToskiMotionTokens`.
- Medidas dos componentes do app (`mobile.component`): botões, pílula, botões circulares, chips, tags,
  linhas, formulário, segmentado, stepper, campo, barra de progresso, pontinhos, spinner, barra de abas,
  painel inferior, toast e mascote. No Swift, `ToskiComponent` (`build/swift/ToskiTokens.swift`).
- `font.sans.naturalLineHeight` (1,26).
- Páginas "Movimento" e "Medidas do app" no Storybook; galeria de ícones com os dois nomes.

### Mudado

- `Icon` da web passa a usar os desenhos do app. Mesmos nomes de antes, traços um pouco diferentes em
  check, chevron-down, clock, copy, heart, phone, paw, share, calendar e bell.
- A bolinha da web lê a duração, a altura e a curva dos tokens de movimento.

### Removido

- `iconPaths` (use `iconData`).

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
