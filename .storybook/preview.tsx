import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import './preview.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ['Introdução', 'Como usar', 'Tokens', ['Cores', 'Tipografia', 'Raios e layout'], 'Componentes', 'Marca'],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { Claro: 'light', Escuro: 'dark' },
      defaultTheme: 'Claro',
      attributeName: 'data-theme',
      parentSelector: 'html',
    }),
  ],
};

export default preview;
