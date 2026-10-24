/**
 * Temas de produto que mudaram de nome. Quem usa o nome antigo recebe um erro com o nome novo,
 * em vez de ficar sem tema em silêncio. Saem na 0.7.0.
 */
export const renamedThemes: Record<string, { to: string; since: string; /** Sufixo Swift antigo. */ swift: string }> = {
  pethealth: { to: 'pawta', since: '0.6.0', swift: 'PetHealth' },
};

/** Mensagem para um nome antigo de tema, ou undefined se o nome não mudou. */
export function renamedThemeMessage(id: string): string | undefined {
  const r = renamedThemes[id];
  return r
    ? `O tema "${id}" agora se chama "${r.to}" (Toski DS ${r.since}). Troque o nome no código, no data-product e nos caminhos (themes/${r.to}.css, products/${r.to}/).`
    : undefined;
}

/** Lança o erro de nome antigo, se for o caso. */
export function assertThemeNotRenamed(id: string): void {
  const message = renamedThemeMessage(id);
  if (message) throw new Error(message);
}
