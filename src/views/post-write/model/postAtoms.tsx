import { Tag } from '@/shared/type/post';
import { atom } from 'recoil';

// 태그 배열을 위한 atom
export const tagsState = atom<Tag[]>({
    key: 'tagsState',
    default: [],
});

// 해시태그 배열을 위한 atom
export const categoryState = atom<string>({
    key: 'categoryState',
    default: '',
});

// 타이틀을 위한 atom
export const titleState = atom<string>({
    key: 'titleState',
    default: '',
});

// 콘텐츠를 위한 atom
export const contentState = atom<string>({
    key: 'contentState',
    default: '',
});

