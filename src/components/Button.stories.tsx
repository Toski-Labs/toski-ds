import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { iconNames } from './Icon';
import { Button } from './Button';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Conhecer o app', variant: 'primary', size: 'lg' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'light'] },
    size: { control: 'inline-radio', options: ['lg', 'md'] },
    icon: { control: 'select', options: [undefined, ...iconNames] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Botão (`<button>`) ou link com cara de botão (quando recebe `href`). Tamanhos lg 54px e md 48px, raio 14. Foco visível com contorno accent; transição desligada com "reduzir movimento".',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { icon: 'arrow-right' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Light: Story = { args: { variant: 'light' }, decorators: [(S) => <div className="rounded-card bg-tint p-6"><S /></div>] };
export const Medium: Story = { args: { size: 'md' } };
export const AsLink: Story = { name: 'Como link', args: { href: '#', children: 'Ver no GitHub', icon: 'arrow-right' } };
export const Disabled: Story = { name: 'Desabilitado', args: { disabled: true } };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex flex-wrap items-center gap-3">
        <Button icon="arrow-right">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="light">Light</Button>
        <Button size="md">Médio</Button>
      </div>
    </LightAndDark>
  ),
};
