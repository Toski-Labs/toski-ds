import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { addons } from 'storybook/preview-api';
import './preview.css';

/** Produto escolhido na barra → <html data-product>. 'toski' = base (sem tema de produto). */
function applyProduct(value: unknown) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (typeof value === 'string' && value !== 'toski') root.setAttribute('data-product', value);
  else root.removeAttribute('data-product');
}

/** Paleta escolhida na barra → <html data-palette>. 'bege' = padrão (sem atributo). Só muda os blocos do app. */
function applyPalette(value: unknown) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (typeof value === 'string' && value !== 'bege') root.setAttribute('data-palette', value);
  else root.removeAttribute('data-palette');
}

const channel = addons.getChannel();
for (const event of ['setGlobals', 'globalsUpdated']) {
  channel.on(event, (e: { globals?: { product?: string; palette?: string } }) => {
    applyProduct(e?.globals?.product);
    applyPalette(e?.globals?.palette);
  });
}

const preview: Preview = {
  tags: ['autodocs'],
  initialGlobals: { product: 'toski', palette: 'bege' },
  globalTypes: {
    product: {
      description: 'Tema de produto (troca só o destaque)',
      toolbar: {
        title: 'Produto',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'toski', title: 'Toski Labs' },
          { value: 'pawta', title: 'Pawta' },
          { value: 'koti', title: 'Koti' },
        ],
      },
    },
    palette: {
      description: 'Paleta do app (troca fundo, texto e neutros; só os blocos do app)',
      toolbar: {
        title: 'Paleta',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'bege', title: 'Bege' },
          { value: 'neve', title: 'Neve' },
        ],
      },
    },
  },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ['Introdução', 'Como usar', 'Tokens', ['Cores', 'Tipografia', 'Raios e layout', 'Movimento', 'Medidas do app'], 'Componentes', 'Marca', ['Mascot', 'AppIcon', 'Temas de produto']],
      },
    },
  },
  decorators: [
    (Story, context) => {
      applyProduct(context.globals.product);
      applyPalette(context.globals.palette);
      return <Story />;
    },
    withThemeByDataAttribute({
      themes: { Claro: 'light', Escuro: 'dark' },
      defaultTheme: 'Claro',
      attributeName: 'data-theme',
      parentSelector: 'html',
    }),
  ],
};

export default preview;
