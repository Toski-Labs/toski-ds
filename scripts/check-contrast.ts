/**
 * Confere o contraste dos pares declarados em tokens.json → contrast (web e mobile), nos dois temas.
 * Texto: 4,5:1. Texto grande, ícones e foco: 3:1. Falha (exit 1) se algum par ficar abaixo.
 */
import { contrastReport } from '../src/tokens/index';

const results = contrastReport();
const failures = results.filter((r) => !r.pass);

for (const platform of ['web', 'mobile'] as const) {
  for (const mode of ['light', 'dark'] as const) {
    console.log(`\n${platform === 'web' ? 'Web' : 'Mobile'} · ${mode === 'light' ? 'claro' : 'escuro'}`);
    for (const r of results.filter((x) => x.platform === platform && x.mode === mode)) {
      const mark = r.pass ? '✓' : '✗';
      console.log(
        `  ${mark} ${r.fg.padEnd(16)} sobre ${r.bg.padEnd(18)} ${r.ratio.toFixed(2).padStart(5)}:1  (mín. ${r.min}, ${r.level === 'text' ? 'texto' : 'grande/ícone'})`,
      );
    }
  }
}

console.log(`\n${results.length - failures.length}/${results.length} pares passaram.`);
if (failures.length > 0) {
  console.error(`\n${failures.length} par(es) abaixo do mínimo:`);
  for (const f of failures) console.error(`  ${f.platform} ${f.mode}: ${f.fg} sobre ${f.bg} = ${f.ratio.toFixed(2)}:1 (mín. ${f.min})`);
  process.exit(1);
}
