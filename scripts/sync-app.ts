/**
 * Copia build/json/app-tokens.json para o app PetHealthTracker
 * (docs/design/assets/tokens/tokens.json), que é lido pelos testes do app.
 *
 *   npm run sync:app                      → app em ../../mobile/PetHealthTracker
 *   npm run sync:app -- /caminho/do/app   → outro caminho
 *   npm run sync:app -- --check           → só confere (exit 1 se estiver diferente)
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const appRoot = resolve(root, args.find((a) => !a.startsWith('--')) ?? '../../mobile/PetHealthTracker');
const target = join(appRoot, 'docs/design/assets/tokens/tokens.json');
const source = readFileSync(join(root, 'build/json/app-tokens.json'), 'utf8');

if (!existsSync(dirname(target))) {
  console.error(`✗ Pasta do app não encontrada: ${dirname(target)}`);
  process.exit(1);
}

const current = existsSync(target) ? readFileSync(target, 'utf8') : '';
if (current === source) {
  console.log(`✓ ${target} já está igual ao Toski DS.`);
} else if (check) {
  console.error(`✗ ${target} está diferente do Toski DS. Rode: npm run sync:app`);
  process.exit(1);
} else {
  writeFileSync(target, source);
  console.log(`→ ${target} atualizado a partir do Toski DS.`);
}
