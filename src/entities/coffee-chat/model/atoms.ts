import { atom } from 'recoil';

export const coffeeChatSuccessState = atom<boolean>({
    key: 'coffeeChatSuccessState',
    default: false,
});
