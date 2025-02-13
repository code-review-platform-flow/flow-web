import { selector } from 'recoil';
import { enterYearState, majorNameState, nameState, schoolNameState, pwCheckState, schoolEmailState } from './atoms';

// 모든 필드 값을 하나로 결합한 selector (선택적)
export const studentInfoSelector = selector({
    key: 'studentInfoSelector',
    get: ({ get }) => {
        const enterYear = get(enterYearState);
        const schoolName = get(schoolNameState);
        const majorName = get(majorNameState);
        const name = get(nameState);
        const pwCheck = get(pwCheckState);
        const schoolEmail = get(schoolEmailState);

        return {
            enterYear,
            schoolName,
            majorName,
            name,
            pwCheck,
            schoolEmail,
        };
    },
});
