import { render, screen } from '@testing-library/react';
import { ProductThemes } from '../../docs/ProductThemes';

describe('página Temas de produto', () => {
  afterEach(() => document.documentElement.removeAttribute('data-product'));

  it.each([
    [undefined, 'Toski Labs'],
    ['pethealth', 'PetHealthTracker'],
    ['koti', 'Koti'],
  ])('renderiza claro e escuro para %s', (product, name) => {
    if (product) document.documentElement.setAttribute('data-product', product);
    const { container } = render(<ProductThemes />);
    expect(screen.getByText(name, { selector: 'strong' })).toBeInTheDocument();
    expect(container.querySelectorAll('[data-theme-frame]')).toHaveLength(2);
  });

  it('Koti mostra os arquivos de ícone pendentes', () => {
    document.documentElement.setAttribute('data-product', 'koti');
    render(<ProductThemes />);
    expect(screen.getAllByText('koti-icone.svg').length).toBeGreaterThan(0);
  });
});
