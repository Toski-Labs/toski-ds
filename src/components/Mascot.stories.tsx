import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { Mascot } from './Mascot';

const meta = {
  title: 'Marca/Mascot',
  component: Mascot,
  args: { ball: 'bounce', width: 220 },
  argTypes: { ball: { control: 'inline-radio', options: ['bounce', 'still', 'ground', 'none'] } },
  parameters: {
    docs: {
      description: {
        component:
          'Paçoca, a mascote. No escuro o corpo ganha contorno creme. A bolinha pula a cada 1,8 s e fica parada com "reduzir movimento". Decorativa por padrão; passe `label` quando ela for a única informação.',
      },
    },
  },
} satisfies Meta<typeof Mascot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bounce: Story = {};
export const Still: Story = { args: { ball: 'still' } };
export const Ground: Story = { name: 'Bolinha no chão (erro)', args: { ball: 'ground' } };
export const OnHero: Story = {
  name: 'Sobre hero',
  decorators: [(S) => <div className="inline-block rounded-full bg-hero p-8"><S /></div>],
};

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex items-end gap-6">
        <div className="w-40 rounded-full bg-hero p-5">
          <Mascot ball="still" />
        </div>
        <div className="w-40">
          <Mascot ball="ground" />
        </div>
      </div>
    </LightAndDark>
  ),
};
