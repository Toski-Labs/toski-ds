import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Toski DS',
    brandUrl: 'https://github.com/Toski-Labs/toski-ds',
    colorPrimary: '#A9541F',
    colorSecondary: '#A9541F',
    appBg: '#F7F1E8',
    appContentBg: '#FFFFFF',
    appBorderColor: '#E6D8C4',
    textColor: '#231B17',
    textMutedColor: '#6B5648',
    fontBase: '"Outfit Variable", Outfit, system-ui, sans-serif',
  }),
});
