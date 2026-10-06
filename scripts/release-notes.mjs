/**
 * Imprime as notas de uma versão a partir do CHANGELOG.md (para a Release do GitHub).
 *
 *   node scripts/release-notes.mjs 0.3.3
 *
 * JavaScript puro (sem dependências): roda no workflow sem npm ci.
 * Com NPM_PUBLISHED=1, inclui o link da versão no npm (as anteriores à 0.3.1 não foram publicadas).
 */
import { readFileSync } from 'node:fs';

const version = (process.argv[2] ?? '').replace(/^v/, '');
if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.error('Uso: node scripts/release-notes.mjs X.Y.Z');
  process.exit(1);
}

const changelog = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const heading = changelog.split('\n').find((line) => line.startsWith(`## ${version} `) || line === `## ${version}`);
if (!heading) {
  console.error(`O CHANGELOG.md não tem a seção "## ${version}".`);
  process.exit(1);
}

const start = changelog.indexOf(heading) + heading.length;
const end = changelog.indexOf('\n## ', start);
const notes = changelog.slice(start, end === -1 ? undefined : end).trim();

const npm =
  process.env.NPM_PUBLISHED === '1'
    ? `📦 npm: [\`@toski-labs/ds@${version}\`](https://www.npmjs.com/package/@toski-labs/ds/v/${version}) · \`npm i @toski-labs/ds@${version}\`\n`
    : '';

console.log(`${notes}

---

${npm}📖 Storybook: https://toski-labs.github.io/toski-ds/
📝 Todas as versões: [CHANGELOG.md](https://github.com/Toski-Labs/toski-ds/blob/main/CHANGELOG.md)`);
