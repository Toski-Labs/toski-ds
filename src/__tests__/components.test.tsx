import { render, screen } from '@testing-library/react';
import { AppIcon, Button, Card, CheckList, Icon, IconBox, Kicker, Mascot, Pill, ProductIcon, ProductMascot, SectionHeading } from '../index';

describe('Button', () => {
  it('renderiza <button type="button"> por padrão', () => {
    render(<Button>Salvar</Button>);
    const btn = screen.getByRole('button', { name: 'Salvar' });
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn.className).toContain('h-[54px]');
  });

  it('vira link quando recebe href', () => {
    render(
      <Button href="/app" variant="secondary" size="md">
        Ver app
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Ver app' });
    expect(link).toHaveAttribute('href', '/app');
    expect(link.className).toContain('h-12');
  });

  it('tem foco visível, área de toque mínima e respeita reduzir movimento', () => {
    render(<Button>Ok</Button>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('focus-visible:outline-2');
    expect(cls).toContain('min-w-11'); // 44px
    expect(cls).toContain('motion-reduce:transition-none');
    expect(cls).toContain('active:scale-[0.97]');
    expect(cls).toContain('transition-[color,background-color,border-color,scale]');
  });

  it('ícone do botão é decorativo', () => {
    const { container } = render(<Button icon="arrow-right">Seguir</Button>);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Icon', () => {
  it('é decorativo sem label e acessível com label', () => {
    const { container, rerender } = render(<Icon name="paw" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Icon name="paw" label="Pata" />);
    expect(screen.getByRole('img', { name: 'Pata' })).toBeInTheDocument();
  });
});

describe('Pill, Card, Kicker, IconBox', () => {
  it('Pill status tem bolinha decorativa', () => {
    const { container } = render(<Pill variant="status">Em desenvolvimento</Pill>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('Card aceita "as" e raio panel', () => {
    const { container } = render(
      <Card as="article" variant="hero" radius="panel">
        x
      </Card>,
    );
    const el = container.firstElementChild!;
    expect(el.tagName).toBe('ARTICLE');
    expect(el.className).toContain('rounded-panel');
  });

  it('Kicker usa accent-text (contraste de texto)', () => {
    render(<Kicker>Projetos</Kicker>);
    expect(screen.getByText('Projetos').className).toContain('text-accent-text');
  });

  it('IconBox md tem 48px', () => {
    const { container } = render(<IconBox name="bell" />);
    expect(container.firstElementChild!.className).toContain('size-12');
  });
});

describe('SectionHeading e CheckList', () => {
  it('usa o nível de título pedido', () => {
    render(<SectionHeading as="h1" kicker="Toski Labs" title="Olá" lead="Apoio" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Olá' })).toBeInTheDocument();
  });

  it('lista os itens', () => {
    render(<CheckList items={['Um', 'Dois']} tone="success" />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('Mascot e AppIcon', () => {
  it('bolinha pulando usa a animação que para com reduzir movimento', () => {
    const { container } = render(<Mascot />);
    expect(container.querySelector('[data-ball="bounce"]')).toHaveClass('toski-ball');
  });

  it('sem animação quando ball="still"', () => {
    const { container } = render(<Mascot ball="still" />);
    expect(container.querySelector('.toski-ball')).toBeNull();
  });

  it('AppIcon com label é uma imagem acessível', () => {
    render(<AppIcon label="Toski Labs" />);
    expect(screen.getByRole('img', { name: 'Toski Labs' })).toBeInTheDocument();
  });
});

describe('ProductIcon e ProductMascot', () => {
  it('ícone decorativo sem label e acessível com label', () => {
    const { container, rerender } = render(<ProductIcon product="pethealth" variant="dark" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    rerender(<ProductIcon product="pethealth" label="PetHealthTracker" />);
    expect(screen.getByRole('img', { name: 'PetHealthTracker' })).toBeInTheDocument();
  });

  it('mascote renderiza claro e escuro quando não recebe mode', () => {
    const { container } = render(<ProductMascot product="pethealth" label="Cachorro e gato" />);
    expect(container.querySelectorAll('[data-art]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-art="dark"] svg')).toHaveLength(1);
  });

  it('com mode renderiza só uma versão e ids não colidem', () => {
    const { container } = render(
      <>
        <ProductIcon product="pethealth" />
        <ProductIcon product="pethealth" />
        <ProductMascot product="pethealth" art="pair-error" mode="dark" />
      </>,
    );
    expect(container.querySelectorAll('[data-art]')).toHaveLength(0);
    const ids = [...container.querySelectorAll('[id]')].map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
