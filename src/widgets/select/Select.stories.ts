import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'Example/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LargeSelect: Story = {
    args: {
        border: true,
        size: 'large',
    },
};

export const MediumSelect: Story = {
    args: {
        size: 'medium',
        firstValue: 'Enter text here',
        icon: 'https://example.com/icon.png', // 예시 아이콘 URL 추가
    },
};
