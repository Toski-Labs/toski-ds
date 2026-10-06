import type { Meta, StoryObj } from '@storybook/react-vite';
import { LightAndDark } from '../../docs/ThemeFrame';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Componentes/SectionHeading',
  component: SectionHeading,
  args: {
    kicker: 'Toski Labs',
    title: 'Um laboratório pequeno para soluções rápidas',
    lead: 'Apps e ferramentas para o ecossistema Apple, feitos com cuidado e inspirados na Paçoca.',
    as: 'h2',
  },
  argTypes: { as: { control: 'inline-radio', options: ['h1', 'h2', 'h3'] } },
  parameters: { docs: { description: { component: 'Rótulo + título + texto de apoio. Escolha o nível do título com `as`.' } } },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H2: Story = {};
export const H1: Story = { args: { as: 'h1' } };
export const OnlyTitle: Story = { name: 'Só título', args: { kicker: undefined, lead: undefined } };

export const LightAndDarkStory: Story = {
  name: 'Claro e escuro',
  render: (args) => (
    <LightAndDark>
      <SectionHeading {...args} as="h3" />
    </LightAndDark>
  ),
};
