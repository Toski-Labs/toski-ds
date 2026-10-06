# Toski DS

[![npm](https://img.shields.io/npm/v/@toski-labs/ds?label=npm&color=A9541F)](https://www.npmjs.com/package/@toski-labs/ds)
[![CI](https://github.com/Toski-Labs/toski-ds/actions/workflows/ci.yml/badge.svg)](https://github.com/Toski-Labs/toski-ds/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-online-DB9A5B)](https://toski-labs.github.io/toski-ds/)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-6B5648)](LICENSE)

**Português** · [English](README.en.md)

Design system da **Toski Labs**: uma fonte única para cores, tipografia, raios e componentes usados no
site (Astro + Tailwind CSS 4), no app iOS (SwiftUI) e nos temas (VS Code e iTerm2).

📖 **Storybook:** https://toski-labs.github.io/toski-ds/ · 📦 **npm:** [`@toski-labs/ds`](https://www.npmjs.com/package/@toski-labs/ds)

## O que tem aqui

| Pasta | Conteúdo |
|---|---|
| `tokens/tokens.json` | **Fonte da verdade**: marca, cores claro/escuro (compartilhadas, só web e só mobile), fonte, raios, layout, tokens do app e os pares de contraste conferidos no CI |
| `build/` | Gerado a partir dos tokens (não edite à mão) |
| `build/css/tokens.css` | Variáveis `--toski-*` (claro em `:root`; escuro pelo sistema ou com `data-theme="dark"`) |
| `build/css/theme.css` | Bloco `@theme` do Tailwind CSS 4 (cores, `--radius-*`, `--font-sans`) |
| `build/swift/ToskiColors.swift` | SwiftUI (nomes do app): cores claro/escuro, raios, espaçamentos, tamanhos e estilos de texto |
| `build/json/web.json` · `mobile.json` | JSON simples por plataforma (temas do VS Code e do iTerm2, scripts) |
| `build/json/app-tokens.json` | Tokens no formato do app PetHealthTracker (copiado com `npm run sync:app`) |
| `build/swift/ToskiTokens.swift` | SwiftUI: medidas dos componentes do app (`ToskiComponent`) e animações (`ToskiMotionTokens`) |
| `icons/` | 64 ícones de traço (`svg/`) e o mapa de nomes web ↔ app (`icons.json`) |
| `styles/tailwind.css` | Tudo o que um projeto com Tailwind CSS 4 precisa importar |
| `src/components/` | Componentes React + TypeScript + Tailwind CSS 4 |
| `assets/` | SVGs da Paçoca e do ícone do app (para o Xcode) |
| `docs/` | Páginas do Storybook (Introdução, Como usar, Cores, Tipografia, Raios) |

Componentes: `Button` (primary, secondary, light; lg 54px e md 48px), `Pill` (status, outline, tag, plus),
`Card` (surface, plain, hero, dashed; raios card 18 e panel 28), `IconBox`, `Kicker`, `SectionHeading`,
`CheckList`, `Icon` (64 ícones de traço em SVG inline, os mesmos do app), `AppIcon` e `Mascot` (Paçoca).

## Uso rápido

```bash
npm install @toski-labs/ds @fontsource-variable/outfit
```

```css
/* CSS principal */
@import "tailwindcss";
@import "@fontsource-variable/outfit";
@import "@toski-labs/ds/tailwind.css";
```

```tsx
import { Button, SectionHeading } from '@toski-labs/ds';

<SectionHeading kicker="Projetos" title="O que sai do laboratório" />
<Button href="/pethealthtracker" icon="arrow-right">Conhecer</Button>
```

```swift
// SwiftUI: copie build/swift/ToskiColors.swift para o projeto
Text("Olá").foregroundStyle(ToskiColors.textPrimary)
```

Mais detalhes na página [Como usar](https://toski-labs.github.io/toski-ds/?path=/docs/como-usar--docs).

## Desenvolvimento

Requer Node 22.

```bash
npm install
npm run dev              # Storybook em http://localhost:6006
npm run tokens:build     # gera build/ a partir de tokens/tokens.json
npm run contrast         # confere o contraste dos pares de tokens
npm run sync:app         # copia tokens e ícones para o app PetHealthTracker
npm run verify           # tudo o que o CI roda
```

### Mudar um token

1. Edite `tokens/tokens.json`.
2. Rode `npm run tokens:build` e `npm run contrast`.
3. Anote a mudança no `CHANGELOG.md`, em "## Próxima versão".
4. Faça o commit de `tokens/`, `build/` e `src/generated/` juntos.

O CI falha se `build/` estiver desatualizado ou se algum par de texto ficar abaixo de 4,5:1
(3:1 para texto grande e ícones).

## Acessibilidade

- Contraste conferido no CI nos dois temas.
- Foco visível (contorno `accent`, 2px) em tudo que é interativo.
- Botões com 48px ou mais de altura (área de toque mínima de 44px).
- Animações e transições desligadas com `prefers-reduced-motion`.
- Ícones e mascote decorativos por padrão (`aria-hidden`); passe `label` quando carregarem significado.

## Lançar uma versão

1. Enquanto trabalha, anote as mudanças no `CHANGELOG.md`, na seção **"## Próxima versão"**.
2. Na `main`, com tudo commitado:

   ```bash
   npm run release -- patch   # correções      (0.3.2 → 0.3.3)
   npm run release -- minor   # novidades      (0.3.2 → 0.4.0)
   npm run release -- major   # quebra a API   (0.3.2 → 1.0.0)
   ```

   O script confere o git e o CHANGELOG, roda `npm run verify`, sobe a versão, faz o commit `release: vX.Y.Z`
   e a tag, e pergunta antes de enviar ao GitHub. Use `--dry-run` para simular.
3. O workflow **Publicar no npm** (`.github/workflows/release.yml`) publica `@toski-labs/ds` com provenance e
   cria a [Release no GitHub](https://github.com/Toski-Labs/toski-ds/releases) com as notas do CHANGELOG.

## Versões

[Versionamento Semântico](https://semver.org/lang/pt-BR/).
Veja o [CHANGELOG](CHANGELOG.md).

## Licença

[MIT](LICENSE) © 2026 Toski Labs
