import { readFileSync } from 'node:fs';

describe('anel de foco', () => {
  it('tokens.css define o raio do foco', () => {
    expect(readFileSync('build/css/tokens.css', 'utf8')).toContain('--toski-radius-focus: 6px;');
  });

  it(':focus-visible usa contorno accent, afastamento 3px e o raio do foco', () => {
    const css = readFileSync('styles/tailwind.css', 'utf8');
    const rule = css.slice(css.indexOf(':focus-visible {'), css.indexOf('}', css.indexOf(':focus-visible {')));
    expect(rule).toContain('outline: 2px solid var(--toski-accent);');
    expect(rule).toContain('outline-offset: 3px;');
    expect(rule).toContain('border-radius: var(--toski-radius-focus);');
  });
});
