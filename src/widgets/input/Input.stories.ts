import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from './Input';
import SearchIcon2 from '../../../public/icons/searchIcon2.svg'

const meta: Meta<typeof Input> = {
    title: 'Example/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LargeInput : Story = {
    args: {
        size: 'large',
        placeholder: 'Enter text here',
        icon: 'https://example.com/icon.png', // 예시 아이콘 URL 추가
    },
};

export const MediumInput : Story = {
    args: {
        size: 'medium',
        placeholder: 'Enter text here',
        icon: 'https://example.com/icon.png', // 예시 아이콘 URL 추가
    },
};


export const SearchInput: Story = {
    args: {
        size: 'medium',
        icon: SearchIcon2, // 예시 아이콘 URL 추가
    },
};
