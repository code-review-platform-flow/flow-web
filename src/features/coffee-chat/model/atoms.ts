import { atom } from 'recoil';

interface CoffeeData {
    email: string;
}

export const coffeeChatSuccessState = atom<boolean>({
    key: 'coffeeChatSuccessState',
    default: false,
});

export const coffeeChatDataState = atom<CoffeeData | null>({
    key: 'coffeeChatDataState',
    default: null,
});
