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

  it('Koti mostra ícones e logotipo no lugar de "pendente"', () => {
    document.documentElement.setAttribute('data-product', 'koti');
    const { container } = render(<ProductThemes />);
    expect(screen.queryByText('Pendente')).not.toBeInTheDocument();
    expect(screen.getAllByText('Logotipo').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('img', { name: 'Koti, ícone tinted' }).length).toBeGreaterThan(0);
    expect(container.querySelectorAll('[data-theme-frame] svg[aria-label="Koti"]')).toHaveLength(2);
  });
});
