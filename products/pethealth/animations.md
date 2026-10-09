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
