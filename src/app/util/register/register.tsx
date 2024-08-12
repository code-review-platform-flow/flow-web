import { atom } from 'recoil';

// 각 필드에 대한 atom 생성
export const enterYearState = atom({
    key: 'enterYearState',
    default: 0, // 초기값을 빈 문자열로 설정
});

export const schoolNameState = atom({
    key: 'schoolNameState',
    default: '',
});

export const departmentState = atom({
    key: 'departmentState',
    default: '',
});

export const nameState = atom({
    key: 'nameState',
    default: '',
});


export const pwState = atom({
    key: 'pwState',
    default: '',
});

export const schoolEmailState = atom({
    key: 'schoolEmailState',
    default: 'iamjms4237@gachon.ac.kr',
});
