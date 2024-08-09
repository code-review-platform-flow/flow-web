'use client'

import React, { useState } from "react";
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import SearchSchoolContainer from "./ui/SearchSchoolContainer";
import SelectDepartmentContainer from "./ui/SelectDepartmentContainer";
import UserInfoContainer from "./ui/UserInfoContainer";
import RegisterContainer from "./ui/RegisterContainer";
import Button from "@/widgets/button/Button";
import styled from "styled-components";
import { departmentState, emailState, enterYearState, nameState, pwState, schoolEmailState, schoolNameState } from "@/app/util/register/register";
import { useRecoilState } from "recoil";


const RegisterPage: React.FC = () => {
    const [register, setRegister] = useState(0);
    const [showError, setShowError] = useState(false); 
    const [registerCheck, setRegisterCheck ] = useState(false);

    const [enterYear, setEnterYear] = useRecoilState(enterYearState);
    const [schoolName, setSchoolName] = useRecoilState(schoolNameState);  
    const [department, setDepartment] = useRecoilState(departmentState);
    const [ name , setName ] = useRecoilState(nameState);
    const [ email , setMail ] = useRecoilState(emailState);
    const [ pw, setPw] = useRecoilState( pwState);
    const [ schoolEmail, setSchoolEmailState]  = useRecoilState(schoolEmailState);


    const handleRegister = () => {
        if ((register === 0 && (!enterYear || !schoolName)) || (register === 1 && !department)) {
            setShowError(true);  // 필요한 정보가 입력되지 않았을 때 경고 메시지 표시
        } 
        else if(register === 2 && (!name || !email || !pw || !schoolEmail)){
            setShowError(true);
        }else if(register <= 1){
            setRegister((prev) => (prev + 1) % 3);
            setShowError(false);  // 다음 단계로 넘어가면 경고 메시지 숨기기
        }
        else if(register === 2){
            setRegisterCheck(true)
        }
    }
    
    return (
        <FillWrapper>
            <RegisterContainer>
                {register === 0 && <SearchSchoolContainer showError={showError}/>}
                {register === 1 && <SelectDepartmentContainer  showError={showError}/>}
                {register === 2 && <UserInfoContainer showError={showError} registerCheck={registerCheck} />}
                <ButtonWrapper>
                    <Button $primary  onClick={()=>handleRegister()}  size='wide' label={register === 2 ? '회원가입 완료' : '다음'}/>
                </ButtonWrapper>
            </RegisterContainer>
        </FillWrapper>
    );
}

export default RegisterPage;

const ButtonWrapper = styled.div`
    margin-top : 2em;
`;