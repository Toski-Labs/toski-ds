# Changelog

Todas as mudanças relevantes do Toski DS. O projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/).
Escreva as mudanças em "Próxima versão" enquanto trabalha; `npm run release` transforma essa seção na versão nova.

## Próxima versão

## 0.5.1 — 2026-10-09

### Adicionado

- Ícones do Koti em `products/koti/icon/` (claro, escuro, tingido; SVG e PNG 1024) e logotipos em `products/koti/logo/`
  (ameixa, para fundos claros, e papel, para fundos escuros e ameixa), no mesmo padrão do PetHealthTracker.
  Nomes em inglês na web (`koti-icon-light`, `koti-logo-plum`) e em português no app (`koti-icone-claro`,
  `koti-logotipo-ameixa`), em `themes.koti.assets`. Sem o metadata C2PA dos arquivos originais.
- `ProductIcon` funciona com `product="koti"` e o novo `ProductLogo` mostra o logotipo certo para claro e escuro.
- Storybook: a página Marca/Temas de produto mostra os ícones e o logotipo do Koti no lugar de "pendente".
- `npm run sync:app -- --theme koti` passa a copiar ícones e logotipos do Koti para `docs/design/assets/products/`.

### Pendente

- Corrigir o `lockBackground` da base (`#DB9A5B` com `onLock` `#FFF8EE` dá 2,27:1; o par não está no CI). Os dois
  apps usam o próprio tema e passam.

## 0.5.0 — 2026-10-09

### Adicionado

- Temas de produto (`themes` no `tokens.json`): **PetHealthTracker** (Índigo) e **Koti** (Ameixa). Trocam só o destaque
  (`accent`, `on-accent`, `accent-hover`/`accentDeep`, `accent-text`, `link`, `tint`, `hero`, `toastAction`,
  `featureCard`, `lockBackground`, `themePreviewCard` e `blackFriday.accent`); o build falha se um tema mexer em outro token.
  A base Toski Labs (site e temas de VS Code, iTerm e Oh My Zsh) não muda: os arquivos atuais saem idênticos.
- Arquivos por tema: `app-tokens.pethealth.json`, `app-tokens.koti.json`, `web.<tema>.json`, `themes/<tema>.css`
  (ligue com `<html data-product="…">`) e `ToskiThemePetHealth.swift` / `ToskiThemeKoti.swift`.
- `npm run sync:app -- --theme pethealth|koti` e `--out <pasta>` (escreve fora do app). Copia também o ícone, as camadas
  e os mascotes do tema para `docs/design/assets/products/`.
- `products/pethealth/`: ícone (claro, escuro, tingido; SVG e PNG 1024), camadas do Icon Composer (iOS 26) e mascotes
  (dupla, dupla base, dupla erro, bolinha Índigo). Nomes em inglês na web e em português no app (`themes.<tema>.assets`).
  Sem o metadata C2PA dos arquivos originais.
- Componentes `ProductIcon` e `ProductMascot` (claro/escuro automático).
- Cores dos membros da casa do Koti, com variante mais escura para check e calendário (≥ 3:1 sobre o fundo claro).
- Storybook: seletor **Produto** (Toski Labs, PetHealthTracker, Koti) e a página Marca/Temas de produto.
- `npm run contrast` confere a base e cada tema (contraste de texto 4,5:1, grande/ícone 3:1).

### Pendente

- Ícones do Koti (`koti-icone.svg`, `koti-icone-escuro.svg`, `koti-icone-colorido.svg`): aguardando os arquivos.
- Variantes escuras das cores dos membros do Koti (check e calendário): propostas, aguardam aprovação.

### Problema conhecido da base

- `lockBackground` claro (`#DB9A5B`) com `onLock` (`#FFF8EE`) dá 2,27:1 e o par não está no CI. Não corrigido de
  propósito: os dois apps usam o próprio tema (PetHealthTracker 4,96:1; Koti 5,53:1).

## 0.4.2 — 2026-10-06

### Corrigido

- `CheckList`: o `<ul>` ganha `role="list"`. O Tailwind tira os marcadores (`list-style: none`) e, sem eles,
  o Safari/VoiceOver deixa de anunciar a lista.
- `buttonClasses()`: as variantes `primary` e `light` ganham `border-[1.5px] border-transparent`. No modo de alto
  contraste do Windows (`forced-colors`) o fundo some e o botão ficava sem contorno; agora o sistema desenha a
  borda. A altura não muda (altura fixa); botões sem largura fixa ficam 3px mais largos, igual ao `secondary`.

## 0.4.1 — 2026-10-06

### Corrigido

- `buttonClasses()`: a transição do botão passa a cobrir `scale` em vez de `transform`. O Tailwind 4 aplica
  `active:scale-[0.97]` pela propriedade `scale`, então na 0.4.0 o botão encolhia sem transição.

## 0.4.0 — 2026-10-06

### Adicionado

- Tokens de duração da interface (só web): `--toski-motion-fast` (100ms), `--toski-motion-base` (160ms) e
  `--toski-motion-enter` (250ms), em `tokens.css` e no `@theme`. Documentados em Tokens/Movimento, junto das curvas.
- Utilitário `toski-menu` para menus e popovers: entrada com `toski-menu-in` e saída com `toski-menu-out`
  (`data-closing`). Ajustável com `--menu-from` e `--menu-origin`; sem animação com "reduzir movimento".

### Alterado

- `buttonClasses()`: a transição cobre color, background-color, border-color e transform, e o botão encolhe a
  97% ao ser pressionado (`active:scale-[0.97]`).

## 0.3.4 — 2026-10-06

### Adicionado

- Release no GitHub a cada versão, com as notas do CHANGELOG e o link do npm (`release.yml` +
  `scripts/release-notes.mjs`). Rodando o workflow à mão, cria as Releases que faltam das tags antigas.
- Selos de npm, CI, Storybook e licença no README.
- Token `--toski-radius-focus` (6px, só web).

### Corrigido

- Anel de foco arredondado (6px) nos estilos de base: `:focus-visible` agora usa `border-radius:
  var(--toski-radius-focus)`. Elementos com raio próprio (classes `rounded-*`) mantêm o deles.

## 0.3.3 — 2026-10-06

### Adicionado

- `npm run release -- patch | minor | major`: confere o git e o CHANGELOG, roda a verificação, sobe a versão,
  faz o commit e a tag e envia ao GitHub (que publica no npm).
- Seção "Lançar uma versão" na página "Como usar" do Storybook.

### Removido

- Changesets (substituído pelo `npm run release`).

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
