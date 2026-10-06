import { readFileSync, readdirSync } from 'node:fs';
import { render } from '@testing-library/react';
import { Icon, iconData, iconNames } from '../index';
import { iconEntries } from '../tokens';

describe('ícones', () => {
  it('todo SVG de icons/svg tem entrada no manifesto e vice-versa', () => {
    const files = readdirSync('icons/svg').map((f) => f.replace(/\.svg$/, '')).sort();
    expect(iconEntries.map((i) => i.id).sort()).toEqual(files);
  });

  it('nomes da web e do app são únicos', () => {
    const web = iconEntries.map((i) => i.web);
    const mobile = iconEntries.flatMap((i) => (i.mobile ? [i.mobile] : []));
    expect(new Set(web).size).toBe(web.length);
    expect(new Set(mobile).size).toBe(mobile.length);
  });

  it('mantém os nomes que o site já usa', () => {
    for (const n of ['arrow-down', 'arrow-up', 'arrow-right', 'bell', 'calendar', 'check', 'chevron-down', 'clock', 'copy', 'flask', 'heart', 'list', 'mail', 'paw', 'phone', 'plus', 'repeat', 'share']) {
      expect(iconNames).toContain(n);
    }
  });

  it('ícone preenchido usa fill e não traço', () => {
    const { container } = render(<Icon name="more" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('fill')).toBe('currentColor');
    expect(svg.querySelectorAll('circle')).toHaveLength(3);
    expect(iconData.more.mobile).toBe('mais-opcoes');
  });

  it('ícone de traço usa currentColor', () => {
    const { container } = render(<Icon name="vaccine" stroke={2} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('stroke')).toBe('currentColor');
    expect(svg.getAttribute('stroke-width')).toBe('2');
  });
});

describe('movimento', () => {
  it('tokens.css traz a bolinha e as curvas', () => {
    const css = readFileSync('build/css/tokens.css', 'utf8');
    expect(css).toContain('--toski-motion-ball-duration: 1.8s;');
    expect(css).toContain('--toski-motion-ball-rise: 14px;');
    expect(css).toContain('--toski-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);');
    expect(css).toContain('--toski-motion-fast: 100ms;');
    expect(css).toContain('--toski-motion-base: 160ms;');
    expect(css).toContain('--toski-motion-enter: 250ms;');
  });
});
