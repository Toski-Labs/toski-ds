/**
 * Confere o contraste dos pares declarados em tokens.json → contrast (web e mobile), nos dois temas,
 * para a base e para cada tema de produto (PetHealthTracker, Koti).
 * Texto: 4,5:1. Texto grande, ícones e foco: 3:1. Falha (exit 1) se algum par ficar abaixo.
 */
import { allContrastReports, themeIds, themes, validateThemes } from '../src/tokens/index';

const problems = validateThemes();
if (problems.length > 0) {
  console.error(problems.map((p) => `✗ ${p}`).join('\n'));
  process.exit(1);
}

const results = allContrastReports();
const failures = results.filter((r) => !r.pass);

for (const theme of ['base', ...themeIds]) {
  for (const platform of ['web', 'mobile'] as const) {
    for (const mode of ['light', 'dark'] as const) {
      const rows = results.filter((x) => x.theme === theme && x.platform === platform && x.mode === mode);
      console.log(
        `\n${theme === 'base' ? 'Toski Labs' : themes[theme].name} · ${platform === 'web' ? 'Web' : 'Mobile'} · ${mode === 'light' ? 'claro' : 'escuro'}`,
      );
      for (const r of rows) {
        const mark = r.pass ? '✓' : '✗';
        console.log(
          `  ${mark} ${r.fg.padEnd(22)} sobre ${r.bg.padEnd(24)} ${r.ratio.toFixed(2).padStart(5)}:1  (mín. ${r.min}, ${r.level === 'text' ? 'texto' : 'grande/ícone'})`,
        );
      }
    }
  }
}

console.log(`\n${results.length - failures.length}/${results.length} pares passaram.`);
if (failures.length > 0) {
  console.error(`\n${failures.length} par(es) abaixo do mínimo:`);
  for (const f of failures)
    console.error(`  ${f.theme} ${f.platform} ${f.mode}: ${f.fg} sobre ${f.bg} = ${f.ratio.toFixed(2)}:1 (mín. ${f.min})`);
  process.exit(1);
}
