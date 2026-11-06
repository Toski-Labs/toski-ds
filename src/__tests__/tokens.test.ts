import { compositeOver, contrastRatio } from '../tokens/contrast';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  allContrastReports,
  colorValue,
  contrastReport,
  defaultPaletteId,
  extraPaletteIds,
  knownGaps,
  mobile,
  paletteColorSet,
  paletteContrastReport,
  paletteIds,
  paletteShadows,
  paletteVocabulary,
  palettes,
  platformColors,
  themeIds,
  themedColors,
  themes,
  validatePalettes,
  validateThemes,
} from '../tokens';

describe('contraste', () => {
  it('calcula a razão WCAG', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
  });

  it('compõe uma cor translúcida sobre um fundo opaco', () => {
    expect(compositeOver('rgba(255,255,255,0.5)', '#000000')).toBe('#808080');
    expect(compositeOver('rgba(0,0,0,0)', '#F5F5F7')).toBe('#F5F5F7');
    expect(compositeOver('#123456', '#FFFFFF')).toBe('#123456');
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
    expect(results.filter((r) => !r.pass && !r.known)).toEqual([]);
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

  it('Pawta usa os valores aprovados', () => {
    expect(colorValue('web', 'accent', 'light', 'pawta')).toBe('#3E4C8A');
    expect(colorValue('mobile', 'accentDeep', 'dark', 'pawta')).toBe('#C9D0F2');
    expect(colorValue('mobile', 'toastAction', 'light', 'pawta')).toBe('#B7C0EE');
    expect(colorValue('web', 'tint', 'light', 'pawta')).toBe('#F3E4CF'); // neutro da base
  });

  it('Koti usa os valores aprovados', () => {
    expect(colorValue('web', 'accent-hover', 'dark', 'koti')).toBe('#E8C2DD');
    expect(colorValue('mobile', 'accentDeep', 'light', 'koti')).toBe('#5E2F55');
    expect(colorValue('mobile', 'heroBackground', 'dark', 'koti')).toBe('#46293F');
    expect(colorValue('mobile', 'tint', 'dark', 'koti')).toBe('#3A2436');
  });

  it('o nome antigo "pethealth" dá erro com o nome novo', () => {
    expect(themeIds).not.toContain('pethealth');
    expect(() => themedColors('web', 'pethealth')).toThrow('O tema "pethealth" agora se chama "pawta"');
    expect(() => colorValue('mobile', 'accent', 'light', 'pethealth')).toThrow('agora se chama "pawta"');
    expect(() => themedColors('web', 'nao-existe')).toThrow('Tema não existe: nao-existe');
  });

  it('o Swift do Pawta não deixa usar ToskiPetHealthTheme e sugere o nome novo', () => {
    const swift = readFileSync(join(__dirname, '../../build/swift/ToskiThemePawta.swift'), 'utf8');
    expect(swift).toContain('public enum ToskiPawtaTheme {');
    expect(swift).toContain('@available(*, unavailable, renamed: "ToskiPawtaTheme")\npublic typealias ToskiPetHealthTheme = ToskiPawtaTheme');
    expect(existsSync(join(__dirname, '../../build/swift/ToskiThemePetHealth.swift'))).toBe(false);
    expect(existsSync(join(__dirname, '../../build/css/themes/pethealth.css'))).toBe(false);
  });

  it('todo arquivo de produto citado existe', () => {
    for (const id of themeIds) {
      for (const a of themes[id].assets) expect(existsSync(join(__dirname, '../../products', id, a.file))).toBe(true);
    }
  });
});

describe('paletas (Nova XP)', () => {
  const read = (file: string) => JSON.parse(readFileSync(join(__dirname, '../../build/json', file), 'utf8'));

  it('só trocam tokens permitidos e todos existem na base', () => {
    expect(validatePalettes()).toEqual([]);
    expect(paletteIds).toEqual(['bege', 'neve']);
    expect(defaultPaletteId).toBe('bege');
    expect(extraPaletteIds).toEqual(['neve']);
  });

  it('o Bege é a base: pedir a paleta padrão não muda nenhum valor', () => {
    for (const theme of [undefined, ...themeIds]) {
      expect(themedColors('mobile', theme, 'bege')).toEqual(themedColors('mobile', theme));
    }
  });

  it('o Bege tem os tokens novos da Nova XP', () => {
    expect(colorValue('mobile', 'neutralFill', 'light')).toBe('#F3E4CF');
    expect(colorValue('mobile', 'glass', 'dark')).toBe('rgba(46,36,29,0.62)');
    expect(colorValue('mobile', 'glassBorder', 'light')).toBe('#958373');
    expect(colorValue('mobile', 'tabGlass', 'dark')).toBe('rgba(27,21,17,0.80)');
    expect(colorValue('mobile', 'checkLine', 'dark')).toBe('#A08B78');
    expect(colorValue('mobile', 'badgeBg', 'dark')).toBe('#2E241D');
    expect(colorValue('mobile', 'petB', 'light')).toBe('#E4EEDC');
    expect(colorValue('mobile', 'mLine', 'dark')).toBe('#F4E4CC');
    expect(colorValue('mobile', 'mInk', 'dark')).toBe('#100C0A');
  });

  it('o Neve usa os valores aprovados', () => {
    expect(colorValue('mobile', 'background', 'light', 'pawta', 'neve')).toBe('#F5F5F7');
    expect(colorValue('mobile', 'background', 'dark', 'pawta', 'neve')).toBe('#121214');
    expect(colorValue('mobile', 'textPrimary', 'dark', 'pawta', 'neve')).toBe('#F5F5F7');
    expect(colorValue('mobile', 'textSecondary', 'light', 'pawta', 'neve')).toBe('#666669'); // ajustado do #6E6E73 do canvas (4,5:1 sobre neutralFill)
    expect(colorValue('mobile', 'textSecondary', 'dark', 'pawta', 'neve')).toBe('#A1A1A6');
    expect(colorValue('mobile', 'tabIdle', 'dark', 'pawta', 'neve')).toBe('#A1A1A6');
    expect(colorValue('mobile', 'neutralFill', 'dark', 'pawta', 'neve')).toBe('#2C2C2E');
    expect(colorValue('mobile', 'glass', 'light', 'pawta', 'neve')).toBe('rgba(255,255,255,0.62)');
    expect(colorValue('mobile', 'glassBorder', 'dark', 'pawta', 'neve')).toBe('#68686D');
    expect(colorValue('mobile', 'tabGlass', 'light', 'pawta', 'neve')).toBe('rgba(250,250,252,0.78)');
    expect(colorValue('mobile', 'checkLine', 'light', 'pawta', 'neve')).toBe('#8A8A8E');
    expect(colorValue('mobile', 'mLine', 'light', 'pawta', 'neve')).toBe('#1C1C1E');
  });

  it('o tema de produto manda no destaque em qualquer paleta; a paleta vence só em onAccent', () => {
    for (const palette of paletteIds) {
      expect(colorValue('mobile', 'accent', 'light', 'pawta', palette)).toBe('#3E4C8A');
      expect(colorValue('mobile', 'accent', 'dark', 'pawta', palette)).toBe('#A9B4E8');
      expect(colorValue('mobile', 'accent', 'light', 'koti', palette)).toBe('#7A3F6E');
      expect(colorValue('mobile', 'critical', 'light', 'pawta', palette)).toBe('#A3341A');
      expect(colorValue('mobile', 'critical', 'dark', 'pawta', palette)).toBe('#F09A78');
      expect(colorValue('mobile', 'heroBackground', 'light', 'pawta', palette)).toBe('#E3E6F5');
      expect(colorValue('mobile', 'toastAction', 'dark', 'pawta', palette)).toBe('#3E4C8A');
    }
    expect(colorValue('mobile', 'onAccent', 'dark', 'pawta', 'bege')).toBe('#231B17');
    expect(colorValue('mobile', 'onAccent', 'dark', 'pawta', 'neve')).toBe('#121214');
    expect(colorValue('mobile', 'onAccent', 'light', 'pawta', 'neve')).toBe('#FFF8EE');
  });

  it('o Neve não define os tokens antigos que a Nova XP aposenta', () => {
    for (const name of ['surface', 'border', 'divider', 'successBackground', 'tint', 'accent', 'critical', 'toastAction']) {
      expect(Object.keys(palettes.neve.color)).not.toContain(name);
    }
  });

  it('paletas só valem no mobile', () => {
    expect(() => themedColors('web', undefined, 'neve')).toThrow('só existe no mobile');
    expect(() => themedColors('mobile', undefined, 'nao-existe')).toThrow('Paleta não existe: nao-existe');
  });

  it('o vocabulário da Nova XP sai completo e na mesma ordem em qualquer paleta e tema', () => {
    expect(paletteVocabulary).toEqual([
      'neutralFill', 'glass', 'glassBorder', 'tabGlass', 'checkLine', 'badgeBg', 'petA', 'petB', 'mLine', 'mInk',
      'heroBackground', 'toastAction', 'background', 'textPrimary', 'textSecondary', 'tabIdle', 'onAccent',
    ]);
    for (const palette of paletteIds) {
      for (const theme of [undefined, ...themeIds]) {
        expect(paletteColorSet(palette, theme).map((c) => c.name)).toEqual(paletteVocabulary);
      }
    }
  });

  it('a sombra do vidro difere entre claro e escuro e entre paletas', () => {
    const bege = paletteShadows('bege').glass;
    const neve = paletteShadows('neve').glass;
    expect(bege.light).toMatchObject({ y: 1, blur: 3, color: '#231B17', opacity: 0.15, ring: { width: 0.5, color: '#231B17', opacity: 0.06 } });
    expect(bege.dark).toMatchObject({ color: '#000000', opacity: 0.35, ring: { color: '#F7F1E8', opacity: 0.06 } });
    expect(neve.light).toMatchObject({ color: '#000000', opacity: 0.08, ring: { color: '#000000', opacity: 0.06 } });
    expect(neve.dark).toMatchObject({ color: '#000000', opacity: 0.4, ring: { color: '#FFFFFF', opacity: 0.06 } });
    expect(mobile.shadow).not.toHaveProperty('glass'); // as sombras de sempre continuam iguais nos dois modos
  });

  it('o contraste da Nova XP passa em cada paleta × tema, salvo as ressalvas conhecidas', () => {
    for (const palette of paletteIds) {
      for (const theme of [undefined, ...themeIds]) {
        const report = paletteContrastReport(palette, theme);
        expect(report.length).toBeGreaterThan(0);
        for (const r of report.filter((x) => !x.pass)) expect(r.known, `${palette} ${theme} ${r.fg}/${r.bg}`).toBeTruthy();
      }
    }
  });

  it('as ressalvas de contraste não crescem sem ninguém ver', () => {
    expect(knownGaps.map((k) => `${k.palette} ${k.mode} ${k.fg}/${k.bg}`)).toEqual(['neve light textSecondary/heroBackground']);
    // o app da Nova XP é o Pawta: nele nada fica abaixo do mínimo, em nenhuma paleta
    for (const palette of paletteIds) expect(paletteContrastReport(palette, 'pawta').filter((r) => !r.pass)).toEqual([]);
    const failing = paletteIds.flatMap((p) => [undefined, ...themeIds].flatMap((t) => paletteContrastReport(p, t))).filter((r) => !r.pass);
    expect(new Set(failing.map((r) => `${r.palette} ${r.mode} ${r.fg}/${r.bg}`))).toEqual(
      new Set(knownGaps.map((k) => `${k.palette} ${k.mode} ${k.fg}/${k.bg}`)),
    );
  });

  it('o app-tokens traz o Bege em color e o Neve em colorNeve, sem mudar o que já existia', () => {
    for (const theme of themeIds) {
      const app = read(`app-tokens.${theme}.json`);
      expect(Object.keys(app.colorNeve)).toEqual(paletteVocabulary);
      expect(app.colorNeve.heroBackground).toMatchObject({ light: app.color.heroBackground.light, dark: app.color.heroBackground.dark });
      expect(app.colorNeve.toastAction).toMatchObject({ light: app.color.toastAction.light, dark: app.color.toastAction.dark });
      expect(app.colorNeve.background).toMatchObject({ light: '#F5F5F7', dark: '#121214' });
      expect(app.color.background).toMatchObject({ light: '#F7F1E8', dark: '#231B17' });
      expect(Object.keys(app.color)).toEqual(expect.arrayContaining(['neutralFill', 'glass', 'glassBorder', 'tabGlass', 'checkLine', 'badgeBg', 'petA', 'petB', 'mLine', 'mInk']));
      // chaves novas depois das antigas: a ordem do que o app já lê não muda
      expect(Object.keys(app.color).slice(-10)).toEqual(['neutralFill', 'glass', 'glassBorder', 'tabGlass', 'checkLine', 'badgeBg', 'petA', 'petB', 'mLine', 'mInk']);
      expect(Object.keys(app.shadow).slice(-2)).toEqual(['glass', 'glassNeve']);
      expect(app.shadow.glass.dark.ring).toEqual({ width: 0.5, color: '#F7F1E8', opacity: 0.06 });
      expect(app.shadow.glassNeve.light).toEqual({ y: 1, blur: 3, color: '#000000', opacity: 0.08, ring: { width: 0.5, color: '#000000', opacity: 0.06 } });
    }
    expect(read('app-tokens.json')).toHaveProperty('colorNeve');
  });

  it('forma, espaço e tipografia da Nova XP saem no app-tokens', () => {
    const app = read('app-tokens.pawta.json');
    expect(app.radius.surface).toBe(22);
    expect(app.spacing).toEqual({ screenMargin: 24, block: 14 });
    expect(app.size).toMatchObject({
      rowHome: 98, rowList: 76, rowForm: 52, rowDetail: 44, glassButton: 54, roundButton: 44, chip: 36,
      checkCircle: 26, iconCircleS: 32, iconCircleM: 36, iconCircleL: 44, toast: 56, primaryButtonHeight: 54,
    });
    const styles = app.typography.styles;
    expect(styles.screenTitle).toEqual({ size: 27, weight: 700, tracking: -0.01, lineHeight: 1.15, align: 'leading' });
    expect(styles.sheetTitle).toEqual({ size: 22, weight: 700, lineHeight: 1.15 });
    expect(styles.nameLarge).toEqual({ size: 17, weight: 600 });
    expect(styles.name).toEqual({ size: 16, weight: 600 });
    expect(styles.support).toEqual({ size: 15, weight: 400 });
    expect(styles.supportSmall).toEqual({ size: 14, weight: 400 });
    expect(styles.label).toEqual(styles.sectionLabel);
    expect(styles.title).toEqual({ size: 22, weight: 600 }); // os de sempre ficam como estavam
  });

  it('o app só recebe os raios, espaços e cores que o Pawta usa', () => {
    for (const file of ['app-tokens.pawta.json', 'app-tokens.koti.json', 'app-tokens.json']) {
      const app = read(file);
      expect(Object.keys(app.radius).filter((k) => !k.startsWith('$'))).toEqual(['pdfPage', 'inset', 'appIcon', 'surface']);
      expect(app.radius).toMatchObject({ pdfPage: 4, inset: 14, surface: 22, appIcon: { radius: 22, side: 96 } });
      const gone = [
        'success', 'successBackground', 'tabBar', 'segmentSelected', 'switchOff', 'toastBackground', 'toastText', 'barInactive',
        'criticalBorder', 'criticalBackground', 'faint', 'borderStrong', 'featureCard', 'onFeatureCard', 'onAccentSubtle',
        'lockBackground', 'onLock', 'alertBackground', 'bannerBackground', 'previewBackdrop', 'themePreviewCard', 'unreadBackground',
      ];
      for (const name of gone) expect(app.color).not.toHaveProperty(name);
      expect(app.product?.mascots).toBeUndefined();
      expect(app.shadow).toHaveProperty('raised');
    }
  });

  it('o que o app aposentou continua na web quando o site usa', () => {
    const css = readFileSync('build/css/tokens.css', 'utf8');
    for (const name of ['success', 'segment']) expect(css).toContain(`--toski-${name}:`);
    for (const name of ['card', 'button', 'icon', 'panel']) expect(css).toContain(`--toski-radius-${name}:`);
    const swift = readFileSync('build/swift/ToskiColors.swift', 'utf8');
    expect(swift).not.toMatch(/static let (success|segmentSelected)\b/);
  });

  it('o Swift da paleta Neve e o glass chegam ao pacote', () => {
    const neve = readFileSync(join(__dirname, '../../build/swift/ToskiPaletteNeve.swift'), 'utf8');
    expect(neve).toContain('public enum ToskiNevePalette {');
    expect(neve).toContain('public static let background = dynamic(light: 0xF5F5F7, dark: 0x121214)');
    const colors = readFileSync(join(__dirname, '../../build/swift/ToskiColors.swift'), 'utf8');
    expect(colors).toContain('public static let glassNeve = ByMode(');
    expect(colors).toContain('public static let surface: CGFloat = 22');
  });
});
