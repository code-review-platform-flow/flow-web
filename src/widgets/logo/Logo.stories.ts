import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Logo from './Logo';

const meta: Meta = {
    title: 'Example/Logo',
    component: Logo,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Medium: Story = {
    args: {
        size: 'medium',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
    },
};
