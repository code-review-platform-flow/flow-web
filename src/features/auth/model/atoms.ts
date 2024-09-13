import { atom } from 'recoil';

// LocalStorage에서 초기 값을 불러오는 함수
const getLocalStorageValue = (key: string) => {
    if (typeof window === 'undefined') return null; // 서버 측에서 실행되는 경우를 처리
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : null;
};

// AuthData 타입 정의
interface AuthData {
    role: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

// Recoil atom
export const authDataState = atom<AuthData | null>({
    key: 'authDataState',
    default: getLocalStorageValue('authData'), // LocalStorage에서 초기값을 불러옴
    effects: [
        ({ onSet, setSelf }) => {
            // Initialize state with localStorage value
            const savedValue = getLocalStorageValue('authData');
            if (savedValue) {
                setSelf(savedValue);
            }

            // Listen for changes and update localStorage
            onSet((newValue) => {
                if (newValue) {
                    // 상태가 변경되면 LocalStorage에 저장
                    localStorage.setItem('authData', JSON.stringify(newValue));
                } else {
                    // 상태가 null로 변경되면 LocalStorage에서 제거
                    localStorage.removeItem('authData');
                }
            });
        },
    ],
});
