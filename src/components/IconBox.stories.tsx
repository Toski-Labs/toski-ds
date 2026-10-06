import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { iconNames } from './Icon';
import { IconBox } from './IconBox';

const meta = {
  title: 'Componentes/IconBox',
  component: IconBox,
  args: { name: 'bell', size: 'md', on: 'tint', tone: 'accent' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    on: { control: 'inline-radio', options: ['tint', 'surface'] },
    tone: { control: 'inline-radio', options: ['accent', 'muted'] },
  },
  parameters: { docs: { description: { component: 'Caixa de ícone: md 48px (raio 12) ou lg 88px. Ícone accent sobre tint passa 3:1.' } } },
} satisfies Meta<typeof IconBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg', name: 'paw' } };
export const OnSurface: Story = {
  args: { on: 'surface' },
  decorators: [(S) => <div className="rounded-card bg-hero p-6"><S /></div>],
};

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex flex-wrap items-center gap-3">
        <IconBox name="bell" />
        <IconBox name="calendar" tone="muted" />
        <IconBox name="paw" size="lg" />
        <div className="rounded-card bg-hero p-3">
          <IconBox name="heart" on="surface" />
        </div>
      </div>
    </LightAndDark>
  ),
};
