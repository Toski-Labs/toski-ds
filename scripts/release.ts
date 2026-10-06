/**
 * Lança uma versão nova do Toski DS.
 *
 *   npm run release -- patch      0.3.2 → 0.3.3 (correções)
 *   npm run release -- minor      0.3.2 → 0.4.0 (novidades)
 *   npm run release -- major      0.3.2 → 1.0.0 (mudanças que quebram)
 *   npm run release -- 1.2.3      versão exata
 *
 * Opções:
 *   --dry-run      só mostra o que faria, sem mudar nada
 *   --yes          não pergunta antes de enviar ao GitHub
 *   --skip-verify  pula o npm run verify (não recomendado)
 *
 * O que faz:
 *   1. Confere: na main, sem mudanças pendentes, igual ao GitHub.
 *   2. Confere que o CHANGELOG.md tem notas em "## Próxima versão".
 *   3. Roda npm run verify (tokens, contraste, tipos, testes e build).
 *   4. Troca "## Próxima versão" por "## X.Y.Z — data" e abre uma seção nova vazia.
 *   5. Sobe a versão no package.json e no package-lock.json.
 *   6. Commit "release: vX.Y.Z" e tag vX.Y.Z.
 *   7. Envia a main e a tag ao GitHub. O workflow "Publicar no npm" publica sozinho.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const NEXT = '## Próxima versão';
const REPO = 'https://github.com/Toski-Labs/toski-ds';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const yes = args.includes('--yes');
const skipVerify = args.includes('--skip-verify');
const bump = args.find((a) => !a.startsWith('--'));

function fail(message: string): never {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}

function git(...a: string[]): string {
  return execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim();
}

function step(message: string) {
  console.log(`\n→ ${message}`);
}

// ---------- versão nova ----------

const pkgPath = join(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version: string };
const current = pkg.version;

function nextVersion(from: string, kind: string | undefined): string {
  if (!kind) fail('Diga o tipo da versão: npm run release -- patch | minor | major | X.Y.Z');
  if (/^\d+\.\d+\.\d+$/.test(kind)) return kind;
  const [major, minor, patch] = from.split('.').map(Number);
  if (kind === 'patch') return `${major}.${minor}.${patch + 1}`;
  if (kind === 'minor') return `${major}.${minor + 1}.0`;
  if (kind === 'major') return `${major + 1}.0.0`;
  return fail(`Tipo de versão desconhecido: ${kind}. Use patch, minor, major ou X.Y.Z.`);
}

function isGreater(a: string, b: string): boolean {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] > pb[i];
  return false;
}

const version = nextVersion(current, bump);
const tag = `v${version}`;
if (!isGreater(version, current)) fail(`A versão nova (${version}) precisa ser maior que a atual (${current}).`);

console.log(`Toski DS: ${current} → ${version}${dryRun ? '  (simulação, nada será alterado)' : ''}`);

// ---------- 1. git ----------

step('Conferindo o git');
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
if (branch !== 'main') fail(`Você está na branch "${branch}". Lance a versão a partir da main.`);
if (git('status', '--porcelain')) fail('Há mudanças sem commit. Faça o commit (ou guarde com git stash) antes.');
git('fetch', '--quiet', '--tags', 'origin');
const behind = Number(git('rev-list', '--count', 'HEAD..origin/main'));
if (behind > 0) fail(`A main local está ${behind} commit(s) atrás do GitHub. Rode git pull antes.`);
if (git('tag', '--list', tag)) fail(`A tag ${tag} já existe.`);
console.log('  ✓ main, sem mudanças pendentes, em dia com o GitHub');

// ---------- 2. CHANGELOG ----------

step('Conferindo o CHANGELOG.md');
const changelogPath = join(root, 'CHANGELOG.md');
const changelog = readFileSync(changelogPath, 'utf8');
const start = changelog.indexOf(NEXT);
if (start === -1) fail(`O CHANGELOG.md precisa de uma seção "${NEXT}" com as notas desta versão.`);
const afterHeading = start + NEXT.length;
const nextSection = changelog.indexOf('\n## ', afterHeading);
const notes = changelog.slice(afterHeading, nextSection === -1 ? undefined : nextSection).trim();
if (!notes) fail(`A seção "${NEXT}" do CHANGELOG.md está vazia. Escreva o que mudou antes de lançar.`);
console.log(notes.split('\n').map((l) => `  ${l}`).join('\n'));

// ---------- 3. verificação ----------

if (skipVerify) {
  step('Pulando a verificação (--skip-verify)');
} else {
  step('Rodando npm run verify');
  const run = spawnSync('npm', ['run', 'verify'], { cwd: root, stdio: 'inherit' });
  if (run.status !== 0) fail('A verificação falhou. Corrija antes de lançar.');
}

if (dryRun) {
  console.log(`\nSimulação: faria o commit "release: ${tag}", criaria a tag ${tag} e enviaria ao GitHub.`);
  process.exit(0);
}

// ---------- 4–6. arquivos, commit e tag ----------

step(`Atualizando CHANGELOG.md, package.json e package-lock.json para ${version}`);
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  changelogPath,
  `${changelog.slice(0, start)}${NEXT}\n\n## ${version} — ${today}${changelog.slice(afterHeading)}`,
);
execFileSync('npm', ['version', version, '--no-git-tag-version'], { cwd: root, stdio: 'ignore' });

step(`Commit e tag ${tag}`);
git('add', 'CHANGELOG.md', 'package.json', 'package-lock.json');
git('commit', '--quiet', '-m', `release: ${tag}`);
git('tag', '-a', tag, '-m', tag);
console.log(`  ✓ commit "release: ${tag}" e tag ${tag}`);

// ---------- 7. envio ----------

async function confirm(): Promise<boolean> {
  if (yes) return true;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`\nEnviar a main e a tag ${tag} para o GitHub e publicar no npm? (s/N) `);
  rl.close();
  return /^s(im)?$/i.test(answer.trim());
}

if (!(await confirm())) {
  console.log(`\nNada foi enviado. Quando quiser: git push origin main && git push origin ${tag}`);
  console.log(`Para desfazer: git tag -d ${tag} && git reset --hard HEAD~1`);
  process.exit(0);
}

step('Enviando ao GitHub');
git('push', '--quiet', 'origin', 'main');
git('push', '--quiet', 'origin', tag);
console.log(`  ✓ main e ${tag} enviadas`);
console.log(`\nO workflow "Publicar no npm" vai publicar @toski-labs/ds@${version}:`);
console.log(`  ${REPO}/actions`);
console.log(`  https://www.npmjs.com/package/@toski-labs/ds`);
