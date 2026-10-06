# PetHealthTracker — assets de design

Pacote com a logo, a mascote (Paçoca), os ícones do app, as animações e os tokens de cor/tipografia. Fonte da verdade visual: canvas "PetHealthTracker — Telas do App". O app se chama PetHealthTracker; Toski Labs é a empresa. O código usa o prefixo `Toski` (`Toski.accent`, `ToskiMascot`) porque as cores, a fonte e a mascote são o design system da Toski Labs.

## Estrutura

```
svg/
  pacoca-bolinha-claro.svg        Mascote completa, tema claro (login, estados vazios)
  pacoca-bolinha-escuro.svg       Mascote completa, tema escuro (corpo com contorno creme)
  pacoca-sem-bolinha-claro.svg    Só a Paçoca — camada fixa para animar a bolinha
  pacoca-sem-bolinha-escuro.svg
  bolinha-claro.svg               Só a bolinha — camada animada
  bolinha-escuro.svg
  pacoca-bolinha-chao-claro.svg   Bolinha caída no canto (tela de Erro)
  pacoca-bolinha-chao-escuro.svg
  icone-caramelo.svg              Ícone do app padrão (1024) — estilo Claro (Any)
  icone-caramelo-escuro.svg       Ícone padrão, estilo Escuro (Dark, iOS 18+), fundo transparente
  icone-caramelo-colorido.svg     Ícone padrão, estilo Colorido (Tinted, iOS 18+), tons de cinza
  icone-focinho.svg               Ícone alternativo (Plus)
  icone-papel.svg                 Ícone alternativo (Plus)
tokens/
  tokens.json                     Cores (claro/escuro), tipografia, raios, espaçamentos
swift/
  Color+Toski.swift               Cores e fontes prontas para SwiftUI (sem Asset Catalog)
  ToskiMascot.swift               Mascote animada, LoadingView, pontinhos e ícone de sincronização
animacoes.md                      Especificação de cada animação
```

## Como usar no Xcode

1. Arrastar os SVGs de `svg/` para o `Assets.xcassets`, marcar **Preserve Vector Data** e, nos pares claro/escuro, **Appearances: Any, Dark** (claro em Any, escuro em Dark). Nomes sugeridos: `PacocaBolinha`, `PacocaSemBolinha`, `Bolinha`, `PacocaBolinhaChao`.
2. Ícone do app: no AppIcon, marcar **Appearances: Any, Dark, Tinted** e exportar em PNG 1024×1024: `icone-caramelo.svg` em Any, `icone-caramelo-escuro.svg` em Dark (PNG com fundo transparente) e `icone-caramelo-colorido.svg` em Tinted (tons de cinza). `icone-focinho` e `icone-papel` entram como ícones alternativos (`CFBundleAlternateIcons`), só na versão clara; no modo Escuro/Colorido o iOS gera a variação deles.
3. Copiar `swift/Color+Toski.swift` e `swift/ToskiMascot.swift` para o projeto.
4. Fonte Outfit: baixar do Google Fonts (licença OFL), adicionar os `.ttf` (Regular, Medium, SemiBold, Bold) ao projeto e ao `Info.plist` em *Fonts provided by application*.

## Regras

- A mascote nunca muda de cor fora dos temas definidos aqui.
- No tema claro o corpo não tem contorno; no escuro tem contorno creme (#F4E4CC).
- O contorno da bolinha usa a cor do fundo (claro: #F7F1E8), para "descolar" ela do corpo.
- Toda animação respeita **Reduzir movimento**: a bolinha fica parada.
