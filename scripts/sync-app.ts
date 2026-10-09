/**
 * Leva o Toski DS para o app PetHealthTracker:
 *   - build/json/app-tokens.<tema>.json → docs/design/assets/tokens/tokens.json (lido pelos testes do app)
 *   - icons/svg/*.svg (os que têm nome no app) → docs/design/assets/svg/icons/<nome>.svg
 *   - products/<tema>/ (ícone, camadas e mascotes) → docs/design/assets/products/<nome-no-app>.<ext>
 *
 *   npm run sync:app                           → tema pethealth, app em ../../mobile/PetHealthTracker
 *   npm run sync:app -- /caminho/do/app        → outro caminho
 *   npm run sync:app -- --theme koti /caminho  → outro tema (pethealth | koti)
 *   npm run sync:app -- --out /pasta/temp      → escreve numa pasta qualquer (cria o que faltar), sem tocar no app
 *   npm run sync:app -- --check                → só confere, sem escrever (exit 1 se algo estiver diferente)
 *
 * Depois de mudar ícones, rode no app: python3 scripts/generate-icon-paths.py
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { iconEntries, themeIds, themes } from '../src/tokens/index';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const check = args.includes('--check');
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const themeId = flag('--theme') ?? 'pethealth';
if (!themeIds.includes(themeId)) {
  console.error(`✗ Tema desconhecido: ${themeId}. Temas: ${themeIds.join(', ')}`);
  process.exit(1);
}
const out = flag('--out');
const valueOf = new Set([flag('--theme'), out]);
const positional = args.find((a) => !a.startsWith('--') && !valueOf.has(a));
const appRoot = resolve(root, out ?? positional ?? (themeId === 'pethealth' ? '../../mobile/PetHealthTracker' : `../../mobile/${themes[themeId].name}`));

const theme = themes[themeId];
const pairs: [string, string][] = [
  [join(root, `build/json/app-tokens.${themeId}.json`), join(appRoot, 'docs/design/assets/tokens/tokens.json')],
  ...iconEntries
    .filter((i) => i.mobile)
    .map((i): [string, string] => [
      join(root, 'icons/svg', `${i.id}.svg`),
      join(appRoot, 'docs/design/assets/svg/icons', `${i.mobile}.svg`),
    ]),
  ...theme.assets.map((a): [string, string] => [
    join(root, 'products', themeId, a.file),
    join(appRoot, 'docs/design/assets/products', `${a.mobile}${extname(a.file)}`),
  ]),
];

const iconDir = join(appRoot, 'docs/design/assets/svg/icons');
if (out && !check) mkdirSync(iconDir, { recursive: true });
if (!existsSync(iconDir) && !(out && check)) {
  console.error(`✗ Pasta do app não encontrada: ${iconDir}`);
  process.exit(1);
}

let different = 0;
let iconsChanged = false;
for (const [from, to] of pairs) {
  const source = readFileSync(from);
  const current = existsSync(to) ? readFileSync(to) : null;
  if (current && current.equals(source)) continue;
  different++;
  if (to.endsWith('.svg')) iconsChanged = true;
  if (check) console.error(`✗ diferente: ${to}`);
  else {
    mkdirSync(dirname(to), { recursive: true });
    writeFileSync(to, source);
    console.log(`→ ${to}`);
  }
}

// Ícones que o app tem e o DS não
const known = new Set(iconEntries.filter((i) => i.mobile).map((i) => `${i.mobile}.svg`));
const extras = out ? [] : readdirSync(iconDir).filter((f) => f.endsWith('.svg') && !known.has(f));
if (extras.length) {
  console.error(`✗ O app tem ícones que o DS não tem: ${extras.join(', ')}. Adicione-os em icons/ no DS.`);
  different++;
}

if (different === 0) console.log(`✓ O app está igual ao Toski DS (tema ${theme.name}: tokens, ícones e mascotes).`);
else if (check) {
  console.error('Rode: npm run sync:app');
  process.exit(1);
} else if (iconsChanged) {
  console.log('Ícones mudaram: rode no app  python3 scripts/generate-icon-paths.py');
}
if (extras.length) process.exit(1);
