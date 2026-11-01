/**
 * Confere o contraste dos pares declarados em tokens.json → contrast (web e mobile), nos dois temas,
 * para a base e para cada tema de produto (Pawta, Koti).
 * Também confere os pares da Nova XP em cada paleta (Bege, Neve) combinada com a base e com cada tema.
 * Par abaixo do mínimo que consta em contrast.palettes.known sai como aviso (⚠) e não derruba o CI.
 * Texto: 4,5:1. Texto grande, ícones e foco: 3:1. Falha (exit 1) se algum par ficar abaixo.
 */
import { allContrastReports, paletteById, paletteIds, themeIds, themes, validatePalettes, validateThemes } from '../src/tokens/index';

const problems = [...validateThemes(), ...validatePalettes()];
if (problems.length > 0) {
  console.error(problems.map((p) => `✗ ${p}`).join('\n'));
  process.exit(1);
}

const results = allContrastReports();
const failures = results.filter((r) => !r.pass && !r.known);
const accepted = results.filter((r) => !r.pass && r.known);

for (const theme of ['base', ...themeIds]) {
  for (const platform of ['web', 'mobile'] as const) {
    for (const mode of ['light', 'dark'] as const) {
      const rows = results.filter((x) => !x.palette && x.theme === theme && x.platform === platform && x.mode === mode);
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

// Nova XP: cada paleta com a base e com cada tema de produto (a paleta vem depois do tema)
for (const palette of paletteIds) {
  for (const theme of ['base', ...themeIds]) {
    for (const mode of ['light', 'dark'] as const) {
      const rows = results.filter((x) => x.palette === palette && x.theme === theme && x.mode === mode);
      console.log(
        `\nPaleta ${paletteById(palette).name} · ${theme === 'base' ? 'Toski Labs' : themes[theme].name} · Mobile · ${mode === 'light' ? 'claro' : 'escuro'}`,
      );
      for (const r of rows) {
        const mark = r.pass ? '✓' : r.known ? '⚠' : '✗';
        console.log(
          `  ${mark} ${r.fg.padEnd(22)} sobre ${r.bg.padEnd(24)} ${r.ratio.toFixed(2).padStart(5)}:1  (mín. ${r.min}, ${r.level === 'text' ? 'texto' : 'grande/ícone'})`,
        );
      }
    }
  }
}

console.log(`\n${results.length - failures.length - accepted.length}/${results.length} pares passaram.`);
if (accepted.length > 0) {
  console.log(`${accepted.length} par(es) abaixo do mínimo aceitos com ressalva (tokens.json → contrast.palettes.known):`);
  for (const f of accepted)
    console.log(`  ⚠ paleta ${f.palette} · ${f.theme} ${f.mode}: ${f.fg} sobre ${f.bg} = ${f.ratio.toFixed(2)}:1. ${f.known}`);
}
if (failures.length > 0) {
  console.error(`\n${failures.length} par(es) abaixo do mínimo:`);
  for (const f of failures)
    console.error(
      `  ${f.palette ? `paleta ${f.palette} · ` : ''}${f.theme} ${f.platform} ${f.mode}: ${f.fg} sobre ${f.bg} = ${f.ratio.toFixed(2)}:1 (mín. ${f.min})`,
    );
  process.exit(1);
}
