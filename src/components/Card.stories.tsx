import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { Card } from './Card';

const meta = {
  title: 'Componentes/Card',
  component: Card,
  args: { variant: 'surface', radius: 'card', className: 'p-6 max-w-sm' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['surface', 'plain', 'hero', 'dashed'] },
    radius: { control: 'inline-radio', options: ['card', 'panel'] },
    as: { control: 'select', options: ['div', 'article', 'section', 'li', 'aside'] },
  },
  render: (args) => (
    <Card {...args}>
      <p className="font-semibold text-ink">PetHealthTracker</p>
      <p className="mt-1 text-muted">Vacinas, remédios e lembretes do seu pet.</p>
    </Card>
  ),
  parameters: { docs: { description: { component: 'Contêiner: surface, plain, hero e dashed. Raio card (18) ou panel (28).' } } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {};
export const Plain: Story = { args: { variant: 'plain' }, decorators: [(S) => <div className="rounded-panel bg-tint p-6"><S /></div>] };
export const Hero: Story = { args: { variant: 'hero', radius: 'panel' } };
export const Dashed: Story = { args: { variant: 'dashed' } };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="grid grid-cols-2 gap-3">
        {(['surface', 'plain', 'hero', 'dashed'] as const).map((v) => (
          <Card key={v} variant={v} radius={v === 'hero' ? 'panel' : 'card'} className="p-4">
            <p className="font-semibold">{v}</p>
            <p className="text-sm text-muted">{v === 'hero' ? 'raio panel 28' : 'raio card 18'}</p>
          </Card>
        ))}
      </div>
    </LightAndDark>
  ),
};
