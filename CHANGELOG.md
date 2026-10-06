# Changelog

Todas as mudanças relevantes do Toski DS. O projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/).
Novas entradas são geradas pelo [Changesets](https://github.com/changesets/changesets) (`npm run changeset`).

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
