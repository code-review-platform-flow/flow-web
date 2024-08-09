import { selector } from "recoil";
import { enterYearState, departmentState, emailState, nameState, schoolNameState, pwState, schoolEmailState } from "./register";

// 모든 필드 값을 하나로 결합한 selector (선택적)
export const studentInfoSelector = selector({
    key: 'studentInfoSelector',
    get: ({ get }) => {
      const enterYear = get(enterYearState);
      const schoolName = get(schoolNameState);
      const department = get(departmentState);
      const name = get(nameState);
      const email = get(emailState);
      const pw = get(pwState);
      const schoolEmail = get(schoolEmailState);

      return {
        enterYear,
        schoolName,
        department,
        name,
        email,
        pw,
        schoolEmail
      };
    },
  });
  

