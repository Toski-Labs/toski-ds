import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { Pill } from './Pill';

const meta = {
  title: 'Componentes/Pill',
  component: Pill,
  args: { children: 'Em desenvolvimento', variant: 'status' },
  argTypes: { variant: { control: 'inline-radio', options: ['status', 'outline', 'tag', 'plus'] } },
  parameters: { docs: { description: { component: 'Etiqueta não interativa: status, outline, tag e plus.' } } },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {};
export const Outline: Story = { args: { variant: 'outline', children: 'iPhone · iOS 18+' } };
export const Tag: Story = {
  args: { variant: 'tag', children: 'Lembretes' },
  decorators: [(S) => <div className="rounded-card bg-surface p-6"><S /></div>],
};
export const Plus: Story = { args: { variant: 'plus', children: 'PLUS' } };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex flex-wrap items-center gap-3 rounded-card bg-surface p-4">
        <Pill variant="status">Em desenvolvimento</Pill>
        <Pill variant="outline">iPhone · iOS 18+</Pill>
        <Pill variant="tag">Lembretes</Pill>
        <Pill variant="plus">PLUS</Pill>
      </div>
    </LightAndDark>
  ),
};
