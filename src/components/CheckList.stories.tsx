import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { CheckList } from './CheckList';

const items = ['Vacinas e remédios', 'Lembretes no horário certo', 'Histórico em PDF', 'Calendário do iPhone'];

const meta = {
  title: 'Componentes/CheckList',
  component: CheckList,
  args: { items, tone: 'accent', columns: false },
  argTypes: { tone: { control: 'inline-radio', options: ['accent', 'success'] } },
  parameters: { docs: { description: { component: 'Lista com check: success (grátis) ou accent (Plus). O `<ul>` leva `role="list"`: o Tailwind tira os marcadores (`list-style: none`) e, sem o papel explícito, o Safari/VoiceOver deixa de anunciar a lista.' } } },
} satisfies Meta<typeof CheckList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};
export const Success: Story = { args: { tone: 'success' } };
export const Columns: Story = { name: 'Colunas', args: { columns: true } };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex flex-col gap-6">
        <CheckList items={items.slice(0, 2)} tone="success" />
        <CheckList items={items.slice(2)} />
      </div>
    </LightAndDark>
  ),
};
