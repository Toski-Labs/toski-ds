import { contrastRatio } from '../tokens/contrast';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  allContrastReports,
  colorValue,
  contrastReport,
  platformColors,
  themeIds,
  themedColors,
  themes,
  validateThemes,
} from '../tokens';

describe('contraste', () => {
  it('calcula a razão WCAG', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
  });

  it('todos os pares de texto e ícone passam nos dois temas', () => {
    const failures = contrastReport().filter((r) => !r.pass);
    expect(failures).toEqual([]);
  });
});

describe('temas de produto', () => {
  it('só trocam tokens permitidos e todos existem na base', () => {
    expect(validateThemes()).toEqual([]);
  });

  it('o contraste passa na base e em cada tema', () => {
    const results = allContrastReports();
    expect(new Set(results.map((r) => r.theme))).toEqual(new Set(['base', ...themeIds]));
    expect(results.filter((r) => !r.pass)).toEqual([]);
  });

  it('o tema não mexe em neutros, critical, success nem na base', () => {
    for (const id of themeIds) {
      for (const platform of ['web', 'mobile'] as const) {
        const base = platformColors(platform);
        const touched = themedColors(platform, id).filter((c, i) => c.light !== base[i].light || c.dark !== base[i].dark);
        for (const c of touched) expect(c.name).not.toMatch(/^(background|surface|ink|muted|line|critical|success|textPrimary|textSecondary|border|avatarUser)/);
      }
    }
  });

  it('PetHealthTracker usa os valores aprovados', () => {
    expect(colorValue('web', 'accent', 'light', 'pethealth')).toBe('#3E4C8A');
    expect(colorValue('mobile', 'accentDeep', 'dark', 'pethealth')).toBe('#C9D0F2');
    expect(colorValue('mobile', 'lockBackground', 'light', 'pethealth')).toBe('#5C69A4');
    expect(colorValue('web', 'tint', 'light', 'pethealth')).toBe('#F3E4CF'); // neutro da base
  });

  it('Koti usa os valores aprovados', () => {
    expect(colorValue('web', 'accent-hover', 'dark', 'koti')).toBe('#E8C2DD');
    expect(colorValue('mobile', 'accentDeep', 'light', 'koti')).toBe('#5E2F55');
    expect(colorValue('mobile', 'heroBackground', 'dark', 'koti')).toBe('#46293F');
    expect(colorValue('mobile', 'tint', 'dark', 'koti')).toBe('#3A2436');
  });

  it('todo arquivo de produto citado existe', () => {
    for (const id of themeIds) {
      for (const a of themes[id].assets) expect(existsSync(join(__dirname, '../../products', id, a.file))).toBe(true);
    }
  });
});
