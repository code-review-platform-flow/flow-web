import { selector } from "recoil";
import { enterYearState, majorNameState, nameState, schoolNameState, schoolEmailState, studentNumberState } from "./register";

// 모든 필드 값을 하나로 결합한 selector (선택적)
export const studentInfoSelector = selector({
    key: 'studentInfoSelector',
    get: ({ get }) => {
      const enterYear = get(enterYearState);
      const schoolName = get(schoolNameState);
      const majorName = get(majorNameState);
      const name = get(nameState);
      const studentNumber = get(studentNumberState);
      const schoolEmail = get(schoolEmailState);

      return {
        enterYear,
        studentNumber,
        schoolName,
        majorName,
        name,
        schoolEmail
      };
    },
  });
  

