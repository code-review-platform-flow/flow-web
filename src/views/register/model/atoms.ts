import { atom } from 'recoil';

// 각 필드에 대한 atom 생성
export const enterYearState = atom({
    key: 'enterYearState',
    default: 0, 
})

export const studentNumberState = atom({
    key: 'studentNumberState',
    default: '', 
});

export const schoolNameState = atom({
    key: 'schoolNameState',
    default: '',
});

export const majorNameState = atom({
    key: 'majorNameState',
    default: '',
});

export const nameState = atom({
    key: 'nameState',
    default: '',
});


export const pwCheckState = atom({
    key: 'pwCheckState',
    default: false,
});

export const schoolEmailState = atom({
    key: 'schoolEmailState',
    default: '',
});
