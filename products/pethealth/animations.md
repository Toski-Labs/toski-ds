# Animações da dupla — PetHealthTracker

Como a dupla (cachorro e gato) e a bolinha se movem no app. Curvas e tempos seguem `motion` do `tokens.json`;
aqui só ficam as regras de cada tela.

## Login

- O **coração pulsa**: escala 1 → 1,12 → 1.
- Duração: 1,8 s, `ease-in-out`, em repetição contínua.
- A **dupla fica parada**; só o coração se move.

## Carregando

- A **bolinha pula entre os focinhos**: sobe 16 pt e volta, em 1,2 s, `ease-in-out`.
- Fica **parada no alto entre 45% e 60%** do ciclo.
- Os **pontinhos** continuam como hoje.

## Erro e estados vazios

- Sem animação. A dupla (`pair-error-*` no erro, `pair-*` nos vazios) fica parada.

## Reduzir movimento

- Com "Reduzir movimento" ligado no sistema, **tudo fica parado**: o coração do login, a bolinha do carregamento
  (na posição de repouso) e qualquer outra animação da dupla. Os pontinhos também não se movem.

## Cores da bolinha

As cores ficam nos SVGs (`ball-indigo-*` e a bolinha de `pair-error-*`), não em tokens. O aro acompanha o círculo atrás da dupla.

| Aparência | Bolinha | Costura | Aro |
| --- | --- | --- | --- |
| Claro | `#3E4C8A` (Índigo) | `#F4E4CC` (creme) | `#E3E6F5` |
| Escuro | `#A9B4E8` (lilás) | `#2C376A` (Índigo escuro) | `#2A2E45` |

No escuro, a bolinha tem contraste de 6,6:1 sobre o círculo do hero (`#2A2E45`).
