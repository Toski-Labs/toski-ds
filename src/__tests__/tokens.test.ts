import { contrastRatio } from '../tokens/contrast';
import { contrastReport } from '../tokens';

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
