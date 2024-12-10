import { UserSummary } from '@/shared/type/user';
import { atom } from 'recoil';

const getLocalStorageValue = (key: string) => {
    if (typeof window === 'undefined') return null;
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : null;
};

interface AuthData {
    role: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export const authDataState = atom<AuthData | null>({
    key: 'authDataState',
    default: getLocalStorageValue('authData'),
    effects: [
        ({ onSet, setSelf }) => {
            const savedValue = getLocalStorageValue('authData');
            if (savedValue) {
                setSelf(savedValue);
            }

            onSet((newValue) => {
                if (newValue) {
                    localStorage.setItem('authData', JSON.stringify(newValue));
                } else {
                    localStorage.removeItem('authData');
                }
            });
        },
    ],
});

export const userSummaryState = atom<UserSummary | null>({
    key: 'userSummaryState',
    default: getLocalStorageValue('userSummary'),
    effects: [
        ({ onSet, setSelf }) => {
            const savedValue = getLocalStorageValue('userSummary');
            if (savedValue) {
                setSelf(savedValue);
            }

            onSet((newValue) => {
                if (newValue) {
                    localStorage.setItem('userSummary', JSON.stringify(newValue));
                } else {
                    localStorage.removeItem('userSummary');
                }
            });
        },
    ],
});
