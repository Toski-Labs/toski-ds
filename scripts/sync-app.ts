/**
 * Leva o Toski DS para o app PetHealthTracker:
 *   - build/json/app-tokens.json → docs/design/assets/tokens/tokens.json (lido pelos testes do app)
 *   - icons/svg/*.svg (os que têm nome no app) → docs/design/assets/svg/icons/<nome>.svg
 *
 *   npm run sync:app                      → app em ../../mobile/PetHealthTracker
 *   npm run sync:app -- /caminho/do/app   → outro caminho
 *   npm run sync:app -- --check           → só confere (exit 1 se algo estiver diferente)
 *
 * Depois de mudar ícones, rode no app: python3 scripts/generate-icon-paths.py
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { iconEntries } from '../src/tokens/index';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const appRoot = resolve(root, args.find((a) => !a.startsWith('--')) ?? '../../mobile/PetHealthTracker');

const pairs: [string, string][] = [
  [join(root, 'build/json/app-tokens.json'), join(appRoot, 'docs/design/assets/tokens/tokens.json')],
  ...iconEntries
    .filter((i) => i.mobile)
    .map((i): [string, string] => [
      join(root, 'icons/svg', `${i.id}.svg`),
      join(appRoot, 'docs/design/assets/svg/icons', `${i.mobile}.svg`),
    ]),
];

const iconDir = join(appRoot, 'docs/design/assets/svg/icons');
if (!existsSync(iconDir)) {
  console.error(`✗ Pasta do app não encontrada: ${iconDir}`);
  process.exit(1);
}

let different = 0;
let iconsChanged = false;
for (const [from, to] of pairs) {
  const source = readFileSync(from, 'utf8');
  const current = existsSync(to) ? readFileSync(to, 'utf8') : '';
  if (current === source) continue;
  different++;
  if (to.endsWith('.svg')) iconsChanged = true;
  if (check) console.error(`✗ diferente: ${to}`);
  else {
    writeFileSync(to, source);
    console.log(`→ ${to}`);
  }
}

// Ícones que o app tem e o DS não
const known = new Set(iconEntries.filter((i) => i.mobile).map((i) => `${i.mobile}.svg`));
const extras = readdirSync(iconDir).filter((f) => f.endsWith('.svg') && !known.has(f));
if (extras.length) {
  console.error(`✗ O app tem ícones que o DS não tem: ${extras.join(', ')}. Adicione-os em icons/ no DS.`);
  different++;
}

if (different === 0) console.log('✓ O app está igual ao Toski DS (tokens e ícones).');
else if (check) {
  console.error('Rode: npm run sync:app');
  process.exit(1);
} else if (iconsChanged) {
  console.log('Ícones mudaram: rode no app  python3 scripts/generate-icon-paths.py');
}
if (extras.length) process.exit(1);
