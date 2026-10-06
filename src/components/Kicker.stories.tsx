import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { Kicker } from './Kicker';

const meta = {
  title: 'Componentes/Kicker',
  component: Kicker,
  args: { children: 'Projetos', tone: 'accent' },
  argTypes: { tone: { control: 'inline-radio', options: ['accent', 'muted'] } },
  parameters: { docs: { description: { component: 'Rótulo de seção: 13px, 600, caixa alta. accent usa accent-text (4,5:1 sobre todos os fundos).' } } },
} satisfies Meta<typeof Kicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};
export const Muted: Story = { args: { tone: 'muted' } };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex flex-col gap-3">
        <Kicker>Projetos</Kicker>
        <Kicker tone="muted">Em breve</Kicker>
        <div className="rounded-card bg-hero p-3">
          <Kicker>Sobre hero</Kicker>
        </div>
      </div>
    </LightAndDark>
  ),
};
