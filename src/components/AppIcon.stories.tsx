import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { AppIcon } from './AppIcon';

const meta = {
  title: 'Marca/AppIcon',
  component: AppIcon,
  args: { size: 96, withBall: true },
  argTypes: { size: { control: { type: 'range', min: 16, max: 256, step: 4 } } },
  parameters: {
    docs: {
      description: {
        component:
          'Ícone da marca (caramelo), igual ao favicon e ao ícone do app. Mesmas cores nos dois temas. Os SVGs de 1024 para o Xcode ficam em `assets/`.',
      },
    },
  },
} satisfies Meta<typeof AppIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div className="flex items-end gap-4">
      {[16, 32, 36, 64, 128].map((s) => (
        <AppIcon key={s} size={s} />
      ))}
    </div>
  ),
};

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: () => (
    <LightAndDark>
      <div className="flex items-center gap-3">
        <AppIcon size={36} />
        <span className="text-lg font-semibold">Toski Labs</span>
      </div>
    </LightAndDark>
  ),
};
