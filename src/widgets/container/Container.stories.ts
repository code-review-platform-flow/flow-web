import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
    title: 'Example/Container',
    component: Container,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Border: Story = {
    args: {
        border: true,
        size: 'medium',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const ZIndex10: Story = {
    args: {
        border: true,
        size: 'wide',
        zIndex: 10, // z-index 예시 추가
    },
};
