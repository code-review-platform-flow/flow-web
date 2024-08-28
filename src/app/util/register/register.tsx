import { atom } from "recoil";

// 입학 연도 상태
export const enterYearState = atom<number>({
    key: "enterYearState", // 각 상태를 식별하기 위한 고유 키
    default: 0, // 기본값
});

// 학교 이름 상태
export const schoolNameState = atom<string>({
    key: "schoolNameState",
    default: "",
});

// 전공 이름 상태
export const majorNameState = atom<string>({
    key: "majorNameState",
    default: "",
});

// 학생 이름 상태
export const nameState = atom<string>({
    key: "nameState",
    default: "",
});

// 학번 상태
export const studentNumberState = atom<string>({
    key: "studentNumberState",
    default: "",
});

// 학교 이메일 상태
export const schoolEmailState = atom<string>({
    key: "schoolEmailState",
    default: "",
});
