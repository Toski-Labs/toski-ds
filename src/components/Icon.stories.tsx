import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { Icon, iconData, iconNames } from './Icon';

const meta = {
  title: 'Componentes/Icon',
  component: Icon,
  args: { name: 'paw', size: 24, stroke: 1.8 },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: { type: 'range', min: 12, max: 64, step: 1 } },
    stroke: { control: { type: 'range', min: 1, max: 3, step: 0.1 } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Ícones de traço em SVG inline (24×24, cor = currentColor), os mesmos desenhos do app iOS (`icons/svg/`). Nome em inglês na web e em português no app (abaixo de cada ícone). Decorativos por padrão; passe `label` quando o ícone carregar significado sozinho.',
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [(S) => <span className="text-accent"><S /></span>] };

const Gallery = () => (
  <ul className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
    {iconNames.map((n) => (
      <li key={n} className="flex flex-col items-center gap-1.5 rounded-card bg-surface p-4 text-ink">
        <Icon name={n} />
        <code className="text-xs">{n}</code>
        <code className="text-[11px] text-muted">{iconData[n].mobile ?? 'só web'}</code>
      </li>
    ))}
  </ul>
);

export const All: Story = { name: 'Todos', render: () => <Gallery /> };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex flex-wrap gap-4 text-accent">
        {iconNames.slice(0, 8).map((n) => (
          <Icon key={n} name={n} />
        ))}
      </div>
    </LightAndDark>
  ),
};
